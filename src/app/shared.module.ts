import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import shared services.
import { WindowService } from './services/window.service';
import { ChromeService } from './services/chrome.service';
import { ElectronService } from './services/electron.service';
import { MetamaskService } from './services/metamask.service';
import { Web3Service } from './services/web3.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    WindowService,
    ChromeService,
    ElectronService,
    MetamaskService,
    Web3Service
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
