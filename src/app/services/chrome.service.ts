import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable()
export class ChromeService {
  private window: any;

  constructor(private windowService: WindowService) {
    this.window = windowService.get();
  }

  get(): any {
    return this.window.chrome;
  }
}
