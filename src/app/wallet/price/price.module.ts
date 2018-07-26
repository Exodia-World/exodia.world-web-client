import { NgModule } from '@angular/core';

import { Web3Service } from '../../services/web3.service';
import { PriceComponent } from './price.component';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  declarations: [
    PriceComponent
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    Web3Service
  ],
  exports: [
    PriceComponent
  ]
})
export class PriceModule { }
