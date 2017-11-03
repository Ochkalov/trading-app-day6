


import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {convertToParamMap, Params} from "@angular/router";

@Injectable()
export class ActivatedRouteStub
{
  private subject = new Subject();
  paramMap = this.subject.asObservable();

  private _testParamMap: Params;

  get testParamMap()
  {
    return this._testParamMap;
  }

  set testParamMap(params: Params)
  {
    this._testParamMap = params;
    this.subject.next(convertToParamMap(this._testParamMap));
  }

  get snapshot()
  {
    return { paramMap: this.testParamMap };
  }
}
