import { Account } from "../src/lib/types/portfolio/account";

describe('Account Class', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account();
  });

  describe('sellStock', () => {
    it('should return insufficient assets if trying to sell more than available', () => {
      account.buyStock(100, 0, 0);
      const result = account.sellStock(200, 1);
      expect(result.insufficientAssets).toBe(true);
      expect(result.shortTermGains).toBe(0);
      expect(result.longTermGains).toBe(0);
    });

    it('should calculate short term gains correctly', () => {
      account.buyStock(100, 0, 0);
      account.applyGrowth(0.1, 0);
      const result = account.sellStock(110, 0);
      expect(result.insufficientAssets).toBe(false);
      expect(result.shortTermGains).toBeCloseTo(10, 5);
      expect(result.longTermGains).toBe(0);
    });

    it('should calculate long term gains correctly', () => {
      account.buyStock(100, 0, 0);
      account.applyGrowth(0.1, 0);
      const result = account.sellStock(110, 2); // 2 years later
      expect(result.insufficientAssets).toBe(false);
      expect(result.shortTermGains).toBe(0);
      expect(result.longTermGains).toBeCloseTo(10, 5);
    });

    it('should handle partial stock sales correctly', () => {
      account.buyStock(100, 0, 0);
      account.applyGrowth(0.1, 0);
      const result = account.sellStock(55, 0);
      expect(result.insufficientAssets).toBe(false);
      expect(result.shortTermGains).toBeCloseTo(5, 5);
      expect(result.longTermGains).toBe(0);
      expect(account.stocks[0].quantity).toBeCloseTo(0.5, 5);
    });
  });

  describe('sellBond', () => {
    it('should return insufficient assets if trying to sell more than available', () => {
      account.buyBond(100);
      const result = account.sellBond(200);
      expect(result.insufficientAssets).toBe(true);
      expect(result.taxableAmount).toBe(0);
    });

    it('should calculate taxable amount correctly', () => {
      account.buyBond(100);
      account.applyGrowth(0, 0.1);
      const result = account.sellBond(110);
      expect(result.insufficientAssets).toBe(false);
      expect(result.taxableAmount).toBeCloseTo(10, 5);
    });

    it('should handle partial bond sales correctly', () => {
      account.buyBond(100);
      account.applyGrowth(0, 0.1);
      const result = account.sellBond(55);
      expect(result.insufficientAssets).toBe(false);
      expect(result.taxableAmount).toBeCloseTo(5, 5);
      expect(account.bonds[0].quantity).toBeCloseTo(0.5, 5);
    });
  });
});
