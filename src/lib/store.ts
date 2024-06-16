import { writable } from 'svelte/store';

export const currentAge = writable(30);
export const retirementAge = writable(65);
export const annualIncome = writable(50000);
export const livingExpenses = writable(30000);
export const assetAllocation = writable(70);
export const annualInflation = writable(2);
export const withdrawalRate = writable(4);
