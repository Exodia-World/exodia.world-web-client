import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

/**
 * Provides access to different types of storage.
 */
@Injectable()
export class StorageService {

  constructor(private web3Service: Web3Service) { }

  getSessionItem(name: string): any {
    const key = this.prepareKey(name);
    return this.extractContent(sessionStorage.getItem(key));
  }

  setSessionItem(name: string, content: any) {
    const key = this.prepareKey(name);
    const value = this.prepareValue(content);
    sessionStorage.setItem(key, value);
  }

  private prepareKey(name: string): string {
    return btoa(name + this.web3Service.getDefaultAccount());
  }

  private prepareValue(content: any): string {
    return btoa(JSON.stringify(content));
  }

  private extractContent(value: any): any {
    return JSON.parse(atob(value));
  }

}
