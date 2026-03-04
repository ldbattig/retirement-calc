import { findGrossIncome } from '../src/lib/utils/calculations';
import { Account } from '../src/lib/types/portfolio/account';
import { TaxRegion } from '../src/lib/types/tax/taxRegion';

describe('findGrossIncome', () => {
  it('should find the correct gross income to achieve the desired net income', () => {
    const account = new Account();
    account.buyStock(30000, 0, 0);
    account.buyBond(10000);

    const netIncome = 30000;
    const state: TaxRegion = TaxRegion.CA;
    const stockProportion = 0.7;
    const bondProportion = 0.3;
    const taxWithdrawals = true;
    const years = 1;

    const updatedAccount = findGrossIncome(
      netIncome,
      state,
      stockProportion,
      bondProportion,
      account,
      years,
      taxWithdrawals
    );

    const finalNetIncome = updatedAccount.getAccountValue();
    expect(finalNetIncome).toBeCloseTo(netIncome, 5);
  });

  // it('should handle cases where insufficient assets are available', () => {
  //   const account = new Account();
  //   account.buyStock(1000, 0, 0);
  //   account.buyBond(500);

  //   const netIncome = 20000;
  //   const state: TaxRegion = TaxRegion.CA;
  //   const stockProportion = 0.6;
  //   const bondProportion = 0.4;
  //   const taxWithdrawals = true;
  //   const years = 1;

  //   const updatedAccount = findGrossIncome(
  //     netIncome,
  //     state,
  //     stockProportion,
  //     bondProportion,
  //     account,
  //     years,
  //     taxWithdrawals
  //   );

  //   expect(updatedAccount.getAccountValue()).toBe(0);
  // });

  // it('should correctly calculate taxes on withdrawals', () => {
  //   const account = new Account();
  //   account.buyStock(20000, 0, 0);
  //   account.buyBond(10000);

  //   const netIncome = 15000;
  //   const state: TaxRegion = TaxRegion.CA;
  //   const stockProportion = 0.6;
  //   const bondProportion = 0.4;
  //   const taxWithdrawals = true;
  //   const years = 1;

  //   const updatedAccount = findGrossIncome(
  //     netIncome,
  //     state,
  //     stockProportion,
  //     bondProportion,
  //     account,
  //     years,
  //     taxWithdrawals
  //   );

  //   // const grossIncome = 20000; // Example gross income for the test
  //   // const taxedIncome = applyTax(grossIncome, state);
  //   const finalNetIncome = updatedAccount.getAccountValue();

  //   expect(finalNetIncome).toBeCloseTo(netIncome, 5);
  // });
});
