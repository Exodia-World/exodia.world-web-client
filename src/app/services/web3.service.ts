import * as Web3 from 'web3';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { MetamaskService } from './metamask.service';
import { OutcomeService } from './outcome.service';
import { Outcome } from '../models/outcome.model';

@Injectable()
export class Web3Service {
  private web3: any;
  private isWeb3Injected = false;

  constructor(
    private windowService: WindowService,
    private metamaskService: MetamaskService,
    private outcomeService: OutcomeService
  ) {
    const window = this.windowService.get();

    // Setup Web3 provider.
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
      this.isWeb3Injected = true;
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.httpProvider));
    }
  }

  canSignTransactions(): boolean {
    return this.isWeb3Injected;
  }

  getInstance(): any {
    return this.web3;
  }

  getContract(ABI: any, address: string): any {
    return this.web3.eth.contract(ABI).at(address);
  }

  getDefaultAccount(): string {
    return this.web3.eth.defaultAccount ?
      this.web3.eth.defaultAccount : this.web3.eth.accounts[0];
  }

  setDefaultAccount(address: string): void {
    this.web3.eth.defaultAccount = address;
  }

  fromWei(value: any, unit: string): any {
    return this.web3.fromWei(value, unit);
  }

  toWei(value: any, unit: string): any {
    return this.web3.toWei(value, unit);
  }

  getTransactionReceipt(hashString: string, callback: any): any {
    return this.web3.eth.getTransactionReceipt(hashString, callback);
  }

  getAccounts(): Promise<Outcome> {
    return new Promise<Outcome>((resolve, reject) => {
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          reject(this.outcomeService.fail('GetAccountsFailed', err));
        }
        if (accounts) {
          resolve(this.outcomeService.succeed(accounts));
        } else {
          reject(this.outcomeService.fail('NoAccountsFound'));
        }
      });
    });
  }

  checkTransactionStatus(
    resolve: (outcome: Outcome) => void,
    reject: (outcome: Outcome) => void,
    errName: string
  ): (transactionHash: string) => void
  {
    return (transactionHash: string) => {
      this.web3.eth.getTransactionReceipt(transactionHash, receipt => {
        if (parseInt(receipt.status, 16) === 1) {
          resolve(this.outcomeService.succeed(receipt));
        } else {
          reject(this.outcomeService.fail(errName, receipt));
        }
      });
    };
  }
}
