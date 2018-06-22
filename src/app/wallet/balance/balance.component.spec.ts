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
    spyOn(component, 'refreshAll');

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
    expect(form).toEqual(null);

    component.isMaximized = true;
    fixture.detectChanges();
    form = el.querySelector('form');
    expect(form).not.toEqual(null);
  });

  it('should reject sent amount that is <= 0', () => {
    component.isMaximized = true;
    component.form.get('sentAmount').setValue(0);
    fixture.detectChanges();

    const sendTokensBtn = el.querySelector('.send-tokens');
    expect(component.form.invalid).toBe(true);
    expect(sendTokensBtn.disabled).toBe(true);

    component.form.get('sentAmount').setValue(-1);
    fixture.detectChanges();
    expect(component.form.invalid).toBe(true);
    expect(sendTokensBtn.disabled).toBe(true);
  });

  it('should reject empty destination address', () => {
    component.isMaximized = true;
    component.form.get('destAddress').setValue('');
    fixture.detectChanges();

    const sendTokensBtn = el.querySelector('.send-tokens');
    expect(component.form.invalid).toBe(true);
    expect(sendTokensBtn.disabled).toBe(true);
  });
});
