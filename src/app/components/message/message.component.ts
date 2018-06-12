import { Component, ViewChild, Input } from '@angular/core';

/**
 * A tooltip wrapper for any communication object, e.g., buttons, label, etc.
 * It overrides the normal hover behavior of tooltips.
 */
@Component({
  selector: 'exo-message',
  template: `
    <span #comm="matTooltip" matTooltip [matTooltipPosition]="position"
      [matTooltipClass]="type + '-msg'" matTooltipHideDelay="5000">
      <ng-content></ng-content>
    </span>
  `
})
export class MessageComponent {
  /**
   * Name of message element
   */
  @Input() name: string;
  /**
   * Type of message (success, normal, warning, error)
   */
  @Input() type = 'normal';
  /**
   * Position to display text (above, below, left, right, before, after)
   */
  @Input() position = 'above';

  @ViewChild('comm') private comm: any;
  private timeout: any;

  /**
   * Set the message text.
   *
   * @param {string} text The text to be displayed
   */
  set(text: string) {
    clearTimeout(this.timeout);

    this.comm.message = text;
    this.comm.show();

    // Don't show the text after the tooltip is hidden.
    this.timeout = setTimeout(() => {
      this.comm.message = '';
    }, 5000);
  }
}
