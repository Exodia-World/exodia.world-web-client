import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    MatTooltipModule
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageModule { }
