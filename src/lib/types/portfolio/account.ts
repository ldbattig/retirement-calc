import type { Bond } from "./bond";
import type { BondTransactionResult } from "./bondTransactionResult";
import type { Portfolio } from "./portfolio";
import type { Stock } from "./stock";
import type { StockTransactionResult } from "./stockTransactionResult";

export class Account implements Portfolio {
  stocks: Stock[];
  bonds: Bond[];

  constructor() {
    this.stocks = [];
    this.bonds = [];
  }

  getAccountValue = () => this.getBondValue() + this.getStockValue();
  getBondValue = () => this.bonds.reduce((sum, bond) => sum + bond.currentValue * bond.quantity, 0);
  getStockValue = () => this.stocks.reduce((sum, stock) => sum + stock.currentValue * stock.quantity, 0)

  buyStock(totalValue: number, purchaseTimeYears: number, purchaseTimeWeeks: number) {
    const purchasePrice = 100; // Assume a fixed cost per stock
    const quantity = totalValue / purchasePrice;
    const purchaseTime = this.calculateTimeInMilliseconds(purchaseTimeYears, purchaseTimeWeeks);
    this.stocks.push({ purchasePrice, purchaseTime, currentValue: purchasePrice, quantity });
  }

  buyBond(totalValue: number) {
    const purchasePrice = 1000; // Assume a fixed cost per bond
    const quantity = totalValue / purchasePrice;
    this.bonds.push({ purchasePrice, currentValue: purchasePrice, quantity });
  }

  sellStock(amount: number, sellTimeYears: number): StockTransactionResult {
    const totalStockValue = this.stocks.reduce((sum, stock) => sum + stock.currentValue * stock.quantity, 0);
    
    if (amount > totalStockValue) {
      return { shortTermGains: 0, longTermGains: 0, insufficientAssets: true };
    }

    const sellTime = this.calculateTimeInMilliseconds(sellTimeYears, 0);
    let remainingAmount = amount;
    let shortTermGains = 0;
    let longTermGains = 0;

    while (remainingAmount > 0 && this.stocks.length > 0) {
      const stock = this.stocks[0];
      const stockValue = stock.currentValue * stock.quantity;
      const holdingPeriod = sellTime - stock.purchaseTime;

      if (stockValue <= remainingAmount) {
        const gain = (stock.currentValue - stock.purchasePrice) * stock.quantity;
        if (holdingPeriod > 365 * 24 * 60 * 60 * 1000) {
          longTermGains += gain;
        } else {
          shortTermGains += gain;
        }
        remainingAmount -= stockValue;
        this.stocks.shift();
      } else {
        const quantityToSell = remainingAmount / stock.currentValue;
        const gain = (stock.currentValue - stock.purchasePrice) * quantityToSell;
        if (holdingPeriod > 365 * 24 * 60 * 60 * 1000) {
          longTermGains += gain;
        } else {
          shortTermGains += gain;
        }
        stock.quantity -= quantityToSell;
        remainingAmount = 0;
      }
    }

    return { shortTermGains, longTermGains, insufficientAssets: false };
  }

  sellBond(amount: number): BondTransactionResult {
    const totalBondValue = this.bonds.reduce((sum, bond) => sum + bond.currentValue * bond.quantity, 0);

    if (amount > totalBondValue) {
      return { taxableAmount: 0, insufficientAssets: true };
    }

    let remainingAmount = amount;
    let taxableAmount = 0;

    while (remainingAmount > 0 && this.bonds.length > 0) {
      const bond = this.bonds[0];
      const bondValue = bond.currentValue * bond.quantity;

      if (bondValue <= remainingAmount) {
        const gain = (bond.currentValue - bond.purchasePrice) * bond.quantity;
        taxableAmount += gain;
        remainingAmount -= bondValue;
        this.bonds.shift();
      } else {
        const quantityToSell = remainingAmount / bond.currentValue;
        const gain = (bond.currentValue - bond.purchasePrice) * quantityToSell;
        taxableAmount += gain;
        bond.quantity -= quantityToSell;
        remainingAmount = 0;
      }
    }

    return { taxableAmount, insufficientAssets: false };
  }

  applyGrowth(stockGrowth: number, bondGrowth: number) {
    this.stocks.forEach(stock => {
      stock.currentValue *= (1 + stockGrowth);
    });
  
    this.bonds.forEach(bond => {
      bond.currentValue *= (1 + bondGrowth);
    });
  }

  private calculateTimeInMilliseconds(years: number, weeks: number): number {
    const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
    return years * millisecondsPerYear + weeks * millisecondsPerWeek;
  }

  clone(): Account {
    const clonedAccount = new Account();
    clonedAccount.stocks = this.stocks.map(stock => ({ ...stock }));
    clonedAccount.bonds = this.bonds.map(bond => ({ ...bond }));
    return clonedAccount;
  }
  
}
