import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared.module';
import { LongNumberPipeModule } from '../pipes/long-number/long-number.module';
import { WalletService } from './shared/wallet.service';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule,
    LongNumberPipeModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletModule { }
