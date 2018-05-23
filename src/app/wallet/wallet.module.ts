import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { QRCodeModule } from 'angularx-qrcode';
import { MessageModule } from '../components/message/message.module';
import { LongNumberPipeModule } from '../pipes/long-number/long-number.module';
import { ClipboardModule } from '../directives/clipboard/clipboard.module';
import { WalletService } from './shared/wallet.service';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule,
    MatSidenavModule,
    MatTabsModule,
    QRCodeModule,
    MessageModule,
    LongNumberPipeModule,
    ClipboardModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletModule { }
