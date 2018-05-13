import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { WalletService } from './shared/wallet.service';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletModule { }
