import * as Web3 from 'web3';
import { Injectable } from '@angular/core';
import { MetamaskService } from './metamask.service';
import { Outcome, OutcomeType } from '../models/outcome.model';

declare let require: any;
declare let window: any;

const eth: any = require('../../../eth.json');

@Injectable()
export class Web3Service {
  private web3: any;

  constructor(private metamaskService: MetamaskService) {
  }

  init() {
    // Setup Web3 provider.
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(eth.TEST_RPC_PROVIDER));
    }

    // Get current account every second.
    setInterval(() => {
      this.getCurrentAccount()
        .then(result => {
          this.web3.eth.defaultAccount = result.getData();
        })
        .catch(err => {
          console.error(err.getMessage());
        });
    }, 1000);
  }

  getInstance(): any {
    return this.web3;
  }

  getContract(ABI: any, address: string): any {
    return this.web3.eth.contract(ABI).at(address);
  }

  getDefaultAccount(): string {
    return this.web3.eth.defaultAccount;
  }

  fromWei(value: any): any {
    return this.web3.fromWei(value);
  }

  private async getCurrentAccount(): Promise<Outcome> {
    return new Promise<Outcome>((resolve, reject) =>{
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          reject(new Outcome(OutcomeType.Fail, err));
        }
        resolve(new Outcome(OutcomeType.Success, accounts[0]));
      });
    });
  }
}
