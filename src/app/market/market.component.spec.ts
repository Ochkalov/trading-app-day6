import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketComponent } from './market.component';
import {MarketServiceImpl} from "./market.service";
import {MarketServiceSpy} from "../testing/market.service.spy.spec";
import {DebugElement} from "@angular/core";

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketComponent ],
      providers: [ {provide: MarketServiceImpl, useClass: MarketServiceSpy} ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('stock should be added to the market', function (done)
  {
    let expectedSymbol = 'XXX';
    let expectedCompanyName = 'XXX Corp.';

    setTimeout(() =>
    {
      let inputSymbol: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'symbol');
      inputSymbol.nativeElement.value = expectedSymbol;

      let inputCompany: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'company');
      inputCompany.nativeElement.value = expectedCompanyName;

      let buyStockBtn: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'addStockBtn');
      buyStockBtn.nativeElement.click();

      let actualStock = component.stocks.find(stock => expectedSymbol === stock.getSymbol());

      expect(actualStock).not.toBeNull();

      done();

    }, 100)

  }, 200);

});
