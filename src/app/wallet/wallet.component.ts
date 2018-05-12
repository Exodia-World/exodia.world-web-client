import { Component, OnInit } from '@angular/core';
import { WalletService } from './shared/wallet.service';
import { WalletPanelState } from './shared/wallet.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  panelState = WalletPanelState.Normal;
  balance = 0;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
  }

  isMinimized() {
    return this.panelState === WalletPanelState.Minimized;
  }

  isMaximized() {
    return this.panelState === WalletPanelState.Maximized;
  }

  maximizeWallet() {
    this.panelState = WalletPanelState.Maximized;
  }

  toggleWallet() {
    this.panelState = this.panelState === WalletPanelState.Normal ?
      WalletPanelState.Minimized : WalletPanelState.Normal;
  }

  updateBalance() {
    this.walletService.getBalanceOfDefaultAccount('ether')
      .then(success => {
        this.balance = success.getData();
        console.log(this.balance);
      })
      .catch(failure => {
        console.log(failure);
      });
  }
}
