import { State } from './types/state';

export const STATE_TAX_RATES: Record<State, number> = {
  [State.AL]: 0.05, [State.AK]: 0.00, [State.AZ]: 0.04, [State.AR]: 0.06,
  [State.CA]: 0.10, [State.CO]: 0.04, [State.CT]: 0.06, [State.DE]: 0.05,
  [State.FL]: 0.00, [State.GA]: 0.06, [State.HI]: 0.08, [State.ID]: 0.07,
  [State.IL]: 0.05, [State.IN]: 0.03, [State.IA]: 0.06, [State.KS]: 0.05,
  [State.KY]: 0.05, [State.LA]: 0.04, [State.ME]: 0.05, [State.MD]: 0.06,
  [State.MA]: 0.05, [State.MI]: 0.04, [State.MN]: 0.07, [State.MS]: 0.05,
  [State.MO]: 0.05, [State.MT]: 0.04, [State.NE]: 0.05, [State.NV]: 0.00,
  [State.NH]: 0.00, [State.NJ]: 0.06, [State.NM]: 0.04, [State.NY]: 0.08,
  [State.NC]: 0.05, [State.ND]: 0.03, [State.OH]: 0.05, [State.OK]: 0.05,
  [State.OR]: 0.05, [State.PA]: 0.03, [State.RI]: 0.06, [State.SC]: 0.05,
  [State.SD]: 0.00, [State.TN]: 0.00, [State.TX]: 0.00, [State.UT]: 0.05,
  [State.VT]: 0.06, [State.VA]: 0.05, [State.WA]: 0.00, [State.WV]: 0.05,
  [State.WI]: 0.05, [State.WY]: 0.00
};

export const FEDERAL_TAX_RATES = [
	{ rate: 0.10, threshold: 10275 },
	{ rate: 0.12, threshold: 41775 },
	{ rate: 0.22, threshold: 89075 },
	{ rate: 0.24, threshold: 170050 },
	{ rate: 0.32, threshold: 215950 },
	{ rate: 0.35, threshold: 539900 },
	{ rate: 0.37, threshold: Infinity },
];
