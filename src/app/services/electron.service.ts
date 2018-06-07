import { Injectable } from '@angular/core';
import { ChromeService } from './chrome.service';

/**
 * Wraps Electron and its methods.
 */
@Injectable()
export class ElectronService {
  private ipcRenderer: any;

  constructor(private chromeService: ChromeService) {
    const chrome = this.chromeService.get();
    this.ipcRenderer = chrome ? chrome.ipcRenderer : null;
  }

  /**
   * Check if this app is launched with Electron.
   *
   * @returns True if it is, False if it isn't
   */
  isRunning(): boolean {
    return !!this.ipcRenderer;
  }

  /**
   * Call an Electron method with isRunning check.
   *
   * @param {string} methodName The method name to be called
   * @param {any[]} args Arguments for the method
   * @returns Anything the method returns
   */
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
