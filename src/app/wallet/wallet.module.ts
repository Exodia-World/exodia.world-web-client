import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { WalletService } from './shared/wallet.service';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule,
    SidebarModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletModule { }
