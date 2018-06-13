import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

/**
 * Displays Forms to calculate Interest
 */
@Component({
  selector: 'exo-wallet-calculator',
  template: `
    <h3>EXO Interest Calculator</h3>
    <form [formGroup]="calculatorForm" (ngSubmit)="onSubmit()">
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
      <div class="calculate-bar">
        <button type="submit" class="">Calculate</button>
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
      exostake: 0,
      stakingDays: 0,
      interest: 'Interest'
    })
  }

  onSubmit(): void {
    console.log(this.calculatorForm)
  }
}
