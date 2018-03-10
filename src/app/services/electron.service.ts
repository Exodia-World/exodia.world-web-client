import { Injectable } from '@angular/core';

declare let chrome: any;

@Injectable()
export class ElectronService {
  private ipcRenderer: any = chrome.ipcRenderer;

  isRunning(): boolean {
    return !!this.ipcRenderer;
  }

  send(message: string): void {
    this.ipcRenderer.send(message);
  }
}
