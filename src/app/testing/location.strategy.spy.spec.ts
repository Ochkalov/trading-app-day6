



export class LocationStrategySpy
{
  back = jasmine.createSpy('back').and.callFake(() => {});

  getBaseHref = jasmine.createSpy('getBaseHref').and.callFake(() => "/");
  path = jasmine.createSpy('back').and.callFake(() => {});
  prepareExternalUrl = jasmine.createSpy('prepareExternalUrl').and.callFake(() => {});
  pushState = jasmine.createSpy('pushState').and.callFake(() => {});
  replaceState = jasmine.createSpy('replaceState').and.callFake(() => {});
  forward = jasmine.createSpy('forward').and.callFake(() => {});
  onPopState = jasmine.createSpy('onPopState').and.callFake(() => {});

}
