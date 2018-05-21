import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'message',
  template: `
    <div #comm="matTooltip" matTooltip [matTooltipPosition]="position"
      [matTooltipClass]="type"></div>
  `
})
export class MessageComponent {
  @ViewChild('comm') comm: any;

  @Input() name: string;
  @Input() type = 'suggestion';
  @Input() position = 'above';

  set(text: string) {
    this.comm.message = text;
    this.comm.show();
  }
}
