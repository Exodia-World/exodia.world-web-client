import { Component, ViewChildren, QueryList } from '@angular/core';
import { MessageComponent } from './message/message.component';

/**
 * Enable message-based communication between components and users.
 */
@Component({
  selector: 'exo-communicator'
})
export class CommunicatorComponent {
  @ViewChildren(MessageComponent) private messages: QueryList<any>;

  /**
   * Show text on a message component.
   *
   * @param {string} name The name of message element
   * @param {string} text The text to be communicated
   */
  communicate(name: string, text: string) {
    this.messages.toArray().forEach(message => {
      if (! message.name || message.name === name) {
        message.set(text);
      }
    });
  }
}
