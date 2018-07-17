import { NgModule } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { RecentTransactionsComponent } from './recent-transactions.component';

@NgModule({
  declarations: [
    RecentTransactionsComponent
  ],
  imports: [],
  providers: [
    StorageService
  ],
  exports: [
    RecentTransactionsComponent
  ]
})
export class RecentTransactionsModule { }
