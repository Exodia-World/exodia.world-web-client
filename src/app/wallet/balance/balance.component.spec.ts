import { BalanceComponent } from './balance.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('Component: Balance', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BalanceComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(BalanceComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on ngOnInit', () => {
    expect(component.form).toBeDefined();
  });
});
