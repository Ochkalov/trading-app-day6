import { Component, OnInit } from '@angular/core';
import {Trader} from "../domain/Trader";
import {TradersService} from "../traders/traders.service";
import {Trade} from "../domain/Trade";
import {MarketServiceImpl} from "../market/market.service";
import {Stock} from "../domain/Stock";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;

  countInput = new FormControl();

  symbolInput = new FormControl();

  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl)
  {
    this.trader = new Trader('');
  }

  ngOnInit()
  {
    this.tradersService.getTrader('Oleg').then(trader =>
    {
      this.trader = trader;
      // this.trader.addToPortfolio(new Trade(new Stock('A', 'aa', this.marketService), 10, 100));
      // this.trader.addToPortfolio(new Trade(new Stock('B', 'bb', this.marketService), 100, 120));
      //
      // let closed: Trade = new Trade(new Stock('C', 'cc', this.marketService), 100, 220);
      // closed.close(270);
      // this.trader.addToPortfolio(closed);
    });
    this.countInput.setValue(10);
  }

  buyStock()
  {
    let trade: Trade = this.marketService.buyStock(this.symbolInput.value, this.countInput.value);

    if (!trade)
    {
      alert(`symbol ${this.symbolInput.value} not found`);
      return;
    }

    this.trader.addToPortfolio(trade);

    this.symbolInput.setValue('');
    this.countInput.setValue(10);
  }

  closeTrade(trade: Trade)
  {
    this.marketService.sellStock(trade);
  }

}
