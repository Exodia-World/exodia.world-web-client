import { AppPage } from './app.po';

describe('Exodia.World Web Client', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app warning if there is no web3 object', () => {
    page.navigateTo();
    expect(page.getAppWarningText()).toContain('Please install an Ethereum wallet');
  });
});
