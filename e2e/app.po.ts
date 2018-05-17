import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppWarningText() {
    return element(by.css('app-root .app-warning__message')).getText();
  }
}
