import type { RetirementCalculationResult } from "$lib/types/retirementCalculationResult";
import { STATE_TAX_RATES, FEDERAL_TAX_RATES } from "$lib/constants";
import type { State } from "$lib/types/state";

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
  state: State,
  taxIncome: boolean,
  taxRetirement: boolean
): RetirementCalculationResult {
  const yearsToRetirement = retirementAge - currentAge;
  const stockGrowthRate = 0.07;
  const bondGrowthRate = 0.03;
  const annualGrowthRate = (stockAllocation / 100) * stockGrowthRate + ((100 - stockAllocation) / 100) * bondGrowthRate;
  // Deposits are assumed to be biweekly
  let biweeklyIncome = annualIncome / 26;
  if (taxIncome) {
    const taxedIncome = applyTax(annualIncome, state);
    biweeklyIncome = taxedIncome / 26;
  }
  const biweeklyGrowthRate = annualGrowthRate / 26;

  // Accumulate assets until retirement
  let assetsAtRetirement = 0;
  const biweeklySavings = biweeklyIncome - (livingExpenses / 26);
  for (let i = 0; i < yearsToRetirement * 26; i++) {
    assetsAtRetirement += biweeklySavings;
    assetsAtRetirement *= (1 + biweeklyGrowthRate);
  }

  // Withdraw from assets during retirement
  let remainingAssets = assetsAtRetirement;
  let yearsInRetirement = 0;
  while (remainingAssets > 0) {
    const inflationMultiplier = Math.pow(1 + annualInflation / 100, yearsInRetirement);
    // Account for inflation
    const annualRetirementIncome = livingExpenses * inflationMultiplier;
    let netWithdrawal = annualRetirementIncome;
    if (taxRetirement) {
      // Account for taxes
      netWithdrawal = findGrossIncome(annualRetirementIncome, state);
    }
    remainingAssets -= netWithdrawal;
    remainingAssets *= (1 + annualGrowthRate);
    yearsInRetirement++;
    // Safety break to avoid infinite loop
    if (yearsInRetirement > 1000) {
      break;
    }
  }

  return {
    totalAssets: assetsAtRetirement,
    yearsLasted: Math.max(0, yearsInRetirement - 1) // Subtract one because the loop increments one extra year before going negative
  };
}

/**
 * Apply federal and state taxes to the given income.
 * 
 * @param income The gross income to be taxed
 * @param state The state for which to apply state taxes
 * @returns The net income after taxes
 */
export function applyTax(income: number, state: State): number {
  let remainingIncome = income;
  let taxAmount = 0;

  // Calculate federal tax
  for (const bracket of FEDERAL_TAX_RATES) {
    if (remainingIncome > bracket.threshold) {
      // Tax up to the threshold
      taxAmount += bracket.threshold * bracket.rate;
      remainingIncome -= bracket.threshold;
    } else {
      // Tax the remaining income
      taxAmount += remainingIncome * bracket.rate;
      break;
    }
  }

  // Calculate state tax
  const stateTaxRate = STATE_TAX_RATES[state];
  taxAmount += income * stateTaxRate; // Add state tax

  return income - taxAmount; // Return net income after all taxes
}


/**
 * Calculate the gross income needed to achieve a specified net income after taxes.
 * Uses a binary search method to approximate the gross income.
 * 
 * @param netIncome The desired net income after taxes
 * @param state The state for which to apply state taxes
 * @returns The estimated gross income required to achieve the specified net income
 */
function findGrossIncome(netIncome: number, state: State): number {
  let lowerBound = netIncome;
  let upperBound = netIncome * 1.5;

  // Binary search to calculate gross income to the nearest dollar
  while (upperBound - lowerBound > 1) {
    const midPoint = (lowerBound + upperBound) / 2;
    // Calculate the net income from the midpoint gross income
    const estimatedNetIncome = applyTax(midPoint, state);

    // Adjust bounds based on comparison of estimated and desired
    if (estimatedNetIncome < netIncome) {
      lowerBound = midPoint;
    } else {
      upperBound = midPoint;
    }
  }

  // Average the final bounds
  return (lowerBound + upperBound) / 2;
}
