import { TdkWebPage } from './app.po';

describe('tdk-web App', () => {
  let page: TdkWebPage;

  beforeEach(() => {
    page = new TdkWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
