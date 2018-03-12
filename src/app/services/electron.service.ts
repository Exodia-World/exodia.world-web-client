import { Injectable } from '@angular/core';

declare let chrome: any;

@Injectable()
export class ElectronService {
  private ipcRenderer: any = chrome ? chrome.ipcRenderer : null;

  isRunning(): boolean {
    return !!this.ipcRenderer;
  }

  send(message: string): void {
    this.ipcRenderer.send(message);
  }
}
