import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { CommunicatorComponent } from '../components/communicator.component';
import { Web3Service } from '../services/web3.service';
import { WalletService } from './shared/wallet.service';
import { WalletPanelState } from './shared/wallet.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent extends CommunicatorComponent implements AfterViewInit {
  isMaximized = false;
  address: string;
  balance = new BigNumber(0);
  stakeBalance = new BigNumber(0);
  stakeInterest = new BigNumber(0);
  stakeDuration = 0;

  constructor(private web3Service: Web3Service, private walletService: WalletService) {
    super();
  }

  ngAfterViewInit() {
  }

  toggleMaximizeWallet() {
    this.isMaximized = ! this.isMaximized;
  }

  refreshAll() {
    this.updateAddress();
    this.updateBalance();
    this.updateStakeBalance();
    this.updateStakeInterest();
    this.updateStakeDuration();
  }

  updateAddress() {
    this.address = this.web3Service.getDefaultAccount();
    console.log('Address', this.address);
  }

  updateBalance() {
    this.walletService.ofDefaultAccount('getBalance', 'ether')
      .then(success => {
        this.balance = success.getData();
      })
      .catch(failure => {
        this.communicate('refresh-wallet', failure.getMessage());
      });
  }

  updateStakeBalance() {
    this.walletService.ofDefaultAccount('getStakeBalance', 'ether')
      .then(success => {
        this.stakeBalance = success.getData();
      })
      .catch(failure => {
        this.communicate('refresh-wallet', failure.getMessage());
      });
  }

  updateStakeInterest() {
    this.walletService.calculateInterest('ether')
      .then(success => {
        this.stakeInterest = success.getData();
      })
      .catch(failure => {
        this.communicate('refresh-wallet', failure.getMessage());
      });
  }

  updateStakeDuration() {
    this.walletService.ofDefaultAccount('getStakeDuration')
      .then(success => {
        this.stakeDuration = success.getData();
      })
      .catch(failure => {
        this.communicate('refresh-wallet', failure.getMessage());
      });
  }

  onCopyAddressSuccess() {
    this.communicate('copy-address', 'Copied!');
  }
}
