import {Trader} from "../domain/Trader";

export class TradersServiceSpy
{
  traders: Trader[];

  getTraders = jasmine.createSpy('getTraders').and.callFake(() => new Promise(resolve =>
    resolve(Promise.resolve(this.traders))));

  getTrader = jasmine.createSpy('getTrader').and.callFake(() => null);

  getTradersInstant = jasmine.createSpy('getTradersInstant').and.callFake(() => this.traders);

  constructor()
  {
    this.traders = this.getMockTraders();
  }

  add(name: string)
  {
    this.traders.push(new Trader(name));
  }

  private getMockTraders(): Trader[]
  {
    let traders: Trader[] = [];

    traders.push(new Trader('Oleg'));
    traders.push(new Trader('Anna'));

    return traders;
  }
}
