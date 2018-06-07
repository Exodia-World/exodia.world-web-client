import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { CommunicatorComponent } from '../components/communicator.component';
import { Web3Service } from '../services/web3.service';
import { WalletService } from './shared/wallet.service';
import { Outcome } from '../models/outcome.model';
import { BalanceComponent } from './balance/balance.component';
import { AddressComponent } from './address/address.component';
import { StakingComponent } from './staking/staking.component';

/**
 * Displays and manages wallet information.
 */
@Component({
  selector: 'exo-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent extends CommunicatorComponent implements AfterViewInit {
  /**
   * Maximized mode displays many more features.
   */
  isMaximized = false;
  /**
   * Interval for refreshing wallet information.
   */
  refreshInterval: any;

  @ViewChild(BalanceComponent) balance: BalanceComponent;
  @ViewChild(AddressComponent) address: AddressComponent;
  @ViewChild(StakingComponent) staking: StakingComponent;

  constructor(private web3Service: Web3Service, private walletService: WalletService) {
    super();
  }

  ngAfterViewInit() {
    // Refresh wallet information every 10 seconds.
    this.refreshInterval = setInterval(() => {
      this.refreshAll(true);
    }, 5000);
  }

  toggleMaximizeWallet() {
    this.isMaximized = ! this.isMaximized;
  }

  /**
   * Refresh wallet information.
   *
   * @param {boolean} isInterval Is this method called from an interval?
   */
  refreshAll(isInterval: boolean = false) {
    this.address.refreshAll();
    this.balance.refreshAll(isInterval);
    this.staking.refreshAll(isInterval);
  }

  /**
   * Communicate the outcome from each type of refresh.
   */
  handleRefreshOutcome(outcome: Outcome) {
    this.communicate('refresh-wallet', outcome.getMessage());
  }
}
