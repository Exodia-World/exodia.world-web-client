import { BalanceComponent } from './balance.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../modules/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';
import { MessageModule } from '../../components/message/message.module';

import { Web3Service } from '../../services/web3.service';
import { WalletService } from '../shared/wallet.service';
import { spyOnWalletService, spyOnWeb3Service, spyOnEXOToken } from '../../global.mock';

describe('Component: Balance', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let WalletServiceSpy: any;
  let Web3ServiceSpy: any;

  beforeEach(() => {
    WalletServiceSpy = spyOnWalletService();
    Web3ServiceSpy = spyOnWeb3Service(spyOnEXOToken());

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        LongNumberPipeModule,
        MessageModule
      ],
      providers: [
        {provide: WalletService, useValue: WalletServiceSpy},
        {provide: Web3Service, useValue: Web3ServiceSpy}
      ],
      declarations: [BalanceComponent]
    });

    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    spyOn(component, 'refreshAll');

    component.ngOnInit();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form and refresh information on ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.refreshAll).toHaveBeenCalled();
  });

  it('should reject negative sent amount', () => {
    component.form.get('sentAmount').setValue(-1);

    const sendTokensBtn = fixture.nativeElement.querySelector('div');
    console.log(sendTokensBtn);
    expect(component.form.invalid).toBe(true);
    expect(sendTokensBtn.disabled).toBe(true);
  });
});
