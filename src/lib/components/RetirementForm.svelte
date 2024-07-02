<script lang="ts">
  import { currentAge, retirementAge, annualIncome, livingExpenses, stockAllocation, bondAllocation, annualInflation, selectedState, taxIncome, taxRetirement, darkMode } from '$lib/store';
  import { applyTax } from '$lib/utils/calculations';
  import { Input, Label, Card, Select, Toggle, Heading, P, Range, Button } from 'flowbite-svelte';
  import { State } from '$lib/types/state';
	import RetirementSummary from './RetirementSummary.svelte';
	import { formatCurrency } from '$lib/utils/utility';
	import { RefreshOutline } from 'flowbite-svelte-icons';
	import { CURRENT_AGE_DEFAULT, RETIREMENT_AGE_DEFAULT, ANNUAL_INCOME_DEFAULT, LIVING_EXPENSES_DEFAULT, STOCK_ALLOCATION_DEFAULT, BOND_ALLOCATION_DEFAULT, ANNUAL_INFLATION_DEFAULT, SELECTED_STATE_DEFAULT, TAX_INCOME_DEFAULT, TAX_RETIREMENT_DEFAULT, DARK_MODE_DEFAULT } from '$lib/constants';

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

  function resetStore() {
    currentAge.set(CURRENT_AGE_DEFAULT);
    retirementAge.set(RETIREMENT_AGE_DEFAULT);
    annualIncome.set(ANNUAL_INCOME_DEFAULT);
    livingExpenses.set(LIVING_EXPENSES_DEFAULT);
    stockAllocation.set(STOCK_ALLOCATION_DEFAULT);
    bondAllocation.set(BOND_ALLOCATION_DEFAULT);
    annualInflation.set(ANNUAL_INFLATION_DEFAULT);
    selectedState.set(SELECTED_STATE_DEFAULT);
    taxIncome.set(TAX_INCOME_DEFAULT);
    taxRetirement.set(TAX_RETIREMENT_DEFAULT);
    darkMode.set(DARK_MODE_DEFAULT);
  }
</script>

<div class="max-w-xl mx-auto">
  <Card size="md" padding="md">
    <div class="relative">
      <Heading tag="h1" class="text-center text-2xl font-bold mb-4">Retirement Calculator</Heading>
      <Button on:click={resetStore} class="!p-2 absolute top-0 right-0 bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 focus:ring-blue-300 dark:focus:ring-blue-800">
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