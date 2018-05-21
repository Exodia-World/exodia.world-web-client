import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommunicatorComponent } from '../components/communicator.component';
import { WalletService } from './shared/wallet.service';
import { WalletPanelState } from './shared/wallet.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent extends CommunicatorComponent implements AfterViewInit {
  isMaximized = false;
  balance = 0.0;
  stakeBalance = 0.0;

  constructor(private walletService: WalletService) {
    super();
  }

  ngAfterViewInit() {
  }

  toggleMaximizeWallet() {
    this.isMaximized = ! this.isMaximized;
  }

  refreshAll() {
    this.updateBalance();
    this.updateStakeBalance();
  }

  updateBalance() {
    this.walletService.getBalanceOfDefaultAccount('ether')
      .then(success => {
        this.balance = success.getData().toNumber();
      })
      .catch(failure => {
        this.communicate('refresh-wallet', failure.getMessage());
      });
  }

  updateStakeBalance() {
    this.walletService.getStakeBalanceOfDefaultAccount('ether')
      .then(success => {
        this.stakeBalance = success.getData().toNumber();
      })
      .catch(failure => {
        this.communicate('refresh-wallet', failure.getMessage());
      });
  }
}
