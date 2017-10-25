import { TestBed, inject } from '@angular/core/testing';

import {MarketServiceImpl} from './market.service';
import {HttpClientModule} from "@angular/common/http";

describe('MarketServiceImpl', () =>
{
  let marketService: MarketServiceImpl;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MarketServiceImpl]
    });

    marketService = TestBed.get(MarketServiceImpl);
  });

  it('should be created', () =>
  {
    expect(marketService).toBeTruthy();
  });

  it('should contain stocks', inject([MarketServiceImpl], (service: MarketServiceImpl) =>
  {
    expect(service.getStocks()).toBeDefined();
  }));

  it('should contain 30 stocks', function(done)
  {
    setTimeout(() =>
    {
      let expectedStockCount = 30;

      let actualStockCount = marketService.getStocks().length;

      expect(actualStockCount).toEqual(expectedStockCount);
      done();

    }, 1500);

  }, 2000);

  it('should contain GE stock', function(done)
  {
    setTimeout(() =>
    {
      let expectedStockSymbol = 'GE';

      let actualResult = marketService.getStocks()
        .map(stock => stock.getSymbol())
        .find(symbol => expectedStockSymbol === symbol);

      expect(actualResult).toEqual(expectedStockSymbol);
      done();

    }, 1500);

  }, 2000);

  it('New stock should be added', () =>
  {
    let expectedStockSymbol = "A";
    let company = "Aaa";

    marketService.addStock(expectedStockSymbol, company);

    let actualResult = marketService.getStocks()
      .map(stock => stock.getSymbol())
      .find(symbol => expectedStockSymbol === symbol);

    expect(actualResult).toEqual(expectedStockSymbol);
  });

});
