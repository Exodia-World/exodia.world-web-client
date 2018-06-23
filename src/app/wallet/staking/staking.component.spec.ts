import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StakingComponent } from './staking.component';
import { spyOnWalletService } from '../../global.mock';
import { LongNumberPipeModule } from '../../pipes/long-number/long-number.module';
import { WalletService } from '../shared/wallet.service';

describe('StakingComponent', () => {
  let fixture: ComponentFixture<StakingComponent>;
  let component: StakingComponent;
  let WalletServiceSpy: any;

  beforeEach(async(() => {
    WalletServiceSpy = spyOnWalletService();

    TestBed.configureTestingModule({
      imports: [LongNumberPipeModule],
      declarations: [StakingComponent],
      providers: [
        { provide: WalletService, useValue: WalletServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakingComponent);
    component = fixture.componentInstance;
    spyOn(component, 'communicate').and.callThrough();
    spyOn(component, 'resetForm').and.callThrough();
    spyOn(component, 'refreshAll');

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

  it('should restake the current staking balance', async(() => {
    component.restake();

    fixture.whenStable().then(() => {
      expect(WalletServiceSpy.updateStakeBalance).toHaveBeenCalled();
      expect(component.communicate).toHaveBeenCalled();
    });
  }));
});
