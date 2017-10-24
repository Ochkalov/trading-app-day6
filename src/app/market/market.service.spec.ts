import { TestBed, inject } from '@angular/core/testing';

import {MarketServiceImpl} from './market.service';

describe('MarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketServiceImpl]
    });
  });

  it('should be created', inject([MarketServiceImpl], (service: MarketServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
