import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

/**
 * Provides access to different types of storage.
 */
@Injectable()
export class StorageService {

  constructor(private web3Service: Web3Service) { }

  /**
   * Retrieve an item from session storage.
   *
   * @param {string} name Item's name to look for
   * @returns Item's content
   */
  getSessionItem(name: string): any {
    const key = this.prepareKey(name);
    return this.extractContent(sessionStorage.getItem(key));
  }

  /**
   * Save an item to session storage.
   *
   * @param {string} name Item's name to look for on retrieval
   * @param {any} content Item's content
   */
  setSessionItem(name: string, content: any) {
    const key = this.prepareKey(name);
    const value = this.prepareValue(content);
    sessionStorage.setItem(key, value);
  }

  private prepareKey(name: string): string {
    return btoa(name + this.web3Service.getDefaultAccount());
  }

  private prepareValue(content: any): string {
    return content ? btoa(JSON.stringify(content)) : content;
  }

  private extractContent(value: any): any {
    return value ? JSON.parse(atob(value)) : value;
  }

}
