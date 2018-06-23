import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { Outcome } from '../../models/outcome.model';
import { WalletService } from '../shared/wallet.service';
import { CommunicatorComponent } from '../../components/communicator.component';

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
      <exo-message name="restake" position="right">
        <button *ngIf="isMaximized" mat-raised-button color="primary"
          class="h-margin-1" (click)="restake()">Restake</button>
      </exo-message>
    </div>
    <form *ngIf="isMaximized" class="staking-form h-font-size-x-large h-margin-1">
      <div class="staking-form__field">
        <mat-form-field appearance="standard">
          <mat-label>Staking Amount</mat-label>
          <input matInput type="number" name="stakeAmount" placeholder="9,999 EXO"
            min="0" [(ngModel)]="stakeAmount">
          <mat-hint>
            Amount to be deposit into or withdrawn from your staking balance.
          </mat-hint>
        </mat-form-field>
      </div>
      <div class="staking-actions">
        <exo-message name="deposit-stake" position="below">
          <button mat-raised-button color="primary" class="h-margin-1"
            [disabled]="! stakeAmount || stakeAmount <= 0"
            (click)="depositStake()">Deposit</button>
        </exo-message>
        <exo-message name="withdraw-stake" position="below">
          <button mat-raised-button color="primary" class="-weak h-margin-1"
            [disabled]="! stakeAmount || stakeAmount <= 0"
            (click)="withdrawStake()">Withdraw</button>
        </exo-message>
      </div>
    </form>
  `,
  styleUrls: ['staking.component.css']
})
export class StakingComponent extends CommunicatorComponent implements OnInit {
  @Input() isMaximized = false;
  @Output() refreshOutcome = new EventEmitter<Outcome>();

  stakeBalance = new BigNumber(0);
  stakeInterest = new BigNumber(0);
  stakeDuration = 0;
  stakeAmount: number;

  constructor(private walletService: WalletService) {
    super();
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

  restake() {
    this.walletService.updateStakeBalance()
      .then(success => {
        this.communicate('restake', success.getMessage(), 'success');
      })
      .catch(failure => {
        this.communicate('restake', failure.getMessage(), 'error');
      });
  }

  depositStake() {
    this.walletService.depositStake(this.stakeAmount, 'ether')
      .then(success => {
        this.communicate('deposit-stake', success.getMessage(), 'success');
        this.stakeAmount = null;
      })
      .catch(failure => {
        this.communicate('deposit-stake', failure.getMessage(), 'error');
      });
  }

  withdrawStake() {
    this.walletService.withdrawStake(this.stakeAmount, 'ether')
      .then(success => {
        this.communicate('withdraw-stake', success.getMessage(), 'success');
        this.stakeAmount = null;
      })
      .catch(failure => {
        this.communicate('withdraw-stake', failure.getMessage(), 'error');
      });
  }
}
