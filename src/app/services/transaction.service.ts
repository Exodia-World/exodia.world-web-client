import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { OutcomeService } from './outcome.service';
import { Web3Service } from './web3.service';
import { Outcome } from '../models/outcome.model';
import { Transaction, TransactionStatus } from '../models/transaction.model';

/**
 * Manages transactions and their statuses.
 */
@Injectable()
export class TransactionService {

  txs: Transaction[] = [];

  constructor(
    private storageService: StorageService,
    private outcomeService: OutcomeService,
    private web3Service: Web3Service
  ) {
    this.load();
  }

  /**
   * Create an outcome based on the status of a transaction.
   * NOTE: It assumes that the transaction is newly created.
   *
   * @param {(outcome: Outcome) => void} resolve Callback if status == 0x1
   * @param {(outcome: Outcome) => void} reject Callback if status == 0x0
   * @param {string} txTitle Transaction's title to be shown to users
   * @param {string} okName Success' name; only used if status == 0x1
   * @param {string} errName Error/Failure's name; only used if status == 0x0
   * @returns Function to pass a transaction hash into
   */
  checkStatus(
    resolve: (outcome: Outcome) => void,
    reject: (outcome: Outcome) => void,
    txTitle: string,
    okName: string,
    errName: string
  ): (err: any, txHash: string) => void
  {
    return (err: any, txHash: string) => {
      if (err) {
        reject(this.outcomeService.fail('SendTransactionFailed', err));
        return;
      }
      // Record submitted transaction.
      this.push(txTitle, txHash);

      // Notify of successful transaction submission before knowing its status.
      resolve(this.outcomeService.succeed('SendTransactionSucceeded', txHash));

      this.web3Service.getTransactionReceipt(txHash, (err, receipt) => {
        if (err) {
          reject(this.outcomeService.fail('GetTransactionReceiptFailed', err));
          return;
        }
        if (parseInt(receipt.status, 16) === 1) {
          this.completeTx(txHash); // transaction is completed
          resolve(this.outcomeService.succeed(okName, receipt));
        } else {
          this.rejectTx(txHash); // transaction is rejected
          reject(this.outcomeService.fail(errName, receipt));
        }
      });
    };
  }

  get(): Transaction[] {
    return this.txs;
  }

  /**
   * Push a transaction to the list of most recent transactions.
   *
   * @param {string} title Transaction's title
   * @param {string} hash Transaction's hash on Ethereum
   * @param {TransactionStatus} status Transaction's status
   */
  push(
    title: string,
    hash: string,
    status: TransactionStatus = TransactionStatus.Waiting
  ) {
    const tx = new Transaction(title, hash, status);
    this.txs.unshift(tx);
    this.save();
  }

  /**
   * Update the status of a transaction with a given hash to Completed.
   *
   * @param {string} hash Transaction's hash
   */
  completeTx(hash: string) {
    this.updateStatus(hash, TransactionStatus.Completed);
  }

  /**
   * Update the status of a transaction with a given hash to Rejected.
   *
   * @param {string} hash Transaction's hash
   */
  rejectTx(hash: string) {
    this.updateStatus(hash, TransactionStatus.Rejected);
  }

  /**
   * Update the status of a transaction with a given hash.
   *
   * @param {string} hash Transaction's hash
   * @param {TransactionStatus} status Updated transaction's status
   */
  updateStatus(hash: string, status: TransactionStatus) {
    for (let i = 0; i < this.txs.length; i++) {
      if (this.txs[i].getHash() === hash) {
        this.txs[i].setStatus(status);
        this.save();
        break;
      }
    }
  }

  private save() {
    this.storageService.setSessionItem('txs', this.txs);
  }

  private load() {
    const savedTxs = this.storageService.getSessionItem('txs');
    if (savedTxs) {
      // Reconstruct each transaction and push it to the list.
      for (let i = 0; i < savedTxs.length; i++) {
        const tx = savedTxs[i];
        // Watch out! If we use `unshift` here, we would have reversed the list.
        this.txs.push(new Transaction(tx.title, tx.hash, tx.status));
      }
    } else {
      this.txs = [];
    }
  }

}
