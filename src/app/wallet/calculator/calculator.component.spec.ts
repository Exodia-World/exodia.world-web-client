import { CalculatorComponent } from './calculator.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as moment from 'moment';
import * as calculatorHelper from './helpers';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CalculatorComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CalculatorComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on ngOnInit', () => {
    expect(component.calculatorForm).toBeDefined();
  });

  it('should calculate 10% percent interest if stake end date is before first interest period end date' , () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.FIRST_INTEREST_PERIOD_BETWEEN_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(43);
  });

  it('should calculate 5% if stake end date is after first interest period end date', () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.SECOND_INTEREST_PERIOD_BETWEEN_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(21);
  });

  it('should calculate 10% for days in between the first interest period end date and 5% for the leftover days', () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.FIRST_INTEREST_SECOND_INTEREST_PERIOD_BETWEEN_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(35);
  });

  it('should return 0 if end date is before staking day start', () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.BEFORE_STAKING_STARTDATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(0);
  });

  it('should return 10% for the days in the first interest period if stake date is before staking day start and stake end date is after', () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.AFTER_STAKING_STARTDATE_FIRST_INTEREST_PERIOD_BETWEEN_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(18);
  });
});
