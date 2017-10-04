
export class Stock
{
  constructor(private symbol: string, private company: string) { }

  getSymbol(): string
  {
    return this.symbol;
  }

  getCompany(): string
  {
    return this.company;
  }

  getPrice(): number
  {
    return this.getRoundedPrice();
  }

  private getRoundedPrice(): number
  {
    return Math.round((Math.random() * 1000 * this.symbol.length) * 100 + Number.EPSILON) / 100;
  }

}
