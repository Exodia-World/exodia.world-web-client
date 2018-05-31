import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

/**
 * Wraps the global window object.
 */
@Injectable()
export class WindowService {
  get(): any {
    return _window();
  }
}
