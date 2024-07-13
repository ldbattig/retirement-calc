import type { RetirementCalculationResult } from "$lib/types/retirementCalculationResult";
import { STATE_TAX_RATES, FEDERAL_TAX_RATES, FEDERAL_TAX_DEDUCTION } from "$lib/constants";
import type { TaxRegion } from "$lib/types/tax/state";
import { Account } from "$lib/types/portfolio/account";

/**
 * Calculate retirement assets and the years they will last.
 *
 * @param currentAge in years
 * @param retirementAge in years
 * @param annualIncome in whole dollars
 * @param livingExpenses in whole dollars
 * @param stockAllocation percent of assets invested in stocks out of 100
 * @param annualInflation percentage of annual inflation out of 100
 * @returns {RetirementCalculationResult} total assets and the years they will last
 */
export function calculateAssets(
  currentAge: number,
  retirementAge: number,
  annualIncome: number,
  livingExpenses: number,
  stockAllocation: number,
  annualInflation: number,
  state: TaxRegion,
  taxIncome: boolean,
  taxRetirement: boolean
): RetirementCalculationResult {
  const yearsToRetirement = retirementAge - currentAge;
  const stockGrowthRate = 0.07;
  const bondGrowthRate = 0.03;
  const stockProportion = stockAllocation / 100;
  const bondProportion = (100 - stockAllocation) / 100;
  const biweeklyStockGrowthRate = stockGrowthRate / 26;
  const biweeklyBondGrowthRate = bondGrowthRate / 26;
  let retirementAccount = new Account();
  // Deposits are assumed to be biweekly
  let biweeklyIncome = annualIncome / 26;
  if (taxIncome) {
    const taxedIncome = applyTax(annualIncome, state);
    biweeklyIncome = taxedIncome / 26;
  }

  // Accumulate assets until retirement
  for (let i = 0; i < yearsToRetirement; i++) {
    const inflationMultiplier = i === 0 ? 1 : Math.pow(1 + annualInflation / 100, i);
    const adjustedLivingExpenses = livingExpenses * inflationMultiplier;
    const biweeklySavings = biweeklyIncome - (adjustedLivingExpenses / 26);
    const bondBuy = bondProportion * biweeklySavings;
    const stockBuy = stockProportion * biweeklySavings;
    for (let j = 0; j < 26; j++) {
      retirementAccount.applyGrowth(biweeklyStockGrowthRate, biweeklyBondGrowthRate);
      retirementAccount.buyBond(bondBuy);
      retirementAccount.buyStock(stockBuy, i, j * 2);
    }
  }

  // Withdraw from assets during retirement
  const retirementAssetsBackup = retirementAccount.getAccountValue();
  let yearsInRetirement = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const inflationMultiplier = Math.pow(1 + annualInflation / 100, yearsInRetirement);
    const annualRetirementIncome = livingExpenses * inflationMultiplier;

    retirementAccount = findGrossIncome(annualRetirementIncome, state, stockProportion, bondProportion, retirementAccount, yearsInRetirement + yearsToRetirement, taxRetirement);

    // Exit the loop if the account is empty or the retirement will last indefinitely
    if (retirementAccount.getAccountValue() === 0 || yearsInRetirement >= 1000) {
      break;
    }

    // Apply growth for the remaining assets
    retirementAccount.applyGrowth(stockGrowthRate, bondGrowthRate);
    yearsInRetirement++;
  }

  return {
    totalAssets: retirementAssetsBackup,
    yearsLasted: yearsInRetirement
  };
}

function applyCapitalGainsTax(shortTermGains: number, longTermGains: number): number {
  const shortTermRate = 0.25;
  let longTermRate = 0.0;

  // Calculate the appropriate long-term capital gains tax rate
  if (shortTermGains + longTermGains > 492300) {
    longTermRate = 0.20;
  } else if (shortTermGains + longTermGains > 44625) {
    longTermRate = 0.15;
  } else {
    longTermRate = 0.0;
  }

  const shortTermTax = shortTermGains * shortTermRate;
  const longTermTax = longTermGains * longTermRate;

  return shortTermTax + longTermTax;
}

/**
 * Apply federal and state taxes to the given income.
 * 
 * @param income The gross income to be taxed
 * @param state The state for which to apply state taxes
 * @returns The net income after taxes
 */
export function applyTax(income: number, state: TaxRegion, stateTaxFree = false) {
  // Account for deductions
  const federalTaxableIncome = income - FEDERAL_TAX_DEDUCTION;
  let federalTaxAmount = 0;
  let previousThreshold = 0;

  // Add up the federal tax based on the tax brackets
  if (federalTaxableIncome > 0) {
    for (const bracket of FEDERAL_TAX_RATES) {
      if (federalTaxableIncome > bracket.threshold) {
        federalTaxAmount += (bracket.threshold - previousThreshold) * bracket.rate;
        previousThreshold = bracket.threshold;
      } else {
        federalTaxAmount += (federalTaxableIncome - previousThreshold) * bracket.rate;
        break;
      }
    }
  }

  const stateInfo = STATE_TAX_RATES[state];
  // Account for deductions
  const stateTaxableIncome = income - stateInfo.standardDeduction - stateInfo.personalExemption;
  let stateTaxAmount = 0;
  previousThreshold = 0;

  if (!stateTaxFree) {
    // Add up the state tax based on the brackets (some states have a flat rate or no income tax)
    for (const bracket of stateInfo.brackets) {
      if (stateTaxableIncome > bracket.threshold) {
        stateTaxAmount += (bracket.threshold - previousThreshold) * bracket.rate;
        previousThreshold = bracket.threshold;
      } else {
        stateTaxAmount += (stateTaxableIncome - previousThreshold) * bracket.rate;
        break;
      }
    }
  }

  // Return net income
  const totalTaxAmount = federalTaxAmount + stateTaxAmount;
  return income - totalTaxAmount;
}

/**
 * Calculate the gross income needed to achieve a specified net income after taxes.
 * Uses a binary search method to approximate the gross income.
 * 
 * @param netIncome The desired net income after taxes
 * @param state The state for which to apply state taxes
 * @returns The estimated gross income required to achieve the specified net income
 */
function findGrossIncome(
  netIncome: number,
  state: TaxRegion,
  stockProportion: number,
  bondProportion: number,
  account: Account,
  years: number,
  taxWithdrawals: boolean
): Account {
  let lowerBound = netIncome;
  let upperBound = netIncome * 1.25;
  let tempAccount = new Account();
  
  // Binary search to calculate gross income to the nearest dollar
  while (upperBound - lowerBound > 1) {
    tempAccount = account.clone();
    const midPoint = (lowerBound + upperBound) / 2;

    // Attempt to withdraw from the account
    const firstStockWithdrawalResult = tempAccount.sellStock(stockProportion * midPoint, years);
    let bondWithdrawalResult = tempAccount.sellBond(bondProportion * midPoint);

    if (firstStockWithdrawalResult.insufficientAssets && bondWithdrawalResult.insufficientAssets) {
      upperBound = midPoint;
      tempAccount = new Account();
      continue;
    }
    // If stocks or bonds are insufficient, adjust the proportions
    if (firstStockWithdrawalResult.insufficientAssets) {
      const remainingStockNeeded = (stockProportion * midPoint) - (stockProportion * firstStockWithdrawalResult.shortTermGains + stockProportion * firstStockWithdrawalResult.longTermGains);
      bondWithdrawalResult = tempAccount.sellBond(bondProportion * midPoint + remainingStockNeeded);
    }
    let secondStockWithdrawalResult = null;
    if (bondWithdrawalResult.insufficientAssets) {
      const remainingBondNeeded = (bondProportion * midPoint) - bondWithdrawalResult.taxableAmount;
      secondStockWithdrawalResult = tempAccount.sellStock(stockProportion * midPoint + remainingBondNeeded, years);
    }

    let bondTax = 0;
    let stockTax = 0;
    if (taxWithdrawals) {
      // Calculate the taxable amounts
      if (!secondStockWithdrawalResult) {
        bondTax = applyTax(bondWithdrawalResult.taxableAmount, state, true) - bondWithdrawalResult.taxableAmount;
        stockTax = applyCapitalGainsTax(
          firstStockWithdrawalResult.shortTermGains,
          firstStockWithdrawalResult.longTermGains
        );
      } else {
        bondTax = applyTax(bondWithdrawalResult.taxableAmount, state, true) - bondWithdrawalResult.taxableAmount;
        stockTax = applyCapitalGainsTax(
          firstStockWithdrawalResult.shortTermGains + secondStockWithdrawalResult.shortTermGains,
          firstStockWithdrawalResult.longTermGains + secondStockWithdrawalResult.longTermGains
        );
      }
    }

    // Calculate the estimated net income
    const estimatedNetIncome = midPoint - bondTax - stockTax;

    // Adjust bounds based on comparison of estimated and desired
    if (estimatedNetIncome < netIncome) {
      lowerBound = midPoint;
    } else {
      upperBound = midPoint;
    }
  }

  return tempAccount;
}
