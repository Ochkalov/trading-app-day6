import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StocksComponent} from './stocks.component';
import {MarketServiceImpl} from "../../market/market.service";
import {MarketServiceSpy} from "../../testing/market.service.spy.spec";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule, MatInputModule, MatOptionModule} from "@angular/material";
import {DebugElement} from "@angular/core";
import {Stock} from "../../domain/Stock";

describe('StocksComponent', () =>
{
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        ReactiveFormsModule
      ],
      declarations: [StocksComponent],
      providers: [MarketServiceImpl]
    })
      .overrideComponent(StocksComponent,
        {
          set: {
            providers: [{provide: MarketServiceImpl, useClass: MarketServiceSpy}]
          }
        }
      )
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should contain stockInput', () =>
  {
    let stockInput: DebugElement =
      fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'stockInput');

    expect(stockInput).not.toBeNull();
  });

  it('stock should be selected based on existing filter', () =>
  {
    let filter = 'MMM';

    component.stockInput.setValue(filter);

    expect(filter).toEqual(component.selected.getSymbol());

  });

  it('selected stock should be cleaned based on non-existing filter', () =>
  {
    let filter = 'D';

    let stock = new Stock('mock', 'mock', new MarketServiceSpy());
    component.selected = stock;

    component.stockInput.setValue(filter);

    expect(component.selected).toBeNull();
  });

  it('company label should be displayed when stock selected', () =>
  {
    let filter = 'MMM';
    let companyName = '3M';

    component.stockInput.setValue(filter);

    fixture.detectChanges();

    let companyLabel: DebugElement =
      fixture.debugElement.query((de: DebugElement) => de.name === 'label');

    // console.log(companyLabel);

    expect(companyLabel.nativeElement.innerText).toContain(companyName);
  });


  it('company label should be hidden', () =>
  {
    let filter = 'D';

    component.stockInput.setValue(filter);
    fixture.detectChanges();

    let companyLabel: DebugElement =
      fixture.debugElement.query((de: DebugElement) => de.name === 'label');

    expect(companyLabel).toBeNull();
  });

});
