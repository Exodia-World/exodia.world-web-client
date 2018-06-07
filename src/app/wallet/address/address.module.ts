import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

import { QRCodeModule } from 'angularx-qrcode';
import { MessageModule } from '../../components/message/message.module';
import { ClipboardModule } from '../../directives/clipboard/clipboard.module';

import { Web3Service } from '../../services/web3.service';
import { AddressComponent } from './address.component';

@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    SharedModule,
    QRCodeModule,
    MessageModule,
    ClipboardModule
  ],
  providers: [
    Web3Service
  ],
  exports: [
    AddressComponent
  ]
})
export class AddressModule { }
