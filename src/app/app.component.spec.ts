import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import {RouterLinkStubDirective, RouterOutletStubComponent} from "./testing/router-stubs.spec";
import {By} from "@angular/platform-browser";

describe('AppComponent', () =>
{
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let links;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
    })
      .compileComponents()
      .then(() =>
      {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
      });
  }));

  beforeEach(() =>
  {
    fixture.detectChanges();

    links = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
  });

  it('app component should be created', () =>
  {
    expect(component).toBeTruthy();
  });

  it('app component template should contain 2 links', () =>
  {
    expect(2).toEqual(links.length);
  });

});
