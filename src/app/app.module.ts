import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { WalletModule } from './wallet/wallet.module';

import { Web3Service } from './services/web3.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WalletModule
  ],
  providers: [
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
