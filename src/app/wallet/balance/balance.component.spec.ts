import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BalanceComponent } from './balance.component';

import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';

import { Web3Service } from '../../services/web3.service';
import { WalletService } from '../shared/wallet.service';
import { spyOnWalletService, spyOnWeb3Service, spyOnEXOToken } from '../../global.mock';

describe('Component: Balance', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let el: any;
  let WalletServiceSpy: any;
  let Web3ServiceSpy: any;

  let isAcceptedByForm = (isAccepted: boolean) => {
    fixture.detectChanges();

    const sendTokensBtn = el.querySelector('.send-tokens');
    expect(component.form.valid).toBe(isAccepted);
    expect(sendTokensBtn.disabled).toBe(! isAccepted);
  };

  beforeEach(async(() => {
    WalletServiceSpy = spyOnWalletService();
    Web3ServiceSpy = spyOnWeb3Service(spyOnEXOToken());

    TestBed.configureTestingModule({
      imports: [
        LongNumberPipeModule
      ],
      providers: [
        {provide: WalletService, useValue: WalletServiceSpy},
        {provide: Web3Service, useValue: Web3ServiceSpy},
        FormBuilder
      ],
      declarations: [BalanceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
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

  it('should reset form and refresh information on ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.refreshAll).toHaveBeenCalled();
  });

  it('should only show form if it is maximized', () => {
    let form = el.querySelector('form');
    expect(form).not.toEqual(null);

    component.isMaximized = false;
    fixture.detectChanges();
    form = el.querySelector('form');
    expect(form).toEqual(null);
  });

  it('should submit a transfer transaction if all inputs are valid', async(() => {
    component.form.get('destAddress').setValue('0xfE9e8709d3215310075d67E3ed32A380CCf451C8');
    component.form.get('sentAmount').setValue(1);
    component.sendTokens();

    fixture.whenStable().then(() => {
      expect(component.communicate).toHaveBeenCalled();
      expect(component.resetForm).toHaveBeenCalled();
    });
  }));

  it('should accept valid Ethereum addresses and sent amount values that are > 0', () => {
    component.form.get('destAddress').setValue('0xfE9e8709d3215310075d67E3ed32A380CCf451C8');
    component.form.get('sentAmount').setValue(1);
    isAcceptedByForm(true);
  });

  it('should reject null as a sent amount value', () => {
    component.form.get('sentAmount').setValue(null);
    isAcceptedByForm(false);
  });

  it('should reject sent amount values that are <= 0', () => {
    component.form.get('sentAmount').setValue(0);
    isAcceptedByForm(false);

    component.form.get('sentAmount').setValue(-1);
    isAcceptedByForm(false);
  });

  it('should reject null as a destination address', () => {
    component.form.get('destAddress').setValue(null);
    isAcceptedByForm(false);
  });

  it('should reject empty destination addresses', () => {
    component.form.get('destAddress').setValue('');
    isAcceptedByForm(false);
  });

  it('should reject malformed destination addresses', () => {
    component.form.get('destAddress').setValue('0xabcd123999');
    isAcceptedByForm(false);
  });

  it('should reject 0x0 as destination address', () => {
    component.form.get('destAddress').setValue('0x0000000000000000000000000000000000000000');
    isAcceptedByForm(false);
  });
});
