import type { RetirementCalculationResult } from "$lib/types/retirementCalculationResult";
import { STATE_TAX_RATES, FEDERAL_TAX_RATES } from "$lib/constants";
import type { State } from "$lib/types/state";

/**
 * Determine the assets available at a later date given income, expenses, and allocation data 
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
  state: State
): RetirementCalculationResult {
  const yearsToRetirement = retirementAge - currentAge;
  const biweeklyIncome = annualIncome / 26;
  const stockGrowthRate = 0.07;
  const bondGrowthRate = 0.03;
  const growthRate = (stockAllocation / 100) * stockGrowthRate + ((100 - stockAllocation) / 100) * bondGrowthRate;

  // Accumulate assets until retirement
  let assetsAtRetirement = 0;
  for (let i = 0; i < yearsToRetirement * 26; i++) {
    const taxedIncome = applyTax(biweeklyIncome, state);
    const biweeklySavings = taxedIncome - (livingExpenses / 26);
    assetsAtRetirement += biweeklySavings;
    assetsAtRetirement *= Math.pow(1 + growthRate, 1 / 26); // Apply growth rate biweekly
  }

  // Withdraw from assets during retirement
  let remainingAssets = assetsAtRetirement;
  let yearsInRetirement = 0;
  while (remainingAssets > 0) {
    const totalWithdrawal = calculateTotalWithdrawalNeeded(livingExpenses * Math.pow(1 + annualInflation / 100, yearsInRetirement), state);
    remainingAssets -= totalWithdrawal;
    remainingAssets *= (1 + growthRate); // Apply annual growth rate
    yearsInRetirement++;
  }

  return {
    totalAssets: assetsAtRetirement,
    yearsLasted: Math.max(0, yearsInRetirement - 1) // Subtract one because the loop increments one extra year before going negative
  };
}

function applyTax(income: number, state: State): number {
  let remainingIncome = income;
  let taxAmount = 0;

  for (const bracket of FEDERAL_TAX_RATES) {
    if (remainingIncome > bracket.threshold) {
      taxAmount += bracket.threshold * bracket.rate;
      remainingIncome -= bracket.threshold;
    } else {
      taxAmount += remainingIncome * bracket.rate;
      break;
    }
  }

  const stateTaxRate = STATE_TAX_RATES[state];
  taxAmount += income * stateTaxRate;

  return income - taxAmount;
}

function calculateTotalWithdrawalNeeded(livingExpenses: number, state: State): number {
  let totalWithdrawal = livingExpenses;
  let netWithdrawal = applyTax(totalWithdrawal, state);

  while (netWithdrawal < livingExpenses) {
    totalWithdrawal += (livingExpenses - netWithdrawal) / (1 - (FEDERAL_TAX_RATES.reduce((acc, bracket) => acc + bracket.rate, 0) / FEDERAL_TAX_RATES.length) - STATE_TAX_RATES[state]);
    netWithdrawal = applyTax(totalWithdrawal, state);
  }

  return totalWithdrawal;
}
