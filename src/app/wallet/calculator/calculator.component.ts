import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommunicatorComponent } from '../../components/communicator.component';
import { Web3Service } from '../../services/web3.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

/**
 * Displays Forms to calculate Interest
 */
@Component({
  selector: 'exo-wallet-calculator',
  template: `
    <h3>EXO Interest Calculator</h3>
    <form [formGroup]="calculatorForm">
      <div class="form-group">
        <input class="form-control" formControlName="exostake" type="number"
          placeholder="Total EXO Staked">
        <input class="form-control" formControlName="stakingDays" type="number"
          placeholder="Staking Days">
        <select class="form-control" formControlName="interest">
           <option class="capitalize" *ngFor="let interest of interestArray"
            [value]="interest">{{interest}}</option>
        </select>
      </div>
    </form>
  `,
  styleUrls: ['calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Input() isMaximized = false;

  calculatorForm: FormGroup;
  public interestArray: string[] = ['Interest']

  constructor(private fb: FormBuilder) {
    // super();
  }

  ngOnInit() {
    this.calculatorForm = this.fb.group({
      exostake: '',
      stakingDays: '',
      interest: 'Interest'
    })
  //   this.refreshAll();
  }
  //
  // refreshAll() {
  //   this.updateAddress();
  // }
  //
  // updateAddress() {
  //   this.address = this.web3Service.getDefaultAccount();
  //   console.log('Address', this.address);
  // }
  //
  // onCopyAddressSuccess() {
  //   this.communicate('copy-address', 'Copied!');
  // }
}
