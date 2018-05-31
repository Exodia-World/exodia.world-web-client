import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

/**
 * Interacts with Electron to control Metamask.
 */
@Injectable()
export class MetamaskService {

  constructor(private electronService: ElectronService) {
  }

  openPopup(): void {
    this.electronService.call('send', 'open-metamask-popup');
  }

  closePopup(): void {
    this.electronService.call('send', 'close-metamask-popup');
  }

  openNotification(): void {
    this.electronService.call('send', 'open-metamask-notification');
  }

  closeNotification(): void {
    this.electronService.call('send', 'close-metamask-notification');
  }
}
