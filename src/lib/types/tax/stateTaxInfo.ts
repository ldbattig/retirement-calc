import type { TaxBracket } from "./taxBracket";

export interface StateTaxInfo {
  brackets: TaxBracket[];
  standardDeduction: number;
  personalExemption: number;
}