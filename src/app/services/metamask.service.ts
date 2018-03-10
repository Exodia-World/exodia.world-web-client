import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable()
export class MetamaskService {

  constructor(private electronService: ElectronService) {
  }

  openPopup(): void {
    this.electronService.send('open-metamask-popup');
  }

  closePopup(): void {
    this.electronService.send('close-metamask-popup');
  }

  openNotification(): void {
    this.electronService.send('open-metamask-notification');
  }

  closeNotification(): void {
    this.electronService.send('close-metamask-notification');
  }
}
