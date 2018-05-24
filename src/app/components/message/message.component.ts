import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'message',
  template: `
    <span #comm="matTooltip" matTooltip [matTooltipPosition]="position"
      [matTooltipClass]="type + '-msg'" matTooltipHideDelay="5000">
      <ng-content></ng-content>
    </span>
  `
})
export class MessageComponent {
  @ViewChild('comm') comm: any;

  @Input() name: string;
  @Input() type = 'normal';
  @Input() position = 'above';
  timeout: any;

  set(text: string) {
    clearTimeout(this.timeout);

    this.comm.message = text;
    this.comm.show();

    this.timeout = setTimeout(() => {
      this.comm.message = '';
    }, 5000);
  }
}
