import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { Outcome } from '../../models/outcome.model';
import { WalletService } from '../shared/wallet.service';

/**
 * Displays and manages wallet balance information.
 */
@Component({
  selector: 'exo-wallet-balance',
  template: `
    <div class="balance">
      <h4 class="balance__title"><mat-icon>account_balance</mat-icon></h4>
      <div class="balance__content">
        <div class="balance__value">
          {{isMaximized ? (balance.toNumber() | number:'1.0-9') :
            (balance.toNumber() | longNumber:'1.0-6')}}
        </div>
        <div class="balance__unit">EXO</div>
      </div>
    </div>
  `,
  styleUrls: ['balance.component.css']
})
export class BalanceComponent implements OnInit {
  @Input() isMaximized = false;
  @Output() refreshOutcome = new EventEmitter<Outcome>();

  balance = new BigNumber(0);

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.refreshAll(true);
  }

  /**
   * Refresh balance information.
   */
  refreshAll(isInterval: boolean) {
    this.updateOfDefaultAccount('getBalance', 'balance', isInterval);
  }

  /**
   * Update some balance information of the default account.
   *
   * @param {string} methodName The name of method to call
   * @param {string} storageName The name of variable to store its result
   * @param {boolean} isInterval Is this method called from an interval?
   */
  updateOfDefaultAccount(
    methodName: string,
    storageName: string,
    isInterval: boolean = false
  ) {
    this.walletService.ofDefaultAccount(methodName, 'ether')
      .then(success => {
        this[storageName] = success.getData();
      })
      .catch(failure => {
        if (! isInterval) {
          this.refreshOutcome.emit(failure);
        }
      });
  }
}
