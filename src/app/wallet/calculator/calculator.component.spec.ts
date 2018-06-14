import { CalculatorComponent } from './calculator.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as moment from 'moment';
import * as calculatorHelper from './helpers';

describe('Component: Calculator', () => {

  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CalculatorComponent]
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

  it('should calculate 10% percent interest if stake end date is before ICO end date' , () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.ICO_BEFORE_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(43);
  });

  it('should calculate 5% if stake end date is after ICO end', () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.ICO_AFTER_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(21);
  });

  it('should calculate 10% for days in between the end date and 5% for the leftover days', () => {
    component.calculatorForm.get('exoStake').setValue(400);
    component.calculatorForm.get('exoDate').setValue(calculatorHelper.ICO_BETWEEN_DATE);
    component.calculatorForm.get('stakingDays').setValue(400);
    component.onSubmit();
    expect(component.exoAmount).toBe(35);
  });
});
