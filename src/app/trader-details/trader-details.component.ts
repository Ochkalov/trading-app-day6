import {Component, OnInit, ViewChild} from '@angular/core';
import {Trader} from "../domain/Trader";
import {TradersService} from "../traders/traders.service";
import {Trade} from "../domain/Trade";
import {MarketServiceImpl} from "../market/market.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";

import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";
import {Stock} from "../domain/Stock";
import {StocksComponent} from "./stocks/stocks.component";

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;

  countInput = new FormControl();

  selectedStock: Stock;

  @ViewChild(StocksComponent)
  private stocksComponent: StocksComponent;

  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl,
              private route: ActivatedRoute, private location: Location)
  {
    this.trader = new Trader('');
  }

  ngOnInit()
  {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tradersService.getTrader(params.get('name')))
      .subscribe((trader: Trader) => this.trader = trader);

    this.countInput.setValue(10);
  }

  onStockSelect(stock: Stock)
  {
    console.log('stock selected from event');
    this.selectedStock = stock;
  }

  buyStock()
  {
    if (this.selectedStock == null)
    {
      window.alert('Please select the stock');
      return;
    }

    let trade: Trade = this.marketService.buyStock(this.selectedStock.getSymbol(), this.countInput.value);
    this.trader.addToPortfolio(trade);

    this.stocksComponent.clean();
    this.selectedStock = null;
  }

  closeTrade(trade: Trade)
  {
    this.marketService.sellStock(trade);
  }

  goBack(): void
  {
    this.location.back();
  }

}
