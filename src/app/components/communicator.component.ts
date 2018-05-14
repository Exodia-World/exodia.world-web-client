import { Component, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'communicator'
})
export class CommunicatorComponent {
  @ViewChildren('comm') comms: QueryList<any>;

  communicate(id: string, msg: string) {
    const comm = this.comms.toArray().filter(
      // WARN: Accessing internal properties is bad.
      comm => comm._elementRef.nativeElement.id === id
    )[0];
    comm.message = msg;
    comm.show();
  }
}
