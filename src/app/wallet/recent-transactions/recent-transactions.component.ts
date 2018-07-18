import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'exo-recent-transactions',
  template: `
    <div class="recent-transactions">
      <div *ngFor="let tx of recentTxs" class="recent-transaction">
        <h4>{{tx.action}}</h4>
        <p>{{tx.address}}</p>
        <span>{{tx.status}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent implements OnInit, OnDestroy {

  recentTxs: Transaction[] = [];
  pollInterval: any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.pollInterval = setInterval(() => {
      this.recentTxs = this.transactionService.get();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.pollInterval);
  }

}
