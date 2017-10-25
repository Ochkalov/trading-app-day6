import { TestBed, inject } from '@angular/core/testing';

import { TradersService } from './traders.service';

describe('TradersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradersService]
    });
  });

  it('should be created', inject([TradersService], (service: TradersService) => {
    expect(service).toBeTruthy();
  }));
});

describe('TradersService Isolated Tests', () =>
{
  let tradersService: TradersService;

  beforeEach(() =>
  {
    tradersService = new TradersService();
  });

  it('TradersService created', () =>
  {
    expect(tradersService).toBeDefined();
  });

  it('Default traders array created', () =>
  {
    expect(tradersService.getTradersInstant).toBeDefined();
  });

  it('We should have 2 mock traders', () =>
  {
    let countOfMockTraders = tradersService.getTradersInstant().length;

    expect(countOfMockTraders).toEqual(2);
  });

  it('Default traders contains Oleg', () =>
  {
    expect(tradersService.getTradersInstant()[0].getName()).toEqual('Oleg');
  });

  it('Default traders contains Anna', () =>
  {
    expect(tradersService.getTradersInstant()[1].getName()).toEqual('Anna');
  });

  it('New trader should be added', () =>
  {
    let expectedName: string = 'Ivan';
    tradersService.add(expectedName);

    expect(tradersService.getTradersInstant()[2].getName()).toEqual(expectedName);
  });

  it('getTrader should not work without timeout', () =>
  {
    let expectedName = 'Oleg';

    tradersService.getTrader(expectedName)
      .then(trader =>
      {
        expect(trader.getName()).toEqual(expectedName);
      })
      .catch(err => fail(err));
  });

  it('Trader Oleg should be found and returned from Promise', function(done)
  {
    let expectedName = 'Oleg';

    tradersService.getTrader(expectedName)
      .then(trader =>
      {
        expect(trader.getName()).toEqual(expectedName);
        done();
      })
      .catch(err => fail(err));

  }, 1000);

});
