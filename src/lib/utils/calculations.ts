import type { RetirementCalculationResult } from "$lib/types/retirementCalculationResult";
import { STATE_TAX_RATES, FEDERAL_TAX_RATES, FEDERAL_TAX_DEDUCTION, MS_PER_WEEK, MS_PER_YEAR } from "$lib/constants";
import type { TaxRegion } from "$lib/types/tax/taxRegion";
import { Account } from "$lib/types/portfolio/account";
import type { BondTransactionResult } from "$lib/types/portfolio/bondTransactionResult";
import type { StockTransactionResult } from "$lib/types/portfolio/stockTransactionResult";

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
    const annualSavings = biweeklySavings * 26;
    const bondBuy = bondProportion * annualSavings;
    const stockBuy = stockProportion * annualSavings;

    // Apply annual growth once per year and aggregate contributions
    retirementAccount.applyGrowth(stockGrowthRate, bondGrowthRate);
    retirementAccount.buyBond(bondBuy);
    retirementAccount.buyStock(stockBuy, i, 0);
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
export function findGrossIncome(
  netIncome: number,
  state: TaxRegion,
  stockProportion: number,
  bondProportion: number,
  account: Account,
  years: number,
  taxWithdrawals: boolean
): Account {
  // For untaxed withdrawals, withdraw the requested net income from stocks and bonds
  if (!taxWithdrawals) {
    const grossWithdrawal = netIncome;
    const totalAccountValue = account.getAccountValue();
    if (grossWithdrawal > totalAccountValue) {
      return new Account();
    }

    const resultAccount = account.clone();
    const stockTarget = Math.min(stockProportion * grossWithdrawal, resultAccount.getStockValue());
    const bondTarget = Math.min(bondProportion * grossWithdrawal, resultAccount.getBondValue());

    resultAccount.sellStock(stockTarget, years);
    resultAccount.sellBond(bondTarget);

    return resultAccount;
  }

  let lowerBound = netIncome;
  let upperBound = netIncome * 1.5;
  let grossWithdrawalEstimate = upperBound;

  // Estimate capital gains from selling stocks to reach a target withdrawal
  const simulateStockWithdrawal = (
    target: number,
    sellTimeYears: number
  ): StockTransactionResult => {
    const totalStockValue = account.getStockValue();
    // Cap the requested withdrawal at the total stock value to avoid overselling
    const effectiveTarget = Math.min(target, totalStockValue);

    const sellTime = sellTimeYears * MS_PER_YEAR + 0 * MS_PER_WEEK;
    // Track how much of the target is still unsatisfied as we sell lots
    let remainingAmount = effectiveTarget;
    let shortTermGains = 0;
    let longTermGains = 0;

    // Iterate through stock lots in order until the target withdrawal is met
    for (let i = 0; i < account.stocks.length && remainingAmount > 0; i++) {
      const stock = account.stocks[i];
      const stockValue = stock.currentValue * stock.quantity;
      const holdingPeriod = sellTime - stock.purchaseTime;

      if (stockValue <= remainingAmount) {
        // Sell the entire lot and classify all gains as long term or short term
        const gain = (stock.currentValue - stock.purchasePrice) * stock.quantity;
        if (holdingPeriod > MS_PER_YEAR) {
          longTermGains += gain;
        } else {
          shortTermGains += gain;
        }
        remainingAmount -= stockValue;
      } else {
        // Sell only part of the lot when a full sale would exceed the target
        const quantityToSell = remainingAmount / stock.currentValue;
        const gain = (stock.currentValue - stock.purchasePrice) * quantityToSell;
        if (holdingPeriod > MS_PER_YEAR) {
          longTermGains += gain;
        } else {
          shortTermGains += gain;
        }
        remainingAmount = 0;
      }
    }

    return { shortTermGains, longTermGains, insufficientAssets: effectiveTarget > totalStockValue };
  };

  // Estimate taxable gains from selling bonds to reach a target withdrawal
  const simulateBondWithdrawal = (target: number): BondTransactionResult => {
    const totalBondValue = account.getBondValue();
    // Cap the requested withdrawal at the total bond value to avoid overselling
    const effectiveTarget = Math.min(target, totalBondValue);

    let remainingAmount = effectiveTarget;
    // Aggregate the gains that will be subject to income tax
    let taxableAmount = 0;

    // Iterate through bond positions until we have sold enough to meet the target
    for (let i = 0; i < account.bonds.length && remainingAmount > 0; i++) {
      const bond = account.bonds[i];
      const bondValue = bond.currentValue * bond.quantity;

      if (bondValue <= remainingAmount) {
        // Sell the entire bond position and realize all associated gains
        const gain = (bond.currentValue - bond.purchasePrice) * bond.quantity;
        taxableAmount += gain;
        remainingAmount -= bondValue;
      } else {
        // Sell only the portion of the bond position required to hit the target
        const quantityToSell = remainingAmount / bond.currentValue;
        const gain = (bond.currentValue - bond.purchasePrice) * quantityToSell;
        taxableAmount += gain;
        remainingAmount = 0;
      }
    }

    return { taxableAmount, insufficientAssets: effectiveTarget > totalBondValue };
  };

  // Binary search to calculate gross income to the nearest dollar
  while (upperBound - lowerBound > 1) {
    const midPoint = (lowerBound + upperBound) / 2;
    grossWithdrawalEstimate = midPoint;
    const totalAccountValue = account.getAccountValue();

    if (midPoint > totalAccountValue) {
      upperBound = midPoint;
      continue;
    }

    const stockTarget = stockProportion * midPoint;
    const bondTarget = bondProportion * midPoint;

    const stockResult = simulateStockWithdrawal(stockTarget, years);
    const bondResult = simulateBondWithdrawal(bondTarget);

    const stockProceeds = Math.min(stockTarget, account.getStockValue());
    const bondProceeds = Math.min(bondTarget, account.getBondValue());

    let bondTax = 0;
    let stockTax = 0;
    if (taxWithdrawals) {
      bondTax = applyTax(bondResult.taxableAmount, state, true) - bondResult.taxableAmount;
      stockTax = applyCapitalGainsTax(
        stockResult.shortTermGains,
        stockResult.longTermGains
      );
    }

    // Calculate the estimated net income based on proceeds minus taxes
    const estimatedNetIncome = stockProceeds + bondProceeds - bondTax - stockTax;

    // Adjust bounds based on comparison of estimated and desired
    if (estimatedNetIncome < netIncome) {
      lowerBound = midPoint;
    } else {
      upperBound = midPoint;
    }
  }

  const grossWithdrawal = grossWithdrawalEstimate;
  const resultAccount = account.clone();
  const totalAccountValue = resultAccount.getAccountValue();

  if (grossWithdrawal > totalAccountValue) {
    return new Account();
  }

  const stockTarget = Math.min(stockProportion * grossWithdrawal, resultAccount.getStockValue());
  const bondTarget = Math.min(bondProportion * grossWithdrawal, resultAccount.getBondValue());

  resultAccount.sellStock(stockTarget, years);
  resultAccount.sellBond(bondTarget);

  return resultAccount;
}
