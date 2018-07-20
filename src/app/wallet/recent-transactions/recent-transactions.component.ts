import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicatorComponent } from '../../components/communicator.component';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionStatus } from '../../models/transaction.model';

/**
 * Lists the most recent transactions.
 */
@Component({
  selector: 'exo-recent-transactions',
  template: `
    <div class="recent-transactions">
      <div *ngIf="isLoading" class="progress-spinner-container">
        <mat-progress-spinner color="accent" diameter="50"
          mode="indeterminate"></mat-progress-spinner>
      </div>

      <div *ngIf="!isLoading && recentTxs.length === 0" class="h-text-align-center">
        <mat-icon class="no-transactions-icon -grayed s-no-tx-icon">
          not_interested
        </mat-icon>
        <p class="-grayed h-font-size-normal">We found no transactions :(</p>
      </div>

      <div *ngFor="let tx of recentTxs" class="recent-transaction s-recent-tx">
        <div class="recent-transaction-info">
          <div class="transaction-header">
            <h4 class="transaction-title h-display-inline h-font-size-large s-tx-title">
              {{tx.title}}
            </h4>
            <span class="-badge s-tx-status" [ngClass]="getStatusClass(tx.status)">{{tx.status}}</span>
          </div>
          <p class="transaction-hash s-tx-hash">{{tx.hash}}</p>
        </div>
        <div class="recent-transaction-actions">
          <exo-message name="copy-hash-{{tx.hash}}" position="above">
            <button mat-icon-button color="primary" [clipboard]="tx.hash"
              (clipboardCopy)="onCopyTxHashSuccess(tx.hash)">
              <mat-icon>file_copy</mat-icon>
            </button>
          </exo-message>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent extends CommunicatorComponent
  implements OnInit, OnDestroy
{
  /**
   * A list of the most recent transactions.
   */
  recentTxs: Transaction[] = [];
  /**
   * Interval for retrieving the most recent transactions.
   */
  pollInterval: any;
  /**
   * Displays progress spinner if it equals to `true`.
   */
  isLoading = false;

  constructor(private transactionService: TransactionService) {
    super();
  }

  ngOnInit() {
    this.isLoading = true;

    // Poll for the most recent transactions every second.
    this.pollInterval = setInterval(() => {
      this.recentTxs = this.transactionService.get();
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.pollInterval);
  }

  /**
   * Change the color of transaction status badge dynamically.
   *
   * @param {TransactionStatus} status Current transaction's status
   * @returns CSS class name
   */
  getStatusClass(status: TransactionStatus) {
    switch (status) {
      case TransactionStatus.Waiting:
        return '-badge--normal';
      case TransactionStatus.Completed:
        return '-badge--success';
      case TransactionStatus.Rejected:
        return '-badge--error';
      default:
        return '';
    }
  }

  /**
   * Communicate that the user has successfully copied the transaction's hash.
   *
   * @param {string} hash Transaction's hash copied
   */
  onCopyTxHashSuccess(hash: string) {
    this.communicate('copy-hash-' + hash, 'Copied!');
  }

}
