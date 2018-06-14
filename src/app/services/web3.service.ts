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

  /**
   * Create an outcome based on the status of a transaction.
   *
   * @param {(outcome: Outcome) => void} resolve Callback if status == 0x1
   * @param {(outcome: Outcome) => void} reject Callback if status == 0x0
   * @param {string} okName success' name; only used if status == 0x1
   * @param {string} errName Error/Failure's name; only used if status == 0x0
   * @returns Function to pass a transaction hash into
   */
  checkTransactionStatus(
    resolve: (outcome: Outcome) => void,
    reject: (outcome: Outcome) => void,
    okName: string,
    errName: string
  ): (err: any, txHash: string) => void
  {
    return (err: any, txHash: string) => {
      if (err) {
        reject(this.outcomeService.fail('SendTransactionFailed', err));
        return;
      }
      // Notify of successful transaction submission before knowing its status.
      resolve(this.outcomeService.succeed('SendTransactionSucceeded', txHash));

      this.web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
        if (err) {
          reject(this.outcomeService.fail('GetTransactionReceiptFailed', err));
          return;
        }
        if (parseInt(receipt.status, 16) === 1) {
          resolve(this.outcomeService.succeed(okName, receipt));
        } else {
          reject(this.outcomeService.fail(errName, receipt));
        }
      });
    };
  }

  getBlock(blockHashOrNumber: any, callback?: any): any {
    if (callback) {
      this.web3.eth.getBlock(blockHashOrNumber, false, callback);
    } else {
      return this.web3.eth.getBlock(blockHashOrNumber);
    }
  }

  isAddress(hexString: string): boolean {
    return this.web3.isAddress(hexString);
  }
}
