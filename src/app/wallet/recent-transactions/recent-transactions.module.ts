import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MessageModule } from '../../components/message/message.module';
import { ClipboardModule } from '../../directives/clipboard/clipboard.module';
import { TransactionService } from '../../services/transaction.service';
import { RecentTransactionsComponent } from './recent-transactions.component';

@NgModule({
  declarations: [
    RecentTransactionsComponent
  ],
  imports: [
    SharedModule,
    MessageModule,
    ClipboardModule
  ],
  providers: [
    TransactionService
  ],
  exports: [
    RecentTransactionsComponent
  ]
})
export class RecentTransactionsModule { }
