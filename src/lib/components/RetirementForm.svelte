<script lang="ts">
  import { currentAge, retirementAge, annualIncome, livingExpenses, stockAllocation, bondAllocation, annualInflation, withdrawalRate } from '$lib/store';

  let totalAssetsAtRetirement = 0;
  let yearsAssetsWillLast = 0;

  $: {
    const { totalAssets, yearsLasted } = calculateAssets($currentAge, $retirementAge, $annualIncome, $livingExpenses, $stockAllocation, $annualInflation, $withdrawalRate);
    totalAssetsAtRetirement = totalAssets;
    yearsAssetsWillLast = yearsLasted;
  }

  $: stockAllocation.subscribe(value => {
    if (value !== 100 - $bondAllocation) {
      bondAllocation.set(100 - value);
    }
  });

  $: bondAllocation.subscribe(value => {
    if (value !== 100 - $stockAllocation) {
      stockAllocation.set(100 - value);
    }
  });

  function calculateAssets(currentAge: number, retirementAge: number, annualIncome: number, livingExpenses: number, assetAllocation: number, annualInflation: number, withdrawalRate: number) {
    const yearsToRetirement = retirementAge - currentAge;
    const annualSavings = annualIncome - livingExpenses;
    const stockGrowthRate = 0.07;
    const bondGrowthRate = 0.03;
    const growthRate = (assetAllocation / 100) * stockGrowthRate + ((100 - assetAllocation) / 100) * bondGrowthRate;

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
</script>

<div class="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
  <h1 class="text-2xl font-bold mb-4">Retirement Calculator</h1>

  <div class="mb-4">
    <label for="currentAge" class="block text-sm font-medium text-gray-700">Current Age</label>
    <input type="range" id="currentAge" bind:value={$currentAge} min="20" max="100" class="mt-1 block w-full" />
    <p>{$currentAge}</p>
  </div>

  <div class="mb-4">
    <label for="retirementAge" class="block text-sm font-medium text-gray-700">Retirement Age</label>
    <input type="range" id="retirementAge" bind:value={$retirementAge} min="20" max="100" class="mt-1 block w-full" />
    <p>{$retirementAge}</p>
  </div>

  <div class="mb-4">
    <label for="annualIncome" class="block text-sm font-medium text-gray-700">Annual Income</label>
    <input type="number" id="annualIncome" bind:value={$annualIncome} class="mt-1 block w-full" />
  </div>

  <div class="mb-4">
    <label for="livingExpenses" class="block text-sm font-medium text-gray-700">Living Expenses</label>
    <input type="number" id="livingExpenses" bind:value={$livingExpenses} class="mt-1 block w-full" />
  </div>

  <div class="mb-4">
    <label for="stockAllocation" class="block text-sm font-medium text-gray-700">Stocks Allocation (%)</label>
    <input type="range" id="stockAllocation" bind:value={$stockAllocation} min="0" max="100" class="mt-1 block w-full" />
    <p>{$stockAllocation}%</p>
  </div>

  <div class="mb-4">
    <label for="bondAllocation" class="block text-sm font-medium text-gray-700">Bonds Allocation (%)</label>
    <input type="range" id="bondAllocation" bind:value={$bondAllocation} min="0" max="100" class="mt-1 block w-full" />
    <p>{$bondAllocation}%</p>
  </div>

  <div class="mb-4">
    <label for="annualInflation" class="block text-sm font-medium text-gray-700">Annual Inflation (%)</label>
    <input type="range" id="annualInflation" bind:value={$annualInflation} min="0" max="10" step="0.1" class="mt-1 block w-full" />
    <p>{$annualInflation}%</p>
  </div>

  <div class="mb-4">
    <label for="withdrawalRate" class="block text-sm font-medium text-gray-700">Withdrawal Rate (%)</label>
    <input type="range" id="withdrawalRate" bind:value={$withdrawalRate} min="0" max="10" step="0.1" class="mt-1 block w-full" />
    <p>{$withdrawalRate}%</p>
  </div>

  <div class="mt-4 p-4 bg-gray-100 rounded">
    <h2 class="text-xl font-semibold">Calculated Assets at Retirement</h2>
    <p class="text-lg font-bold">${totalAssetsAtRetirement.toFixed(2)}</p>
    <h2 class="text-xl font-semibold">Years Assets Will Last</h2>
    <p class="text-lg font-bold">{yearsAssetsWillLast}</p>
  </div>
</div>
