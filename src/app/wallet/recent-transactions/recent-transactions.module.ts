import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { TransactionService } from '../../services/transaction.service';
import { RecentTransactionsComponent } from './recent-transactions.component';

@NgModule({
  declarations: [
    RecentTransactionsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    TransactionService
  ],
  exports: [
    RecentTransactionsComponent
  ]
})
export class RecentTransactionsModule { }
