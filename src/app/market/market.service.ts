import { Injectable } from '@angular/core';
import {Stock} from "../domain/Stock";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Trade} from "../domain/Trade";

@Injectable()
export class MarketServiceImpl implements MarketService {

  stocks: Stock[];

  counter: number;

  constructor(private httpClient: HttpClient)
  {
    this.stocks = [];

    this.getStockData().subscribe(
      data =>
      {
        for (let md of data)
        {
          this.stocks.push(new Stock(md.symbol, md.company, this));
        }
      },
      error =>
      {
        console.log('Cannot get market data from the server!!!');
      }
    );
  }

  private getStockData(): Observable<MarketData[]>
  {
    return this.httpClient.get<MarketData[]>('assets/market-data.json');
  }

  getStocks(): Stock[]
  {
    return this.stocks;
  }

  addStock(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company, this));
  }

  getPrice(symbol: string): number
  {
    return this.getRoundedPrice(symbol);
  }

  private getRoundedPrice(symbol: string): number
  {
    return Math.round((Math.random() * 1000 * symbol.length) * 100 + Number.EPSILON) / 100;
  }

  getUpdatedPrice(currentPrice: number): number
  {
    let multiplier = 1;
    this.counter++;

    if (this.counter % 2 == 0)
    {
      multiplier = -1;
    }

    return Math.round((currentPrice + (Math.random() * multiplier)) * 100 + Number.EPSILON) / 100;
  }

  buyStock(symbol: string, count: number): Trade
  {
    let stock: Stock = this.getStock(symbol);

    if (stock)
    {
      return new Trade(stock, count, stock.getPrice());
    }

    return null;
  }

  sellStock(trade: Trade): void
  {
    let stock: Stock = trade.getStock();
    trade.close(stock.getPrice());
  }

  private getStock(symbol: string): Stock
  {
    return this.stocks.find(stock => stock.getSymbol() == symbol);
  }

}

export interface MarketService
{
  getPrice(symbol: string): number;
  getUpdatedPrice(currentPrice: number): number;
  getStocks(): Stock[];
  addStock(symbol: string, company: string);
}

interface MarketData
{
  symbol: string,
  company: string
}
