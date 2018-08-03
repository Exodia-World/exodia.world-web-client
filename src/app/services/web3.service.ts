import * as Web3 from 'web3';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { MetamaskService } from './metamask.service';
import { OutcomeService } from './outcome.service';
import { Outcome } from '../models/outcome.model';

/**
 * Wraps web3.js and its functions.
 */
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

  /**
   * Check if a web3 object is injected.
   */
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

  /**
   * Convert wei to the unit as a BigNumber.
   */
  fromWei(value: any, unit: string): any {
    return this.web3.fromWei(value, unit);
  }

  /**
   * Convert from the unit to wei as a string.
   */
  toWei(value: any, unit: string): any {
    return this.web3.toWei(value, unit);
  }

  getTransactionReceipt(hashString: string, callback?: any): any {
    if (callback) {
      this.web3.eth.getTransactionReceipt(hashString, callback);
    } else {
      return this.web3.eth.getTransactionReceipt(hashString);
    }
  }

  /**
   * Retrieve a list of all accounts available in the wallet.
   */
  getAccounts(): Promise<Outcome> {
    return new Promise<Outcome>((resolve, reject) => {
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          reject(this.outcomeService.fail('GetAccountsFailed', err));
          return;
        }
        if (accounts) {
          resolve(this.outcomeService.succeed('GetAccountsSucceeded', accounts));
        } else {
          reject(this.outcomeService.fail('NoAccountsFound'));
        }
      });
    });
  }

  getBlock(blockHashOrNumber: any, callback?: any): any {
    if (callback) {
      this.web3.eth.getBlock(blockHashOrNumber, false, callback);
    } else {
      return this.web3.eth.getBlock(blockHashOrNumber);
    }
  }

  getBalance(address, callback?: any): Promise<string> {
    if (callback) {
      this.web3.eth.getBalance(address, callback);
    } else {
      return new Promise<string>((resolve, reject) => {
        this.web3.eth.getBalance(address, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
  }

  isAddress(hexString: string): boolean {
    return this.web3.isAddress(hexString);
  }
}
