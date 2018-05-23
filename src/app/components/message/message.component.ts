import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'message',
  template: `
    <span #comm="matTooltip" matTooltip [matTooltipPosition]="position"
      [matTooltipClass]="type + '-msg'"></span>
  `
})
export class MessageComponent {
  @ViewChild('comm') comm: any;

  @Input() name: string;
  @Input() type = 'normal';
  @Input() position = 'above';

  set(text: string) {
    this.comm.message = text;
    this.comm.show();
  }
}
