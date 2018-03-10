import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable()
export class MetamaskService {

  constructor(electronService: ElectronService) {
  }

  openPopup() {
    this.electronService.send('open-metamask-popup');
  }

  closePopup() {
    this.electronService.send('close-metamask-popup');
  }

  openNotification() {
    this.electronService.send('open-metamask-notification');
  }

  closeNotification() {
    this.electronService.send('close-metamask-notification');
  }
}
