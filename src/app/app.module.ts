import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importing Singleton services.
import { ElectronService } from './services/electron.service';
import { MetamaskService } from './services/metamask.service';
import { ContractsService } from './services/contracts.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ElectronService,
    MetamaskService,
    ContractsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
