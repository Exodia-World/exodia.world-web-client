import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { Outcome } from '../../models/outcome.model';
import { WalletService } from '../shared/wallet.service';

/**
 * Displays and manages exo prices.
 */
@Component({
  selector: 'exo-price',
  template: `
    <section class="price-section wallet-section--value -raised ng-star-inserted">
      <img [src]="'/assets/img/icons/dollar_icon.png'" class="price-info-item__image">
      <span class="price-info-item__value">
        <strong>{{ usdBalance | number }}</strong> USD
      </span>
    </section>

    <section class="price-section wallet-section--value -raised ng-star-inserted">
      <img [src]="'/assets/img/icons/ethereum_icon.png'" class="price-info-item__image">
      <span class="price-info-item__value">
        <strong>{{ etherBalance.toNumber() | number }} $</strong> ETH
      </span>
    </section>
  `,
  styleUrls: ['price.component.css']
})
export class PriceComponent implements OnInit {
  @Input() isMaximized = false;
  @Output() refreshOutcome = new EventEmitter<Outcome>();

  usdBalance = new BigNumber(0);
  etherBalance = new BigNumber(0);

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.refreshAll(true);
  }

  /**
   * Refresh staking information.
   */
  refreshAll(isInterval: boolean) {
    this.updateOfDefaultAccount('getEtherBalance', 'etherBalance', isInterval);
    this.updateOfDefaultAccount('getUsdBalance', 'usdBalance', isInterval);
    this.updateStakeInterest(isInterval);
  }

  /**
   * Update some staking information of the default account.
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
        if (!isInterval) {
          this.refreshOutcome.emit(failure);
        }
      });
  }

  /**
   * Update staking interest of the default account.
   *
   * @param {boolean} isInterval Is this method called from an interval?
   */
  updateStakeInterest(isInterval: boolean = false) {
    this.walletService.calculateInterest('ether')
      .then(success => {
        this.stakeInterest = success.getData();
      })
      .catch(failure => {
        if (!isInterval) {
          this.refreshOutcome.emit(failure);
        }
      });
  }
}
