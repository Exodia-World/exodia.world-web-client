import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import * as moment from 'moment';
import * as calculatorHelper from './helpers';

/**
 * Displays Forms to calculate Interest
 */
@Component({
  selector: 'exo-wallet-calculator',
  template: `
    <h3>EXO Interest Calculator</h3>
    <form [formGroup]="calculatorForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <mat-form-field appearance="standard">
          <input matInput formControlName="exoDate" [matDatepicker]="myDatepicker">
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="standard">
          <input matInput formControlName="exoStake" type="number" placeholder="Total EXO Staked">
        </mat-form-field>
        <mat-form-field appearance="standard">
          <input matInput formControlName="stakingDays" type="number" placeholder="Staking Days">
        </mat-form-field>
        <mat-form-field>
          <mat-select formControlName="interest">
            <mat-option class="capitalize" *ngFor="let interest of interestArray" [value]="interest"> {{interest}} </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div class="calculate-bar">
        <button mat-raised-button type="submit" class="">Calculate</button>
        <p><strong>{{exoAmount}} EXO</strong></p>
      </div>
    </form>
  `,
  styleUrls: ['calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Input() isMaximized = false;

  calculatorForm: FormGroup;
  public interestArray: string[] = ['Interest']
  public exoAmount: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calculatorForm = this.fb.group({
      exoDate: '',
      exoStake: null,
      stakingDays: null,
      interest: 'Interest'
    });
  }

  onSubmit(): void {
    const stakeDays = this.calculatorForm.get('stakingDays').value;
    const exoStake = this.calculatorForm.get('exoStake').value;
    const stakeDate = moment(this.calculatorForm.get('exoDate').value);
    const stakeEndDate = moment(this.calculatorForm.get('exoDate').value).add(stakeDays, 'days');
    let totalInterest = 0;

    // stake end date is before the staking date
    if (stakeEndDate.isBefore(calculatorHelper.STAKING_STARTDATE)) {
      this.exoAmount = 0;
      return;
    }

    // stake date is before staking start but stake end date is after staking start
    if (stakeDate.isBefore(calculatorHelper.STAKING_STARTDATE) && stakeEndDate.isAfter(calculatorHelper.STAKING_STARTDATE)) {
      const diff = stakeEndDate.diff(calculatorHelper.STAKING_STARTDATE, 'days') + 1;
      const eligibleStakeDays = Math.floor(diff / 7) * 7;
      this.exoAmount = Math.floor(exoStake * (0.1 / 365) * eligibleStakeDays);
      return;
    }

    // less than 3 years after ICO
    if (stakeEndDate.isBefore(calculatorHelper.FIRST_INTEREST_PERIOD_END_DATE)) {
      const eligibleStakeDays = Math.floor(stakeDays / 7) * 7;
      // Ex: interest = 50 EXO * (10%/365 days) * 28 days
      totalInterest = Math.floor(exoStake * (0.1 / 365) * eligibleStakeDays);
    }

    // 5% for the rest of the years
    if (stakeEndDate.isAfter(calculatorHelper.FIRST_INTEREST_PERIOD_END_DATE)) {
      // adds one to include the start date
      const diff = calculatorHelper.FIRST_INTEREST_PERIOD_END_DATE.diff(stakeDate, 'days') + 1;

      if (diff > 0) {
        const interestTenpercent = Math.floor(exoStake * (0.1 / 365) * diff);
        const leftOverStakeDays = Math.floor(stakeDays / 7) * 7 - diff;
        const interestLeftOver = Math.floor(exoStake * (0.05 / 365) * leftOverStakeDays);
        totalInterest = interestTenpercent + interestLeftOver;
      } else {
        const eligibleStakeDays = Math.floor(stakeDays / 7) * 7;
        totalInterest =  Math.floor(exoStake * (0.05 / 365) * eligibleStakeDays);
      }
    }

    this.exoAmount = totalInterest;
  }
}
