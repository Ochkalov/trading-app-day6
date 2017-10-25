import {Stock} from "./Stock";
import {MarketService} from "../market/market.service";

describe('Stock Isolated Tests with MarketService spy', () =>
{
  let marketServiceSpy: MarketService;
  let priceUpdatesCount: number;

  beforeEach(() =>
  {
    marketServiceSpy =
    {
      getPrice(symbol: string): number { return 0; },
      getUpdatedPrice(currentPrice: number): number
      {
        priceUpdatesCount++;
        return 0;
      },
      getStocks(): Stock[] { return [] },
      addStock(symbol: string, company: string) { }
    };

    spyOn(marketServiceSpy, 'getPrice');
    spyOn(marketServiceSpy, 'getUpdatedPrice');

    priceUpdatesCount = 0;

  });

  it('getPrice not called when you create the Stock', () =>
  {
    new Stock("A", "aaa", marketServiceSpy);
    expect(marketServiceSpy.getPrice).toHaveBeenCalledTimes(1);
  });

  it('getPrice called with unexpected symbol when you create the Stock', () =>
  {
    let expectedSymbol = "A";

    new Stock(expectedSymbol, "aaa", marketServiceSpy);
    expect(marketServiceSpy.getPrice).toHaveBeenCalledWith(expectedSymbol);
  });

  it('getUpdatedPrice not called when you create the Stock', function(done)
  {
    setTimeout(() =>
    {
      new Stock("A", "aaa", marketServiceSpy);
      expect(priceUpdatesCount).toBeGreaterThan(2);

      done();

    }, 3000);

  }, 3500);

});
