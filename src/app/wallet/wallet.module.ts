import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MessageModule } from '../components/message/message.module';
import { BalanceModule } from './balance/balance.module';
import { AddressModule } from './address/address.module';
import { StakingModule } from './staking/staking.module';
import { WalletService } from './shared/wallet.service';
import { WalletComponent } from './wallet.component';
import { CalculatorModule } from './calculator/calculator.module';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule,
    MatSidenavModule,
    MatTabsModule,
    MatTooltipModule,
    MessageModule,
    BalanceModule,
    AddressModule,
    StakingModule,
    CalculatorModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletModule { }
