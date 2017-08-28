import { StrainScoutPage } from './app.po';

describe('strain-scout App', () => {
  let page: StrainScoutPage;

  beforeEach(() => {
    page = new StrainScoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
