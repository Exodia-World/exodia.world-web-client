import { Component, ViewChildren, QueryList } from '@angular/core';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'communicator'
})
export class CommunicatorComponent {
  @ViewChildren(MessageComponent) messages: QueryList<any>;

  communicate(name: string, text: string) {
    this.messages.toArray().forEach(message => {
      if (! message.name || message.name === name) {
        message.set(text);
      }
    });
  }
}
