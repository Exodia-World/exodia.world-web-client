import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';
import { WalletService } from '../shared/wallet.service';
import { BalanceComponent } from './balance.component';

@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    SharedModule,
    LongNumberPipeModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    BalanceComponent
  ]
})
export class BalanceModule { }
