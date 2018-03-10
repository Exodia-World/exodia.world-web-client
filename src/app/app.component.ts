import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { MetamaskService } from './services/metamask.service';
import { ContractsService } from './services/contracts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exodia.World';
  recipientAddress: string;
  etherAmount: number = 0;

  constructor(
    electronService: ElectronService,
    metamaskService: MetamaskService,
    contractsService: ContractsService
  ) {
  }

  onSendEther() {
    this.contractsService.sendEther(this.recipientAddress, this.etherAmount);
  }

  onOpenMetamaskPopup() {
    if (this.electronService.isRunning()) {
      this.metamaskService.openPopup();
    }
  }

  onCloseMetamaskPopup() {
    if (this.electronService.isRunning()) {
      this.metamaskService.closePopup();
    }
  }

  onOpenMetamaskNotification() {
    if (this.electronService.isRunning()) {
      this.metamaskService.openNotification();
    }
  }

  onCloseMetamaskNotification() {
    if (this.electronService.isRunning()) {
      this.metamaskService.closeNotification();
    }
  }
}
