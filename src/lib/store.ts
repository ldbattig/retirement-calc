import { get, writable } from 'svelte/store';

export const currentAge = writable(30);
export const retirementAge = writable(65);
export const annualIncome = writable(50000);
export const livingExpenses = writable(30000);
export const stockAllocation = writable(70);
export const bondAllocation = writable(30);
export const annualInflation = writable(2);
export const withdrawalRate = writable(4);

stockAllocation.subscribe(value => {
  if (value !== 100 - get(bondAllocation)) {
    bondAllocation.set(100 - value);
  }
});

bondAllocation.subscribe(value => {
  if (value !== 100 - get(stockAllocation)) {
    stockAllocation.set(100 - value);
  }
});
