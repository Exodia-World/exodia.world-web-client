import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';
import { MessageModule } from '../../components/message/message.module';
import { WalletService } from '../shared/wallet.service';
import { BalanceComponent } from './balance.component';

@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    LongNumberPipeModule,
    MessageModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    BalanceComponent
  ]
})
export class BalanceModule { }
