import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Transaction } from './shared/recent-transactions.model';

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
export class RecentTransactionsComponent implements OnInit {

  recentTxs = [];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.loadTxs();
  }

  pushTx(tx: Transaction) {
    this.recentTxs.push(tx);
    this.saveTxs();
  }

  updateTx(newTx: Transaction) {
    for (let i = 0; i < this.recentTxs.length; i++) {
      if (this.recentTxs[i].hash === newTx.hash) {
        this.recentTxs[i] = newTx;
        this.saveTxs();
        break;
      }
    }
  }

  private saveTxs() {
    this.storageService.setSessionItem('recentTxs', this.recentTxs);
  }

  private loadTxs() {
    this.recentTxs = this.storageService.getSessionItem('recentTxs');
  }
}
