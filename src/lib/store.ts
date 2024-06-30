import { get, writable } from 'svelte/store';
import { State } from './types/state';

export const currentAge = writable(30);
export const retirementAge = writable(65);
export const annualIncome = writable(60000);
export const annualExpenses = writable(40000);
export const stockAllocation = writable(70);
export const bondAllocation = writable(30);
export const annualInflation = writable(2.5);
export const selectedState = writable(State.CA);
export const taxIncome = writable(true);
export const taxRetirement = writable(true);
export const darkMode = writable(false);

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
