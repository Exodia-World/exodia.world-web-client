import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
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
