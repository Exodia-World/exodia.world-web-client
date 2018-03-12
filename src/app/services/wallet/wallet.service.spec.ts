import { TestBed, async } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { Web3ServiceMock } from '../../mocks';

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(async(() => {
    walletService = new WalletService(new Web3ServiceMock());
  }));

  it('should initialize EXO token', async(() => {
    expect(walletService.getToken()).toBeTruthy();
  }));
});
