

import {Stock} from "../domain/Stock";
import {MarketService} from "../market/market.service";
import {Trade} from "../domain/Trade";
export class MarketServiceSpy implements MarketService
{
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
  }

  private getFakeMStocks(): Stock[]
  {
    let stocks: Stock[] = [];

    stocks.push(new Stock('MMM', '3M', this));
    stocks.push(new Stock('MCD', "McDonald's", this));
    stocks.push(new Stock('MRK', 'Merck', this));
    stocks.push(new Stock('MSFT', 'Microsoft', this));

    return stocks;
  }
}
