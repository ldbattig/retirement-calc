<script lang="ts">
  import { currentAge, retirementAge, annualIncome, livingExpenses, stockAllocation, bondAllocation, annualInflation, selectedState } from '$lib/store';
  import { calculateAssets } from '$lib/utils/calculations';
  import { Input, Label, Card, Select } from 'flowbite-svelte';
  import { ThumbsUpSolid } from 'flowbite-svelte-icons';
  import { State } from '$lib/types/state';

  // Summary data calculated based on user input
  let totalAssetsAtRetirement = 0;
  let yearsAssetsWillLast = 0;

  // Values for grading the number of years that retirement assets will last
  const maxYears = 30;
  const minYears = 0;

  const states = Object.keys(State).map(key => ({
    value: State[key as keyof typeof State],
    name: State[key as keyof typeof State]
  }));

  $: {
    const { totalAssets, yearsLasted } = calculateAssets($currentAge, $retirementAge, $annualIncome, $livingExpenses, $stockAllocation, $annualInflation, $selectedState);
    totalAssetsAtRetirement = totalAssets;
    yearsAssetsWillLast = yearsLasted;
  }

  function getRotationAngle(years: number) {
    // Normalize years within the range and convert to an angle
    let normalizedYears = Math.min(Math.max(years, minYears), maxYears);
    // Calculate the angle
    return -180 * (1 - (normalizedYears - minYears) / (maxYears - minYears));
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
</script>

<div class="max-w-xl mx-auto">
  <Card size="md" padding="md" class="text-gray-700">
    <h1 class="text-center text-2xl font-bold mb-4">Retirement Calculator</h1>

    <div class="mb-4">
      <Label for="currentAge" class="mb-2">Current Age</Label>
      <input type="range" id="currentAge" bind:value={$currentAge} min="20" max="100" class="mt-1 block w-full" />
      <p>{$currentAge}</p>
    </div>

    <div class="mb-4">
      <Label for="retirementAge" class="mb-2">Retirement Age</Label>
      <input type="range" id="retirementAge" bind:value={$retirementAge} min="20" max="100" class="mt-1 block w-full" />
      <p>{$retirementAge}</p>
    </div>

    <div class="flex space-x-4 mb-4">
      <div class="flex-1">
        <Label for="annualIncome" class="mb-2">Annual Income ($)</Label>
        <Input class="focus:ring-blue-500 focus:border-blue-500" type="number" bind:value={$annualIncome} id="annualIncome" />
      </div>

      <div class="flex-1">
        <Label for="livingExpenses" class="mb-2">Living Expenses ($)</Label>
        <Input class="focus:ring-blue-500 focus:border-blue-500" type="number" bind:value={$livingExpenses} id="livingExpenses" />
      </div>

      <div class="flex-1">
        <Label for="state" class="mb-2">State</Label>
        <Select class="focus:ring-blue-500 focus:border-blue-500" items={states} bind:value={$selectedState} />
      </div>
    </div>

    <div class="mb-4">
      <Label for="stockAllocation" class="mb-2">Stocks Allocation</Label>
      <input type="range" id="stockAllocation" bind:value={$stockAllocation} min="0" max="100" class="mt-1 block w-full" />
      <p>{$stockAllocation}%</p>
    </div>

    <div class="mb-4">
      <Label for="bondAllocation" class="mb-2">Bonds Allocation</Label>
      <input type="range" id="bondAllocation" bind:value={$bondAllocation} min="0" max="100" class="mt-1 block w-full" />
      <p>{$bondAllocation}%</p>
    </div>

    <div class="mb-4">
      <Label for="annualInflation" class="mb-2">Annual Inflation</Label>
      <input type="range" id="annualInflation" bind:value={$annualInflation} min="0" max="10" step="0.1" class="mt-1 block w-full" />
      <p>{$annualInflation}%</p>
    </div>

    <Card size="md" padding="md" class="text-gray-700">
      <h3 class="text-2xl font-bold text-center">Summary</h3>
      <div class="flex">
        <div class="w-1/2 p-4">
          <p class="text-lg">Retirement Assets</p>
          <p class="text-lg font-bold">{formatCurrency(totalAssetsAtRetirement)}</p>
          <p class="text-lg">Years Assets Will Last</p>
          <p class="text-lg font-bold">{yearsAssetsWillLast}</p>
        </div>
        <div class="w-1/2 p-4 flex items-center justify-center">
          <div class="flex flex-col items-center">
          <ThumbsUpSolid size="xl" style={`transform: rotate(${getRotationAngle(yearsAssetsWillLast)}deg); transition: transform 0.3s;`} />
          <p class="text-lg">
            {#if yearsAssetsWillLast > 20}
              You're a wizard!
            {:else if yearsAssetsWillLast > 10}
              Not too shabby!
            {:else}
              Living on a prayer!
            {/if}
          </p>
          </div>
        </div>
      </div>
    </Card>
  </Card>
</div>