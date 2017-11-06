import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TradersComponent} from './traders.component';
import {RouterLinkStubDirective} from "../testing/router-stubs.spec";
import {TradersService} from "./traders.service";
import {DebugElement} from "@angular/core";
import {TradersServiceSpy} from "../testing/traders.service.spy.spec";

describe('TradersComponent', () =>
{
  let component: TradersComponent;
  let fixture: ComponentFixture<TradersComponent>;

  let tradersService: TradersService;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations: [TradersComponent, RouterLinkStubDirective],
      providers: [{provide: TradersService, useClass: TradersService}]
    })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(TradersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tradersService = TestBed.get(TradersService);
  });

  it('should be created', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should contain input', () =>
  {
    let de: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'name');
    expect(de).not.toBeNull();
  });

  it('should contain trader Oleg', function (done)
  {
    setTimeout(() =>
    {
      fixture.detectChanges();

      let des: DebugElement[] = fixture.debugElement.queryAll((de: DebugElement) => de.attributes['routerLinkActive'] != null);

      expect(des[0].nativeElement.innerHTML).toEqual('Oleg');
      done();

    }, 1000);

  }, 1500);

  it('new trader should be displayed', function (done)
  {
    setTimeout(() =>
    {

      let expectedTraderName = 'Inna';
      tradersService.add(expectedTraderName);

      fixture.detectChanges();

      let des: DebugElement[] = fixture.debugElement.queryAll((de: DebugElement) => de.attributes['routerLinkActive'] != null);

      expect(des[2].nativeElement.innerHTML).toEqual(expectedTraderName);
      done();

    }, 1000);

  }, 1500);

  it('new trader Inna should be displayed', function (done)
  {
    setTimeout(() =>
    {

      let expectedTraderName = 'Inna';

      let nameInput: DebugElement = fixture.debugElement.query((de: DebugElement) => de.attributes['id'] === 'name');
      nameInput.nativeElement.value = expectedTraderName;

      let addBtn: DebugElement = fixture.debugElement.query((de: DebugElement) => de.name === 'button');
      addBtn.nativeElement.click();

      fixture.detectChanges();

      let des: DebugElement[] = fixture.debugElement.queryAll((de: DebugElement) => de.attributes['routerLinkActive'] != null);

      expect(expectedTraderName).toEqual(des[2].nativeElement.innerHTML);
      done();

    }, 1000);

  }, 1500);

});
