import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { Outcome } from '../../models/outcome.model';
import { WalletService } from '../shared/wallet.service';

/**
 * Displays and manages wallet staking information.
 */
@Component({
  selector: 'exo-wallet-staking',
  template: `
    <div class="staking-info" [ngClass]="{'h-margin-1': isMaximized}">
      <p class="staking-info-item">
        <label>Amount</label>
        <strong class="staking-info-item__value">
          {{stakeBalance.toNumber() | longNumber:'1.0-6'}} EXO
        </strong>
      </p>
      <p class="staking-info-item">
        <label>Interest</label>
        <strong class="staking-info-item__value">
          +{{stakeInterest.toNumber() | longNumber:'1.0-6'}} EXO
        </strong>
      </p>
      <p class="staking-info-item">
        <label>Duration</label>
        <strong class="staking-info-item__value">
          {{stakeDuration/86400 | longNumber:'1.0-6'}} Days
        </strong>
      </p>
      <p class="staking-info-item">
        <label>Total</label>
        <strong class="staking-info-item__value">
          {{stakeBalance.plus(stakeInterest).toNumber() | longNumber:'1.0-6'}} EXO
        </strong>
      </p>
      <p class="staking-info-item" *ngIf="!isMaximized">
        <label>USD</label>
        <strong class="staking-info-item__value">
          {{usdBalance == 0 ? 0 : usdBalance | number }} USD
        </strong>
      </p>
      <p class="staking-info-item" *ngIf="!isMaximized">
        <label>Ethereum</label>
        <strong class="staking-info-item__value">
          {{etherBalance == 0 ? 0 : etherBalance | number}} ETH
        </strong>
      </p>
      <button *ngIf="isMaximized" mat-raised-button color="primary"
        class="h-margin-1">Restake</button>
    </div>
    <div *ngIf="isMaximized" class="staking-form h-margin-1">
      <div class="staking-form__fields">
        <mat-form-field appearance="standard">
          <mat-label>Staking Amount</mat-label>
          <input matInput type="number" placeholder="9,999">
          <mat-hint>
            Amount to be deposit into or withdrawn from your staking balance.
          </mat-hint>
        </mat-form-field>
      </div>
      <div class="staking-actions">
        <button mat-raised-button color="primary" class="h-margin-1">Deposit</button>
        <button mat-raised-button color="primary" class="-weak h-margin-1">Withdraw</button>
      </div>
    </div>
  `,
  styleUrls: ['staking.component.css']
})
export class StakingComponent implements OnInit {
  @Input() isMaximized = false;
  @Output() refreshOutcome = new EventEmitter<Outcome>();

  stakeBalance = new BigNumber(0);
  stakeInterest = new BigNumber(0);
  etherBalance = new BigNumber(0);
  usdBalance = new BigNumber(0);
  stakeDuration = 0;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.refreshAll(true);
  }

  /**
   * Refresh staking information.
   */
  refreshAll(isInterval: boolean) {
    this.updateOfDefaultAccount('getStakeBalance', 'stakeBalance', isInterval);
    this.updateOfDefaultAccount('getStakeDuration', 'stakeDuration', isInterval);
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
