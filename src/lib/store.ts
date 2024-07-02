import { get, writable } from 'svelte/store';
import { CURRENT_AGE_DEFAULT, RETIREMENT_AGE_DEFAULT, ANNUAL_INCOME_DEFAULT, LIVING_EXPENSES_DEFAULT, STOCK_ALLOCATION_DEFAULT, BOND_ALLOCATION_DEFAULT, ANNUAL_INFLATION_DEFAULT, SELECTED_STATE_DEFAULT, TAX_INCOME_DEFAULT, TAX_RETIREMENT_DEFAULT, DARK_MODE_DEFAULT } from './constants';

export const currentAge = writable(CURRENT_AGE_DEFAULT);
export const retirementAge = writable(RETIREMENT_AGE_DEFAULT);
export const annualIncome = writable(ANNUAL_INCOME_DEFAULT);
export const livingExpenses = writable(LIVING_EXPENSES_DEFAULT);
export const stockAllocation = writable(STOCK_ALLOCATION_DEFAULT);
export const bondAllocation = writable(BOND_ALLOCATION_DEFAULT);
export const annualInflation = writable(ANNUAL_INFLATION_DEFAULT);
export const selectedState = writable(SELECTED_STATE_DEFAULT);
export const taxIncome = writable(TAX_INCOME_DEFAULT);
export const taxRetirement = writable(TAX_RETIREMENT_DEFAULT);
export const darkMode = writable(DARK_MODE_DEFAULT);

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
