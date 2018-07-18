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
          this.completeTx(txHash);
          resolve(this.outcomeService.succeed(okName, receipt));
        } else {
          this.rejectTx(txHash);
          reject(this.outcomeService.fail(errName, receipt));
        }
      });
    };
  }

  get(): Transaction[] {
    return this.txs;
  }

  push(
    title: string,
    hash: string,
    status: TransactionStatus = TransactionStatus.Waiting
  ) {
    const tx = new Transaction(title, hash, status);
    this.txs.push(tx);
    this.save();
  }

  completeTx(hash: string) {
    this.updateStatus(hash, TransactionStatus.Completed);
  }

  rejectTx(hash: string) {
    this.updateStatus(hash, TransactionStatus.Rejected);
  }

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
    this.txs = this.storageService.getSessionItem('txs');
  }

}
