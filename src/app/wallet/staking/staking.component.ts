import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
    <form *ngIf="isMaximized" class="staking-form h-font-size-x-large h-margin-1" [formGroup]="form">
      <div class="staking-form__field">
        <mat-form-field appearance="standard">
          <mat-label>Staking Amount</mat-label>
          <input matInput type="number" name="stakeAmount" placeholder="9,999 EXO"
            min="1" formControlName="stakeAmount">
          <mat-hint>
            Amount to be deposit into or withdrawn from your staking balance.
          </mat-hint>
        </mat-form-field>
      </div>
      <div class="staking-actions">
        <exo-message name="deposit-stake" position="below">
          <button mat-raised-button color="primary" id="deposit-stake"
            class="h-margin-1" [disabled]="form.invalid"
            (click)="depositStake()">Deposit</button>
        </exo-message>
        <exo-message name="withdraw-stake" position="below">
          <button mat-raised-button color="primary" id="withdraw-stake"
            class="-weak h-margin-1" [disabled]="form.invalid"
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
  form: FormGroup;

  constructor(private walletService: WalletService, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.resetForm();
    this.refreshAll(true);
  }

  resetForm() {
    this.form = this.formBuilder.group({
      stakeAmount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
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
    this.walletService.depositStake(this.form.get('stakeAmount').value, 'ether')
      .then(success => {
        this.communicate('deposit-stake', success.getMessage(), 'success');
        this.resetForm();
      })
      .catch(failure => {
        this.communicate('deposit-stake', failure.getMessage(), 'error');
      });
  }

  withdrawStake() {
    this.walletService.withdrawStake(this.form.get('stakeAmount').value, 'ether')
      .then(success => {
        this.communicate('withdraw-stake', success.getMessage(), 'success');
        this.resetForm();
      })
      .catch(failure => {
        this.communicate('withdraw-stake', failure.getMessage(), 'error');
      });
  }
}
