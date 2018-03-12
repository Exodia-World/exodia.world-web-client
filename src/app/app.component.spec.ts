import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SpinnerModule } from 'primeng/spinner';
import { ElectronService } from './services/electron.service';
import { MetamaskService } from './services/metamask.service';
import { Web3Service } from './services/web3.service';
import { WalletService } from './services/wallet/wallet.service';
import { ElectronServiceMock, MetamaskServiceMock, Web3ServiceMock, WalletServiceMock } from './mocks';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        InputTextModule,
        ButtonModule,
        SpinnerModule
      ],
      providers: [
        {provide: ElectronService, useValue: ElectronServiceMock},
        {provide: MetamaskService, useValue: MetamaskServiceMock},
        {provide: Web3Service, useValue: Web3ServiceMock},
        {provide: WalletService, useValue: WalletServiceMock}
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
});
