import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { CommunicatorComponent } from '../components/communicator.component';
import { Web3Service } from '../services/web3.service';
import { WalletService } from './shared/wallet.service';

/**
 * Displays and manages wallet information.
 */
@Component({
  selector: 'app-wallet',
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

  address: string;
  balance = new BigNumber(0);
  stakeBalance = new BigNumber(0);
  stakeInterest = new BigNumber(0);
  stakeDuration = 0;

  constructor(private web3Service: Web3Service, private walletService: WalletService) {
    super();
  }

  ngAfterViewInit() {
    this.refreshAll(true);
    this.refreshInterval = setInterval(() => {
      this.refreshAll(true);
    }, 10000);
  }

  toggleMaximizeWallet() {
    this.isMaximized = ! this.isMaximized;
  }

  /**
   * Manual refresh of wallet information.
   *
   * @param {boolean} isInterval Is this method called from an interval?
   */
  refreshAll(isInterval: boolean = false) {
    this.updateAddress();
    this.updateOfDefaultAccount('getBalance', 'balance', isInterval);
    this.updateOfDefaultAccount('getStakeBalance', 'stakeBalance', isInterval);
    this.updateOfDefaultAccount('getStakeDuration', 'stakeDuration', isInterval);
    this.updateStakeInterest(isInterval);
  }

  updateAddress() {
    this.address = this.web3Service.getDefaultAccount();
    console.log('Address', this.address);
  }

  /**
   * Update wallet information of the default account.
   *
   * @param {string} methodName The name of method to call
   * @param {string} storageName The name of variable to store its result
   * @param {boolean} isInterval Is this method called from an interval?
   */
  updateOfDefaultAccount(
    methodName: string,
    storageName: string,
    isInterval: boolean = false
  ) {
    this.walletService.ofDefaultAccount(methodName, 'ether')
      .then(success => {
        this[storageName] = success.getData();
      })
      .catch(failure => {
        if (! isInterval) {
          this.communicate('refresh-wallet', failure.getMessage());
        }
      });
  }

  updateStakeInterest(isInterval: boolean = false) {
    this.walletService.calculateInterest('ether')
      .then(success => {
        this.stakeInterest = success.getData();
      })
      .catch(failure => {
        if (! isInterval) {
          this.communicate('refresh-wallet', failure.getMessage());
        }
      });
  }

  onCopyAddressSuccess() {
    this.communicate('copy-address', 'Copied!');
  }
}
