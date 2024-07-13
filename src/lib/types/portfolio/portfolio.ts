import type { Bond } from "./bond";
import type { Stock } from "./stock";

export interface Portfolio {
  stocks: Stock[];
  bonds: Bond[];
}