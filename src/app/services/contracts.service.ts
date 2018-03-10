import * as Web3 from 'web3';
import { Injectable } from '@angular/core';
import { MetamaskService } from './metamask.service';

declare let require: any;
declare let window: any;

// let tokenAbi = require('./tokenContract.json');

@Injectable()
export class ContractsService {
  private web3: any;

  constructor(metamaskService: MetamaskService) {
    // Setup Web3 provider.
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    }
  }

  sendEther(to: string, value: number) {
    this.web3.eth.sendTransaction({to, value}, (err, res) => {
      if (err) this.metamaskService.closeNotification();
      if (res) this.metamaskService.closeNotification();
    });

    setTimeout(() => {
      this.metamaskService.openNotification();
    }, 500);
  }
}
