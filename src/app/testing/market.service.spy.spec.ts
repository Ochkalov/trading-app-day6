

import {Stock} from "../domain/Stock";
import {MarketService} from "../market/market.service";
import {Trade} from "../domain/Trade";
export class MarketServiceSpy implements MarketService
{
  stocks: Stock[] = [];

  getStocks = jasmine.createSpy('getStocks').and.callFake(() => this.getFakeMStocks());

  getPrice = jasmine.createSpy('getPrice').and.callFake(() => 100);

  getUpdatedPrice = jasmine.createSpy('getUpdatedPrice').and.callFake(() => 110);

  buyStock(symbol: string, count: number): Trade
  {
    let stock: Stock = new Stock(symbol, '', new MarketServiceSpy());

    return new Trade(stock, count, stock.getPrice());
  }

  addStock(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company, this));
  }

  private getFakeMStocks(): Stock[]
  {
    this.stocks.push(new Stock('MMM', '3M', this));
    this.stocks.push(new Stock('MCD', "McDonald's", this));
    this.stocks.push(new Stock('MRK', 'Merck', this));
    this.stocks.push(new Stock('MSFT', 'Microsoft', this));

    return this.stocks;
  }
}
