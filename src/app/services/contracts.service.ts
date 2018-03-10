import * as Web3 from 'web3';
import { Injectable } from '@angular/core';
import { MetamaskService } from './metamask.service';

declare let require: any;
declare let window: any;

// const tokenAbi = require('./tokenContract.json');
const env: any = require('../../../env.json');

@Injectable()
export class ContractsService {
  private web3: any;

  constructor(private metamaskService: MetamaskService) {
    // Setup Web3 provider.
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(env.TEST_RPC_PROVIDER));
    }
  }

  sendEther(to: string, value: number): void {
    this.web3.eth.sendTransaction({to, value}, (err, res) => {
      if (err) this.metamaskService.closeNotification();
      if (res) this.metamaskService.closeNotification();
    });

    setTimeout(() => {
      this.metamaskService.openNotification();
    }, 500);
  }
}
