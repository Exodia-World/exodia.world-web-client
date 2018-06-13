import { CalculatorComponent } from './calculator.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
});
