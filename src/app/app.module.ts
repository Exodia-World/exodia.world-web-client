import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SpinnerModule } from 'primeng/spinner';

// Import shared services.
import { ElectronService } from './services/electron.service';
import { MetamaskService } from './services/metamask.service';
import { ContractsService } from './services/contracts.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SpinnerModule
  ],
  providers: [
    ElectronService,
    MetamaskService,
    ContractsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
