import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WalletModule } from './wallet/wallet.module';
import { Web3Service } from './services/web3.service';
import { spyOnEXOToken, spyOnWeb3Service } from './global.mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let Web3ServiceSpy: any;

  beforeEach(async(() => {
    Web3ServiceSpy = spyOnWeb3Service(spyOnEXOToken());

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        WalletModule
      ],
      providers: [
        {provide: Web3Service, useValue: Web3ServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Exodia.World'`, () => {
    expect(component.title).toEqual('Exodia.World');
  });

  it('should NOT show app warning if web3 can sign transactions', () => {
    expect(Web3ServiceSpy.canSignTransactions).toHaveBeenCalled();
    expect(component.showAppWarning).toBe(false);
  });

  it('should show app warning if web3 cannot sign transactions', () => {
    Web3ServiceSpy.canSignTransactions.and.returnValue(false);

    component = TestBed.createComponent(AppComponent).componentInstance;
    expect(Web3ServiceSpy.canSignTransactions).toHaveBeenCalled();
    expect(component.showAppWarning).toBe(true);
  });
});
