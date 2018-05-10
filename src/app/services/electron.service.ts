import { Injectable } from '@angular/core';
import { ChromeService } from './chrome.service';

@Injectable()
export class ElectronService {
  private ipcRenderer: any;

  constructor(private chromeService: ChromeService) {
    const chrome = this.chromeService.get();
    this.ipcRenderer = chrome ? chrome.ipcRenderer : null;
  }

  isRunning(): boolean {
    return !!this.ipcRenderer;
  }

  call(methodName: string, ...args: any[]): any {
    if (! this.isRunning()) {
      throw new Error('Electron is not running. Use the desktop client instead.');
    }

    if (typeof this[methodName] === 'function') {
      return this[methodName](...args);
    } else {
      throw new TypeError(`ElectronService.${methodName} is not a function`);
    }
  }

  private send(message: string) {
    this.ipcRenderer.send(message);
  }
}
