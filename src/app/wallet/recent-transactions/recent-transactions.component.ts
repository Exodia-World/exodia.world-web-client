import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicatorComponent } from '../../components/communicator.component';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionStatus } from '../../models/transaction.model';

@Component({
  selector: 'exo-recent-transactions',
  template: `
    <div class="recent-transactions">
      <div *ngFor="let tx of recentTxs" class="recent-transaction">
        <div class="recent-transaction-info">
          <div class="transaction-header">
            <h4 class="transaction-title h-display-inline h-font-size-large">{{tx.title}}</h4>
            <span class="-badge" [ngClass]="getStatusClass(tx.status)">{{tx.status}}</span>
          </div>
          <p class="transaction-hash">{{tx.hash}}</p>
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

  recentTxs: Transaction[] = [];
  pollInterval: any;

  constructor(private transactionService: TransactionService) {
    super();
  }

  ngOnInit() {
    this.pollInterval = setInterval(() => {
      this.recentTxs = this.transactionService.get();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.pollInterval);
  }

  getStatusClass(status: TransactionStatus) {
    switch status {
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

  onCopyTxHashSuccess(hash: string) {
    this.communicate('copy-hash-' + hash, 'Copied!');
  }

}
