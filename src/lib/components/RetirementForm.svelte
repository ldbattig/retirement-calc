<script lang="ts">
  import { currentAge, retirementAge, annualIncome, annualExpenses, stockAllocation, bondAllocation, annualInflation, selectedState, taxIncome, taxRetirement } from '$lib/store';
  import { applyTax } from '$lib/utils/calculations';
  import { Input, Label, Card, Select, Toggle, Heading, P, Range, Button, Popover } from 'flowbite-svelte';
  import { TaxRegion } from '$lib/types/tax/state';
	import RetirementSummary from './RetirementSummary.svelte';
	import { formatCurrency } from '$lib/utils/utility';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';

  let annualIncomeAfterTax = 0;

  const states = Object.keys(TaxRegion)
    .map(key => ({
      value: TaxRegion[key as keyof typeof TaxRegion],
      name: TaxRegion[key as keyof typeof TaxRegion]
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

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
    <Heading tag="h1" class="text-center text-2xl font-bold mb-4">Retirement Calculator</Heading>

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
        <Label for="livingExpenses" class="mb-2">Annual Expenses ($)</Label>
        <Input class="focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" bind:value={$annualExpenses} id="livingExpenses" />
      </div>
    </div>

    <div class="flex space-x-4 mb-4 items-center">
      <div class="flex-1">
        <div class="flex items-center space-x-2">
          <Label for="taxIncome">Tax Income</Label>
          <Button id="b1" pill={true} class="!p-0 bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 focus:ring-blue-300 dark:focus:ring-blue-800">
            <InfoCircleOutline/>
          </Button>
          <Popover class="w-64 text-sm" title="Income Tax Explanation" triggeredBy="#b1">Federal and state income tax will be applied to the annual income.</Popover>
        </div>
        <Toggle color="blue" bind:checked={$taxIncome} id="taxIncome" class="mt-2"/>
      </div>
      

      <div class="flex-1">
        <Label class="mb-2">Income After Tax</Label>
        <P class="text-lg font-bold">{formatCurrency(annualIncomeAfterTax)}</P>
      </div>

      <div class="flex-1">
        <div class="flex items-center space-x-2">
          <Label for="taxRetirement">Tax Retirement</Label>
          <Button id="b2" pill={true} class="!p-0 bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 focus:ring-blue-300 dark:focus:ring-blue-800">
            <InfoCircleOutline/>
          </Button>
          <Popover class="w-64 text-sm" title="Retirement Tax Explanation" triggeredBy="#b2">Capital gains tax will be applied to stock liquidations. Federal and state income tax will be applied to bond liquidations.</Popover>
        </div>
        <Toggle color="blue" bind:checked={$taxRetirement} id="taxRetirement" class="mt-2"/>
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