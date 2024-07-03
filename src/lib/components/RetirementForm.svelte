<script lang="ts">
  import { currentAge, retirementAge, annualIncome, livingExpenses, stockAllocation, bondAllocation, annualInflation, selectedState, taxIncome, taxRetirement, darkMode, resetStore } from '$lib/store';
  import { applyTax } from '$lib/utils/calculations';
  import { Input, Label, Card, Select, Toggle, Heading, P, Range, Button } from 'flowbite-svelte';
  import { State } from '$lib/types/state';
	import RetirementSummary from './RetirementSummary.svelte';
	import { formatCurrency } from '$lib/utils/utility';
	import { RefreshOutline } from 'flowbite-svelte-icons';

  let annualIncomeAfterTax = 0;

  const states = Object.keys(State).map(key => ({
    value: State[key as keyof typeof State],
    name: State[key as keyof typeof State]
  }));

  $: {
    if ($taxIncome) {
      annualIncomeAfterTax = applyTax($annualIncome, $selectedState);
    } else {
      annualIncomeAfterTax = $annualIncome;
    }
  }
</script>

<div class="max-w-xl mx-auto">
  <Card size="md" padding="md">
    <div class="flex items-center justify-between mb-4">
      <!-- Spacer div to keep the Heading centered -->
      <div class="w-9 flex-shrink-0"></div>
      <Heading tag="h1" class="text-center text-2xl font-bold">Retirement Calculator</Heading>
      <Button on:click={resetStore} class="!p-2 bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 focus:ring-blue-300 dark:focus:ring-blue-800">
        <RefreshOutline/>
      </Button>
    </div>

    <div class="mb-4">
      <Label for="currentAge" class="mb-2">Current Age</Label>
      <Range id="currentAge" bind:value={$currentAge} min="20" max="100" class="mt-1 block w-full" />
      <P>{$currentAge}</P>
    </div>

    <div class="mb-4">
      <Label for="retirementAge" class="mb-2">Retirement Age</Label>
      <Range id="retirementAge" bind:value={$retirementAge} min="20" max="100" class="mt-1 block w-full" />
      <P>{$retirementAge}</P>
    </div>

    <div class="flex space-x-4 mb-4">
      <div class="flex-1">
        <Label for="state" class="mb-2">State</Label>
        <Select class="focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" items={states} bind:value={$selectedState} />
      </div>

      <div class="flex-1">
        <Label for="annualIncome" class="mb-2">Annual Income ($)</Label>
        <Input class="focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" bind:value={$annualIncome} id="annualIncome" />
      </div>

      <div class="flex-1">
        <Label for="livingExpenses" class="mb-2">Living Expenses ($)</Label>
        <Input class="focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" bind:value={$livingExpenses} id="livingExpenses" />
      </div>
    </div>

    <div class="flex space-x-4 mb-4 items-center">
      <div class="flex-1">
        <Label for="taxIncome" class="mb-2">Tax Income</Label>
        <Toggle color="blue" bind:checked={$taxIncome} id="taxIncome"/>
      </div>

      <div class="flex-1">
        <Label class="mb-2">Income After Tax</Label>
        <P class="text-lg font-bold">{formatCurrency(annualIncomeAfterTax)}</P>
      </div>

      <div class="flex-1">
        <Label for="taxRetirement" class="mb-2">Tax Retirement</Label>
        <Toggle color="blue" bind:checked={$taxRetirement} id="taxRetirement"/>
      </div>
    </div>

    <div class="mb-4">
      <Label for="stockAllocation" class="mb-2">Stocks Allocation</Label>
      <Range id="stockAllocation" bind:value={$stockAllocation} min="0" max="100" class="mt-1 block w-full" />
      <P>{$stockAllocation}%</P>
    </div>

    <div class="mb-4">
      <Label for="bondAllocation" class="mb-2">Bonds Allocation</Label>
      <Range id="bondAllocation" bind:value={$bondAllocation} min="0" max="100" class="mt-1 block w-full" />
      <P>{$bondAllocation}%</P>
    </div>

    <div class="mb-4">
      <Label for="annualInflation" class="mb-2">Annual Inflation</Label>
      <Range id="annualInflation" bind:value={$annualInflation} min="0" max="10" step="0.1" class="mt-1 block w-full" />
      <P>{$annualInflation}%</P>
    </div>

    <RetirementSummary />
  </Card>
</div>