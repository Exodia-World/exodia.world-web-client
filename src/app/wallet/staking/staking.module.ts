import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';
import { MessageModule } from '../../components/message/message.module';
import { WalletService } from '../shared/wallet.service';
import { StakingComponent } from './staking.component';

@NgModule({
  declarations: [
    StakingComponent
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    LongNumberPipeModule,
    MessageModule
  ],
  providers: [
    WalletService,
    FormBuilder
  ],
  exports: [
    StakingComponent
  ]
})
export class StakingModule { }
