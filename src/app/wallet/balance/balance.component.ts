import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BigNumber } from 'bignumber.js';
import { Outcome } from '../../models/outcome.model';
import { Web3Service } from '../../services/web3.service';
import { WalletService } from '../shared/wallet.service';
import { CommunicatorComponent } from '../../components/communicator.component';

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
    <form *ngIf="isMaximized" class="send-tokens-form h-font-size-x-large" [formGroup]="form">
      <span class="send-tokens-form__field">
        <mat-form-field appearance="standard">
          <mat-label>Address</mat-label>
          <input matInput type="text" name="destAddress"
            placeholder="0x18a08a1b7e96be6..." formControlName="destAddress">
          <mat-hint>Address to send tokens to.</mat-hint>
        </mat-form-field>
      </span>
      <span class="send-tokens-form__field">
        <mat-form-field appearance="standard">
          <mat-label>Sent Amount</mat-label>
          <input matInput type="number" name="sentAmount"
            placeholder="9,999 EXO" min="0" formControlName="sentAmount">
          <mat-hint>Amount to be sent to the address.</mat-hint>
        </mat-form-field>
      </span>
      <button mat-raised-button color="primary" class="send-tokens h-margin-1"
        [disabled]="form.invalid" (click)="sendTokens()">Send</button>
      <exo-message name="send-tokens" position="right"><label></label></exo-message>
    </form>
  `,
  styleUrls: ['balance.component.css']
})
export class BalanceComponent extends CommunicatorComponent implements OnInit {
  @Input() isMaximized = false;
  @Output() refreshOutcome = new EventEmitter<Outcome>();

  balance = new BigNumber(0);
  form: FormGroup;
  isSending = false;

  constructor(
    private walletService: WalletService,
    private web3Service: Web3Service,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.resetForm();
    this.refreshAll(true);
  }

  /**
   * Recreate the transfer form and set validators.
   */
  resetForm() {
    this.form = this.formBuilder.group({
      destAddress: new FormControl('', [
        Validators.required,
        (control: AbstractControl): {[key: string]: any} | null => {
          // Only accept valid and non-zero addresses.
          if (this.web3Service.isAddress(control.value) &&
            control.value.slice(-40) !== "0000000000000000000000000000000000000000") {
            return null;
          } else {
            return {value: control.value};
          }
        }
      ]),
      sentAmount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
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

  sendTokens() {
    this.isSending = true;
    const destAddress: string = this.form.get('destAddress').value;
    const sentAmount: number = this.form.get('sentAmount').value;

    this.walletService.transfer(destAddress, sentAmount, 'ether')
      .then(success => {
        this.communicate('send-tokens', success.getMessage(), 'success');
        this.resetForm();
      })
      .catch(failure => {
        this.communicate('send-tokens', failure.getMessage(), 'error');
      })
      .then(() => {
        this.isSending = false;
      });
  }
}
