<script lang="ts">
	import { currentAge, retirementAge, annualIncome, livingExpenses, stockAllocation, annualInflation, selectedState, taxIncome, taxRetirement } from '$lib/store';
	import { calculateAssets } from '$lib/utils/calculations';
	import { Badge, Card, Heading, P } from 'flowbite-svelte';
	import { ThumbsUpSolid } from 'flowbite-svelte-icons';
	import { formatCurrency } from '$lib/utils/utility';

	// Summary data calculated based on user input
	let totalAssetsAtRetirement = 0;
	let yearsAssetsWillLast = 0;

	// Values for grading the number of years that retirement assets will last
	const maxYears = 30;
	const minYears = 0;

	$: {
		const { totalAssets, yearsLasted } = calculateAssets($currentAge, $retirementAge, $annualIncome, $livingExpenses, $stockAllocation, $annualInflation, $selectedState, $taxIncome, $taxRetirement);
		totalAssetsAtRetirement = totalAssets;
		yearsAssetsWillLast = yearsLasted;
	}

	function getRotationAngle(years: number) {
		// Normalize years within the range and convert to an angle
		let normalizedYears = Math.min(Math.max(years, minYears), maxYears);
		// Calculate the angle
		return -180 * (1 - (normalizedYears - minYears) / (maxYears - minYears));
	}

	function getColor(years: number) {
		// Normalize years within the range
		let normalizedYears = Math.min(Math.max(years, minYears), maxYears);
		// Calculate the color (muted green to muted red)
		let green = Math.floor((normalizedYears / maxYears) * 150 + 50);
		let red = Math.floor(((maxYears - normalizedYears) / maxYears) * 150 + 50);
		return `rgb(${red}, ${green}, 50)`;
	}
</script>

<Card size="md" padding="md">
	<Heading tag="h3" class="text-2xl font-bold text-center">Summary</Heading>
	<div class="flex">
	  <div class="w-1/2 p-4">
			<P class="text-lg">Retirement Assets</P>
			<P class="text-lg font-bold">{formatCurrency(totalAssetsAtRetirement)}</P>
			<P class="text-lg">Years Assets Will Last</P>
			<P class="text-lg font-bold">{yearsAssetsWillLast}</P>
	  </div>
	  <div class="w-1/2 p-4 flex items-center justify-center">
			<div class="flex flex-col items-center">
				<Badge color="dark" rounded large class="!p-3 !font-semibold">
					<ThumbsUpSolid size="xl" style={`transform: rotate(${getRotationAngle(yearsAssetsWillLast)}deg); transition: transform 0.3s; color: ${getColor(yearsAssetsWillLast)};`} />
				</Badge>
				<P class="text-lg">
				{#if yearsAssetsWillLast > 20}
					You're a wizard!
				{:else if yearsAssetsWillLast > 10}
					Not too shabby!
				{:else}
					Living on a prayer!
				{/if}
				</P>
			</div>
		</div>
	</div>
</Card>