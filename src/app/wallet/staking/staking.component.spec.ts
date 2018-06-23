import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { spyOnWalletService } from '../../global.mock';
import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';
import { WalletService } from '../shared/wallet.service';
import { StakingComponent } from './staking.component';

describe('StakingComponent', () => {
  let fixture: ComponentFixture<StakingComponent>;
  let component: StakingComponent;
  let el: any;
  let WalletServiceSpy: any;

  const isAcceptedByForm = (isAccepted: boolean) => {
    fixture.detectChanges();

    const depositStakeBtn = el.querySelector('#deposit-stake');
    const withdrawStakeBtn = el.querySelector('#withdraw-stake');

    expect(component.form.valid).toBe(isAccepted);
    expect(depositStakeBtn.disabled).toBe(! isAccepted);
    expect(withdrawStakeBtn.disabled).toBe(! isAccepted);
  };

  beforeEach(async(() => {
    WalletServiceSpy = spyOnWalletService();

    TestBed.configureTestingModule({
      imports: [LongNumberPipeModule],
      declarations: [StakingComponent],
      providers: [
        { provide: WalletService, useValue: WalletServiceSpy },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakingComponent);
    el = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    spyOn(component, 'communicate').and.callThrough();
    spyOn(component, 'resetForm').and.callThrough();
    spyOn(component, 'refreshAll');

    component.isMaximized = true;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form and refresh information on init', () => {
    expect(component.form).toBeDefined();
    expect(component.refreshAll).toHaveBeenCalled();
  });

  it('should show form only if it is maximized', () => {
    let form = el.querySelector('form');
    expect(form).not.toBe(null);

    component.isMaximized = false;
    fixture.detectChanges();
    form = el.querySelector('form');
    expect(form).toBe(null);
  });

  it('should restake the current staking balance', async(() => {
    component.restake();

    fixture.whenStable().then(() => {
      expect(WalletServiceSpy.updateStakeBalance).toHaveBeenCalled();
      expect(component.communicate).toHaveBeenCalled();
    });
  }));

  it('should deposit stake if all inputs are valid', () => {
    (component.resetForm as any).calls.reset();

    component.form.get('stakeAmount').setValue(1);
    component.depositStake();

    fixture.whenStable().then(() => {
      expect(WalletServiceSpy.depositStake).toHaveBeenCalledWith(1, jasmine.any(String));
      expect(component.communicate).toHaveBeenCalled();
      expect(component.resetForm).toHaveBeenCalled();
    });
  });

  it('should withdraw stake if all inputs are valid', () => {
    (component.resetForm as any).calls.reset();

    component.form.get('stakeAmount').setValue(1);
    component.withdrawStake();

    fixture.whenStable().then(() => {
      expect(WalletServiceSpy.withdrawStake).toHaveBeenCalledWith(1, jasmine.any(String));
      expect(component.communicate).toHaveBeenCalled();
      expect(component.resetForm).toHaveBeenCalled();
    });
  });

  it('should accept any staking amount that is > 0', () => {
    component.form.get('stakeAmount').setValue(1);
    isAcceptedByForm(true);
  });

  it('should reject null as staking amount', () => {
    component.form.get('stakeAmount').setValue(null);
    isAcceptedByForm(false);
  });

  it('should reject any staking amount that is <= 0', () => {
    component.form.get('stakeAmount').setValue(0);
    isAcceptedByForm(false);

    component.form.get('stakeAmount').setValue(-1);
    isAcceptedByForm(false);
  });
});
