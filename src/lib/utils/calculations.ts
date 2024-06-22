import type { RetirementCalculationResult } from "$lib/types/retirementCalculationResult";

/**
 * Determine the assets available at a later date given income, expenses, and allocation data 
 * @param currentAge in years
 * @param retirementAge in years
 * @param annualIncome in whole dollars
 * @param livingExpenses in whole dollars
 * @param stockAllocation percent of assets invested in stocks out of 100
 * @param annualInflation percentage of annual inflation out of 100
 * @param withdrawalRate percentage of assets that will be removed per year during retirement
 * @returns {RetirementCalculationResult} total assets and the years they will last
 */
export function calculateAssets(
  currentAge: number,
  retirementAge: number,
  annualIncome: number,
  livingExpenses: number,
  stockAllocation: number,
  annualInflation: number,
  withdrawalRate: number
): RetirementCalculationResult {
  const yearsToRetirement = retirementAge - currentAge;
  const annualSavings = annualIncome - livingExpenses;
  const stockGrowthRate = 0.07;
  const bondGrowthRate = 0.03;
  const growthRate = (stockAllocation / 100) * stockGrowthRate + ((100 - stockAllocation) / 100) * bondGrowthRate;

  // Accumulate assets until retirement
  let assetsAtRetirement = 0;
  for (let i = 0; i < yearsToRetirement; i++) {
    assetsAtRetirement += annualSavings;
    assetsAtRetirement *= (1 + growthRate);
  }

  // Withdraw from assets during retirement
  let remainingAssets = assetsAtRetirement;
  let yearsInRetirement = 0;
  while (remainingAssets > 0) {
    const withdrawalAmount = livingExpenses * Math.pow(1 + annualInflation / 100, yearsInRetirement);
    remainingAssets -= withdrawalAmount;
    remainingAssets *= (1 + (growthRate - withdrawalRate / 100));
    yearsInRetirement++;
  }

  return {
    totalAssets: assetsAtRetirement,
    yearsLasted: Math.max(0, yearsInRetirement - 1) // Subtract one because the loop increments one extra year before going negative
  };
}
  