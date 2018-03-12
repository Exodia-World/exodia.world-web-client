import { TestBed, async } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { Web3ServiceMock, MetamaskServiceMock } from '../../mocks';

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(async(() => {
    walletService = new WalletService(new Web3ServiceMock(), new MetamaskServiceMock());
  }));

  it('should create the app', async(() => {
  }));
});
