import { TaxRegion } from './types/tax/state';
import type { StateTaxInfo } from './types/tax/stateTaxInfo';

export const MS_PER_YEAR = 365 * 24 * 60 * 60 * 1000;
export const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

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
export const FEDERAL_TAX_DEDUCTION = 14600;

// 2024 rates from https://taxfoundation.org/data/all/state/state-income-tax-rates-2024/
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
    brackets: [
      { rate: 0.025, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.AR]: {
    brackets: [
      { rate: 0.02, threshold: 4400 },
      { rate: 0.04, threshold: 8800 },
      { rate: 0.044, threshold: Infinity }
    ],
    standardDeduction: 2340,
    personalExemption: 29
  },
  [TaxRegion.CA]: {
    brackets: [
      { rate: 0.01, threshold: 10412 },
      { rate: 0.02, threshold: 24684 },
      { rate: 0.04, threshold: 38959 },
      { rate: 0.06, threshold: 54081 },
      { rate: 0.08, threshold: 68350 },
      { rate: 0.093, threshold: 349137 },
      { rate: 0.103, threshold: 418961 },
      { rate: 0.113, threshold: 698271 },
      { rate: 0.123, threshold: 1000000 },
      { rate: 0.133, threshold: Infinity }
    ],
    standardDeduction: 5363,
    personalExemption: 144
  },
  [TaxRegion.CO]: {
    brackets: [
      { rate: 0.044, threshold: Infinity }
    ],
    standardDeduction: 14600,
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
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.DE]: {
    brackets: [
      { rate: 0.022, threshold: 5000 },
      { rate: 0.039, threshold: 10000 },
      { rate: 0.048, threshold: 20000 },
      { rate: 0.052, threshold: 25000 },
      { rate: 0.0555, threshold: 60000 },
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
    brackets: [
      { rate: 0.0549, threshold: Infinity }
    ],
    standardDeduction: 12000,
    personalExemption: 0
  },
  [TaxRegion.HI]: {
    brackets: [
      { rate: 0.014, threshold: 2400 },
      { rate: 0.032, threshold: 4800 },
      { rate: 0.055, threshold: 9600 },
      { rate: 0.064, threshold: 14400 },
      { rate: 0.068, threshold: 19200 },
      { rate: 0.072, threshold: 24000 },
      { rate: 0.076, threshold: 36000 },
      { rate: 0.079, threshold: 48000 },
      { rate: 0.0825, threshold: 150000 },
      { rate: 0.09, threshold: 175000 },
      { rate: 0.1, threshold: 200000 },
      { rate: 0.11, threshold: Infinity }
    ],
    standardDeduction: 2200,
    personalExemption: 1144
  },
  [TaxRegion.ID]: {
    brackets: [
      { rate: 0.058, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.IL]: {
    brackets: [
      { rate: 0.0495, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 2775
  },
  [TaxRegion.IN]: {
    brackets: [
      { rate: 0.0305, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 1000
  },
  [TaxRegion.IA]: {
    brackets: [
      { rate: 0.044, threshold: 6210 },
      { rate: 0.0482, threshold: 31050 },
      { rate: 0.057, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 40
  },
  [TaxRegion.KS]: {
    brackets: [
      { rate: 0.031, threshold: 15000 },
      { rate: 0.0525, threshold: 30000 },
      { rate: 0.057, threshold: Infinity }
    ],
    standardDeduction: 3500,
    personalExemption: 2250
  },
  [TaxRegion.KY]: {
    brackets: [
      { rate: 0.04, threshold: Infinity }
    ],
    standardDeduction: 3160,
    personalExemption: 0
  },
  [TaxRegion.LA]: {
    brackets: [
      { rate: 0.0185, threshold: 12500 },
      { rate: 0.035, threshold: 50000 },
      { rate: 0.0425, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 4500
  },
  [TaxRegion.ME]: {
    brackets: [
      { rate: 0.058, threshold: 26050 },
      { rate: 0.0675, threshold: 61600 },
      { rate: 0.0715, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 5000
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
      { rate: 0.0575, threshold: Infinity }
    ],
    standardDeduction: 2550,
    personalExemption: 3200
  },
  [TaxRegion.MA]: {
    brackets: [
      { rate: 0.05, threshold: 1000000 },
      { rate: 0.09, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 4400
  },
  [TaxRegion.MI]: {
    brackets: [
      { rate: 0.0425, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 5600
  },
  [TaxRegion.MN]: {
    brackets: [
      { rate: 0.0535, threshold: 31690 },
      { rate: 0.068, threshold: 104090 },
      { rate: 0.0785, threshold: 193240 },
      { rate: 0.0985, threshold: Infinity }
    ],
    standardDeduction: 14575,
    personalExemption: 5050
  },
  [TaxRegion.MS]: {
    brackets: [
      { rate: 0.047, threshold: Infinity }
    ],
    standardDeduction: 2300,
    personalExemption: 6000
  },
  [TaxRegion.MO]: {
    brackets: [
      { rate: 0.02, threshold: 2546 },
      { rate: 0.025, threshold: 3819 },
      { rate: 0.03, threshold: 5092 },
      { rate: 0.035, threshold: 6365 },
      { rate: 0.04, threshold: 7638 },
      { rate: 0.045, threshold: 8911 },
      { rate: 0.048, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.MT]: {
    brackets: [
      { rate: 0.047, threshold: 20500 },
      { rate: 0.059, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.NE]: {
    brackets: [
      { rate: 0.0246, threshold: 3700 },
      { rate: 0.0351, threshold: 22170 },
      { rate: 0.0501, threshold: 35730 },
      { rate: 0.0584, threshold: Infinity }
    ],
    standardDeduction: 7900,
    personalExemption: 157
  },
  [TaxRegion.NV]: {
    brackets: [],
    standardDeduction: 0,
    personalExemption: 0
  },
  [TaxRegion.NH]: {
    brackets: [
      { rate: 0.03, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 2400
  },
  [TaxRegion.NJ]: {
    brackets: [
      { rate: 0.014, threshold: 20000 },
      { rate: 0.0175, threshold: 35000 },
      { rate: 0.035, threshold: 40000 },
      { rate: 0.05525, threshold: 75000 },
      { rate: 0.0637, threshold: 500000 },
      { rate: 0.0897, threshold: 1000000 },
      { rate: 0.1075, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 1000
  },
  [TaxRegion.NM]: {
    brackets: [
      { rate: 0.017, threshold: 5500 },
      { rate: 0.032, threshold: 11000 },
      { rate: 0.047, threshold: 16000 },
      { rate: 0.049, threshold: 210000 },
      { rate: 0.059, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.NY]: {
    brackets: [
      { rate: 0.04, threshold: 8500 },
      { rate: 0.045, threshold: 11700 },
      { rate: 0.0525, threshold: 13900 },
      { rate: 0.055, threshold: 80650 },
      { rate: 0.06, threshold: 215400 },
      { rate: 0.0685, threshold: 1077550 },
      { rate: 0.0965, threshold: 5000000 },
      { rate: 0.103, threshold: 25000000 },
      { rate: 0.109, threshold: Infinity }
    ],
    standardDeduction: 8000,
    personalExemption: 0
  },
  [TaxRegion.NC]: {
    brackets: [
      { rate: 0.045, threshold: Infinity }
    ],
    standardDeduction: 12750,
    personalExemption: 0
  },
  [TaxRegion.ND]: {
    brackets: [
      { rate: 0.0195, threshold: 225975 },
      { rate: 0.025, threshold: Infinity }
    ],
    standardDeduction: 14600,
    personalExemption: 0
  },
  [TaxRegion.OH]: {
    brackets: [
      { rate: 0.0275, threshold: 92150 },
      { rate: 0.035, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 2400
  },
  [TaxRegion.OK]: {
    brackets: [
      { rate: 0.0025, threshold: 1000 },
      { rate: 0.0075, threshold: 2500 },
      { rate: 0.0175, threshold: 3750 },
      { rate: 0.0275, threshold: 4900 },
      { rate: 0.0375, threshold: 7200 },
      { rate: 0.0475, threshold: Infinity }
    ],
    standardDeduction: 6350,
    personalExemption: 1000
  },
  [TaxRegion.OR]: {
    brackets: [
      { rate: 0.0475, threshold: 4300 },
      { rate: 0.0675, threshold: 10750 },
      { rate: 0.0875, threshold: 125000 },
      { rate: 0.099, threshold: Infinity }
    ],
    standardDeduction: 2745,
    personalExemption: 249
  },
  [TaxRegion.PA]: {
    brackets: [
      { rate: 0.0307, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 0
  },
  [TaxRegion.RI]: {
    brackets: [
      { rate: 0.0375, threshold: 77450 },
      { rate: 0.0475, threshold: 176050 },
      { rate: 0.0599, threshold: Infinity }
    ],
    standardDeduction: 10550,
    personalExemption: 4950
  },
  [TaxRegion.SC]: {
    brackets: [
      { rate: 0, threshold: 3460 },
      { rate: 0.03, threshold: 17330 },
      { rate: 0.064, threshold: Infinity }
    ],
    standardDeduction: 14600,
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
    brackets: [
      { rate: 0.0465, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 0
  },
  [TaxRegion.VT]: {
    brackets: [
      { rate: 0.0335, threshold: 45400 },
      { rate: 0.066, threshold: 110050 },
      { rate: 0.076, threshold: 229550 },
      { rate: 0.0875, threshold: Infinity }
    ],
    standardDeduction: 7000,
    personalExemption: 4850
  },
  [TaxRegion.VA]: {
    brackets: [
      { rate: 0.02, threshold: 3000 },
      { rate: 0.03, threshold: 5000 },
      { rate: 0.05, threshold: 17000 },
      { rate: 0.0575, threshold: Infinity }
    ],
    standardDeduction: 8000,
    personalExemption: 930
  },
  [TaxRegion.WA]: {
    brackets: [],
    standardDeduction: 0,
    personalExemption: 0
  },
  [TaxRegion.WV]: {
    brackets: [
      { rate: 0.0236, threshold: 10000 },
      { rate: 0.0315, threshold: 25000 },
      { rate: 0.0354, threshold: 40000 },
      { rate: 0.0472, threshold: 60000 },
      { rate: 0.0512, threshold: Infinity }
    ],
    standardDeduction: 0,
    personalExemption: 2000
  },
  [TaxRegion.WI]: {
    brackets: [
      { rate: 0.035, threshold: 14320 },
      { rate: 0.044, threshold: 28640 },
      { rate: 0.053, threshold: 315310 },
      { rate: 0.0765, threshold: Infinity }
    ],
    standardDeduction: 13230,
    personalExemption: 700
  },
  [TaxRegion.WY]: {
    brackets: [],
    standardDeduction: 0,
    personalExemption: 0
  }
};
