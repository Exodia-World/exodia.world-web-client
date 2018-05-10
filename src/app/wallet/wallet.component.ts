import { Component, OnInit } from '@angular/core';
import { WalletService } from './shared/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  showWallet = true;
  isFullScreen = false;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
  }

  onShowWallet() {
    this.showWallet = true;
    this.isFullScreen = false;
  }
}
