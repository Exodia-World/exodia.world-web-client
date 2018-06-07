import { NgModule } from '@angular/core';
import { ClipboardService } from './clipboard.service';
import { ClipboardDirective } from './clipboard.directive';

@NgModule({
  declarations: [
    ClipboardDirective
  ],
  providers: [
    ClipboardService
  ],
  exports: [
    ClipboardDirective
  ]
})
export class ClipboardModule { }
