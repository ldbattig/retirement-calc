import { State } from './types/state';

// Rates are averaged for states that don't have a flat rate
// TODO: expand to reflect income brackets
export const STATE_TAX_RATES: Record<State, number> = {
  [State.AL]: 0.035, [State.AK]: 0.00, [State.AZ]: 0.025, [State.AR]: 0.0345,
  [State.CA]: 0.072, [State.CO]: 0.044, [State.CT]: 0.04995, [State.DE]: 0.044,
  [State.FL]: 0.00, [State.GA]: 0.03875, [State.HI]: 0.062, [State.ID]: 0.058,
  [State.IL]: 0.0495, [State.IN]: 0.0315, [State.IA]: 0.052, [State.KS]: 0.0485,
  [State.KY]: 0.045, [State.LA]: 0.0305, [State.ME]: 0.06475, [State.MD]: 0.03875,
  [State.MA]: 0.053, [State.MI]: 0.0435, [State.MN]: 0.0744, [State.MS]: 0.05,
  [State.MO]: 0.035, [State.MT]: 0.0435, [State.NE]: 0.0497, [State.NV]: 0.00,
  [State.NH]: 0.00, [State.NJ]: 0.061, [State.NM]: 0.038, [State.NY]: 0.0745,
  [State.NC]: 0.0475, [State.ND]: 0.01875, [State.OH]: 0.0338, [State.OK]: 0.025,
  [State.OR]: 0.072, [State.PA]: 0.0307, [State.RI]: 0.0487, [State.SC]: 0.0325,
  [State.SD]: 0.00, [State.TN]: 0.00, [State.TX]: 0.00, [State.UT]: 0.0485,
  [State.VT]: 0.0605, [State.VA]: 0.03875, [State.WA]: 0.00, [State.WV]: 0.045,
  [State.WI]: 0.056, [State.WY]: 0.00
};

// 2024 rates from https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024
export const FEDERAL_TAX_RATES = [
	{ rate: 0.10, threshold: 11600 },
	{ rate: 0.12, threshold: 47150 },
	{ rate: 0.22, threshold: 100525 },
	{ rate: 0.24, threshold: 191950 },
	{ rate: 0.32, threshold: 243725 },
	{ rate: 0.35, threshold: 609350 },
	{ rate: 0.37, threshold: Infinity}
];

export const CURRENT_AGE_DEFAULT = 30;
export const RETIREMENT_AGE_DEFAULT = 65;
export const ANNUAL_INCOME_DEFAULT = 60000;
export const LIVING_EXPENSES_DEFAULT = 40000;
export const STOCK_ALLOCATION_DEFAULT = 70;
export const BOND_ALLOCATION_DEFAULT = 30;
export const ANNUAL_INFLATION_DEFAULT = 2.5;
export const SELECTED_STATE_DEFAULT = State.CA;
export const TAX_INCOME_DEFAULT = true;
export const TAX_RETIREMENT_DEFAULT = true;
export const DARK_MODE_DEFAULT = false;
