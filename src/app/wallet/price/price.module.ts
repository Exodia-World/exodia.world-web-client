import { NgModule } from '@angular/core';

import { Web3Service } from '../../services/web3.service';
import { PriceComponent } from './price.component';

@NgModule({
  declarations: [
    PriceComponent
  ],
  imports: [
  ],
  providers: [
    Web3Service
  ],
  exports: [
    PriceComponent
  ]
})
export class PriceModule { }
