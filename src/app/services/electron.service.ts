import { Injectable } from '@angular/core';

declare let chrome: any;

@Injectable()
export class ElectronService {
  private ipcRenderer: any = chrome.ipcRenderer;

  send(message: string): void {
    this.ipcRenderer.send(message);
  }

  static isRunning(): boolean {
    return !!chrome.ipcRenderer;
  }
}
