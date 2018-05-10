import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable()
export class WindowService {
  get(): any {
    return _window();
  }
}
