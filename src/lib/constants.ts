import { TaxRegion } from './types/tax/taxRegion';
import type { StateTaxInfo } from './types/tax/stateTaxInfo';

export const MS_PER_YEAR = 365 * 24 * 60 * 60 * 1000;
export const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

// 2024 rates from https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024
export const FEDERAL_TAX_RATES = [
	{ rate: 0.1, threshold: 11600 },
	{ rate: 0.12, threshold: 47150 },
	{ rate: 0.22, threshold: 100525 },
	{ rate: 0.24, threshold: 191950 },
	{ rate: 0.32, threshold: 243725 },
	{ rate: 0.35, threshold: 609350 },
	{ rate: 0.37, threshold: Infinity }
];
export const FEDERAL_TAX_DEDUCTION = 14600;

// 2026 rates from https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/
export const STATE_TAX_RATES: Record<TaxRegion, StateTaxInfo> = {
	[TaxRegion.AL]: {
		brackets: [
			{ rate: 0.02, threshold: 500 },
			{ rate: 0.04, threshold: 3000 },
			{ rate: 0.05, threshold: Infinity }
		],
		standardDeduction: 3000,
		personalExemption: 1500
	},
	[TaxRegion.AK]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.AZ]: {
		brackets: [{ rate: 0.025, threshold: Infinity }],
		standardDeduction: 8350,
		personalExemption: 0
	},
	[TaxRegion.AR]: {
		brackets: [
			{ rate: 0.02, threshold: 4600 },
			{ rate: 0.039, threshold: Infinity }
		],
		standardDeduction: 2470,
		personalExemption: 29
	},
	[TaxRegion.CA]: {
		brackets: [
			{ rate: 0.01, threshold: 11079 },
			{ rate: 0.02, threshold: 26264 },
			{ rate: 0.04, threshold: 41452 },
			{ rate: 0.06, threshold: 57542 },
			{ rate: 0.08, threshold: 72724 },
			{ rate: 0.093, threshold: 371479 },
			{ rate: 0.103, threshold: 445771 },
			{ rate: 0.113, threshold: 742953 },
			{ rate: 0.123, threshold: 1000000 },
			{ rate: 0.133, threshold: Infinity }
		],
		standardDeduction: 5540,
		personalExemption: 153
	},
	[TaxRegion.CO]: {
		brackets: [{ rate: 0.044, threshold: Infinity }],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.CT]: {
		brackets: [
			{ rate: 0.02, threshold: 10000 },
			{ rate: 0.045, threshold: 50000 },
			{ rate: 0.055, threshold: 100000 },
			{ rate: 0.06, threshold: 200000 },
			{ rate: 0.065, threshold: 250000 },
			{ rate: 0.069, threshold: 500000 },
			{ rate: 0.0699, threshold: Infinity }
		],
		standardDeduction: 0,
		personalExemption: 15000
	},
	[TaxRegion.DC]: {
		brackets: [
			{ rate: 0.04, threshold: 10000 },
			{ rate: 0.06, threshold: 40000 },
			{ rate: 0.065, threshold: 60000 },
			{ rate: 0.085, threshold: 250000 },
			{ rate: 0.0925, threshold: 500000 },
			{ rate: 0.0975, threshold: 1000000 },
			{ rate: 0.1075, threshold: Infinity }
		],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.DE]: {
		brackets: [
			{ rate: 0.022, threshold: 2000 },
			{ rate: 0.039, threshold: 5000 },
			{ rate: 0.048, threshold: 10000 },
			{ rate: 0.052, threshold: 20000 },
			{ rate: 0.0555, threshold: 25000 },
			{ rate: 0.066, threshold: Infinity }
		],
		standardDeduction: 3250,
		personalExemption: 110
	},
	[TaxRegion.FL]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.GA]: {
		brackets: [{ rate: 0.0519, threshold: Infinity }],
		standardDeduction: 12000,
		personalExemption: 0
	},
	[TaxRegion.HI]: {
		brackets: [
			{ rate: 0.014, threshold: 9600 },
			{ rate: 0.032, threshold: 14400 },
			{ rate: 0.055, threshold: 19200 },
			{ rate: 0.064, threshold: 24000 },
			{ rate: 0.068, threshold: 36000 },
			{ rate: 0.072, threshold: 48000 },
			{ rate: 0.076, threshold: 125000 },
			{ rate: 0.079, threshold: 175000 },
			{ rate: 0.0825, threshold: 225000 },
			{ rate: 0.09, threshold: 275000 },
			{ rate: 0.1, threshold: 325000 },
			{ rate: 0.11, threshold: Infinity }
		],
		standardDeduction: 4400,
		personalExemption: 1144
	},
	[TaxRegion.ID]: {
		brackets: [{ rate: 0.053, threshold: Infinity }],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.IL]: {
		brackets: [{ rate: 0.0495, threshold: Infinity }],
		standardDeduction: 0,
		personalExemption: 2925
	},
	[TaxRegion.IN]: {
		brackets: [{ rate: 0.0295, threshold: Infinity }],
		standardDeduction: 0,
		personalExemption: 1000
	},
	[TaxRegion.IA]: {
		brackets: [{ rate: 0.038, threshold: Infinity }],
		standardDeduction: 16100,
		personalExemption: 40
	},
	[TaxRegion.KS]: {
		brackets: [
			{ rate: 0.052, threshold: 23000 },
			{ rate: 0.0558, threshold: Infinity }
		],
		standardDeduction: 3605,
		personalExemption: 9160
	},
	[TaxRegion.KY]: {
		brackets: [{ rate: 0.035, threshold: Infinity }],
		standardDeduction: 3360,
		personalExemption: 0
	},
	[TaxRegion.LA]: {
		brackets: [{ rate: 0.03, threshold: Infinity }],
		standardDeduction: 12875,
		personalExemption: 0
	},
	[TaxRegion.ME]: {
		brackets: [
			{ rate: 0.058, threshold: 27399 },
			{ rate: 0.0675, threshold: 64849 },
			{ rate: 0.0715, threshold: Infinity }
		],
		standardDeduction: 8350,
		personalExemption: 5300
	},
	[TaxRegion.MD]: {
		brackets: [
			{ rate: 0.02, threshold: 1000 },
			{ rate: 0.03, threshold: 2000 },
			{ rate: 0.04, threshold: 3000 },
			{ rate: 0.0475, threshold: 100000 },
			{ rate: 0.05, threshold: 125000 },
			{ rate: 0.0525, threshold: 150000 },
			{ rate: 0.055, threshold: 250000 },
			{ rate: 0.0575, threshold: 500000 },
			{ rate: 0.0625, threshold: 1000000 },
			{ rate: 0.065, threshold: Infinity }
		],
		standardDeduction: 3350,
		personalExemption: 3200
	},
	[TaxRegion.MA]: {
		brackets: [
			{ rate: 0.05, threshold: 1083150 },
			{ rate: 0.09, threshold: Infinity }
		],
		standardDeduction: 0,
		personalExemption: 4400
	},
	[TaxRegion.MI]: {
		brackets: [{ rate: 0.0425, threshold: Infinity }],
		standardDeduction: 0,
		personalExemption: 5900
	},
	[TaxRegion.MN]: {
		brackets: [
			{ rate: 0.0535, threshold: 33310 },
			{ rate: 0.068, threshold: 109430 },
			{ rate: 0.0785, threshold: 203150 },
			{ rate: 0.0985, threshold: Infinity }
		],
		standardDeduction: 15300,
		personalExemption: 0
	},
	[TaxRegion.MS]: {
		brackets: [{ rate: 0.04, threshold: Infinity }],
		standardDeduction: 2300,
		personalExemption: 6000
	},
	[TaxRegion.MO]: {
		brackets: [
			{ rate: 0.02, threshold: 1348 },
			{ rate: 0.025, threshold: 2696 },
			{ rate: 0.03, threshold: 4044 },
			{ rate: 0.035, threshold: 5392 },
			{ rate: 0.04, threshold: 6740 },
			{ rate: 0.045, threshold: 8088 },
			{ rate: 0.047, threshold: Infinity }
		],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.MT]: {
		brackets: [
			{ rate: 0.047, threshold: 47500 },
			{ rate: 0.0565, threshold: Infinity }
		],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.NE]: {
		brackets: [
			{ rate: 0.0246, threshold: 4130 },
			{ rate: 0.0351, threshold: 24760 },
			{ rate: 0.0455, threshold: Infinity }
		],
		standardDeduction: 8850,
		personalExemption: 176
	},
	[TaxRegion.NV]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.NH]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.NJ]: {
		brackets: [
			{ rate: 0.014, threshold: 20000 },
			{ rate: 0.0175, threshold: 35000 },
			{ rate: 0.035, threshold: 40000 },
			{ rate: 0.0553, threshold: 75000 },
			{ rate: 0.0637, threshold: 500000 },
			{ rate: 0.0897, threshold: 1000000 },
			{ rate: 0.1075, threshold: Infinity }
		],
		standardDeduction: 0,
		personalExemption: 1000
	},
	[TaxRegion.NM]: {
		brackets: [
			{ rate: 0.015, threshold: 5500 },
			{ rate: 0.032, threshold: 16500 },
			{ rate: 0.043, threshold: 33500 },
			{ rate: 0.047, threshold: 66500 },
			{ rate: 0.049, threshold: 210000 },
			{ rate: 0.059, threshold: Infinity }
		],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.NY]: {
		brackets: [
			{ rate: 0.039, threshold: 8500 },
			{ rate: 0.044, threshold: 11700 },
			{ rate: 0.0515, threshold: 13900 },
			{ rate: 0.054, threshold: 80650 },
			{ rate: 0.059, threshold: 215400 },
			{ rate: 0.0685, threshold: 1077550 },
			{ rate: 0.0965, threshold: 5000000 },
			{ rate: 0.103, threshold: 25000000 },
			{ rate: 0.109, threshold: Infinity }
		],
		standardDeduction: 8000,
		personalExemption: 0
	},
	[TaxRegion.NC]: {
		brackets: [{ rate: 0.0399, threshold: Infinity }],
		standardDeduction: 12750,
		personalExemption: 0
	},
	[TaxRegion.ND]: {
		brackets: [
			{ rate: 0.0195, threshold: 48475 },
			{ rate: 0.025, threshold: Infinity }
		],
		standardDeduction: 16100,
		personalExemption: 0
	},
	[TaxRegion.OH]: {
		brackets: [{ rate: 0.0275, threshold: Infinity }],
		standardDeduction: 0,
		personalExemption: 2400
	},
	[TaxRegion.OK]: {
		brackets: [
			{ rate: 0.025, threshold: 3750 },
			{ rate: 0.035, threshold: 4900 },
			{ rate: 0.045, threshold: Infinity }
		],
		standardDeduction: 6350,
		personalExemption: 1000
	},
	[TaxRegion.OR]: {
		brackets: [
			{ rate: 0.0475, threshold: 4550 },
			{ rate: 0.0675, threshold: 11400 },
			{ rate: 0.0875, threshold: 125000 },
			{ rate: 0.099, threshold: Infinity }
		],
		standardDeduction: 2910,
		personalExemption: 256
	},
	[TaxRegion.PA]: {
		brackets: [{ rate: 0.0307, threshold: Infinity }],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.RI]: {
		brackets: [
			{ rate: 0.0375, threshold: 82050 },
			{ rate: 0.0475, threshold: 186450 },
			{ rate: 0.0599, threshold: Infinity }
		],
		standardDeduction: 11200,
		personalExemption: 5250
	},
	[TaxRegion.SC]: {
		brackets: [
			{ rate: 0, threshold: 3640 },
			{ rate: 0.03, threshold: 18230 },
			{ rate: 0.06, threshold: Infinity }
		],
		standardDeduction: 8350,
		personalExemption: 0
	},
	[TaxRegion.SD]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.TN]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.TX]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.UT]: {
		brackets: [{ rate: 0.045, threshold: Infinity }],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.VT]: {
		brackets: [
			{ rate: 0.0335, threshold: 49400 },
			{ rate: 0.066, threshold: 119700 },
			{ rate: 0.076, threshold: 249700 },
			{ rate: 0.0875, threshold: Infinity }
		],
		standardDeduction: 7650,
		personalExemption: 5300
	},
	[TaxRegion.VA]: {
		brackets: [
			{ rate: 0.02, threshold: 3000 },
			{ rate: 0.03, threshold: 5000 },
			{ rate: 0.05, threshold: 17000 },
			{ rate: 0.0575, threshold: Infinity }
		],
		standardDeduction: 8750,
		personalExemption: 930
	},
	[TaxRegion.WA]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	},
	[TaxRegion.WV]: {
		brackets: [
			{ rate: 0.0222, threshold: 10000 },
			{ rate: 0.0296, threshold: 25000 },
			{ rate: 0.0333, threshold: 40000 },
			{ rate: 0.0444, threshold: 60000 },
			{ rate: 0.0482, threshold: Infinity }
		],
		standardDeduction: 0,
		personalExemption: 2000
	},
	[TaxRegion.WI]: {
		brackets: [
			{ rate: 0.035, threshold: 15110 },
			{ rate: 0.044, threshold: 51950 },
			{ rate: 0.053, threshold: 332720 },
			{ rate: 0.0765, threshold: Infinity }
		],
		standardDeduction: 13960,
		personalExemption: 700
	},
	[TaxRegion.WY]: {
		brackets: [],
		standardDeduction: 0,
		personalExemption: 0
	}
};
