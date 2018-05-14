import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WalletModule } from './wallet/wallet.module';
import { Web3Service } from './services/web3.service';
import { spyOnEXOToken, spyOnWeb3Service } from './global.mock';

describe('AppComponent', () => {
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
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Exodia.World'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Exodia.World');
  }));

  it('should NOT show app warning if web3 can sign transactions', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(Web3ServiceSpy.canSignTransactions).toHaveBeenCalled();
    expect(app.showAppWarning).toBe(false);
  }));

  it('should show app warning if web3 cannot sign transactions', async(() => {
    Web3ServiceSpy.canSignTransactions.and.returnValue(false);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(Web3ServiceSpy.canSignTransactions).toHaveBeenCalled();
    expect(app.showAppWarning).toBe(true);
  }));
});
