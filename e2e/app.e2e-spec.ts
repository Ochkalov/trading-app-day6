import { TradingAppDay3Page } from './app.po';

describe('trading-app-day3 App', () => {
  let page: TradingAppDay3Page;

  beforeEach(() => {
    page = new TradingAppDay3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
