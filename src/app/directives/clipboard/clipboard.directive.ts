import { Directive } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ClipboardService } from "./clipboard.service";

// This directive acts as a simple glue layer between the given [clipboard] property
// and the underlying ClipboardService. Upon the (click) event, the [clipboard] value
// will be copied to the ClipboardService and a (clipboardCopy) event will be emitted.
@Directive({
  selector: "[clipboard]",
  inputs: ["value: clipboard"],
  outputs: [
    "copyEvent: clipboardCopy",
    "errorEvent: clipboardError"
  ],
  host: {
    "(click)": "copyToClipboard()"
  }
})
export class ClipboardDirective {
  public value: string;
  public copyEvent: EventEmitter<string>;
  public errorEvent: EventEmitter<Error>;

  constructor(private clipboardService: ClipboardService) {
    this.clipboardService = clipboardService;
    this.copyEvent = new EventEmitter();
    this.errorEvent = new EventEmitter();
    this.value = "";
  }

  public copyToClipboard() {
    this.clipboardService
      .copy(this.value)
      .then((value: string): void => {
        this.copyEvent.emit(value);
      })
      .catch((error: Error): void => {
        this.errorEvent.emit(error);
      });
  }
}
