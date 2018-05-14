import { TestBed, async } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { OutcomeType, Outcome } from '../../models/outcome.model';
import { spyOnEXOToken, spyOnWeb3Service, spyOnOutcomeService } from '../../global.mock';

describe('WalletService', () => {
  let EXOTokenSpy: any;
  let Web3ServiceSpy: any;
  let OutcomeServiceSpy: any;
  let walletService: WalletService;

  beforeEach(() => {
    EXOTokenSpy = spyOnEXOToken();
    Web3ServiceSpy = spyOnWeb3Service(EXOTokenSpy);
    OutcomeServiceSpy = spyOnOutcomeService();
    walletService = new WalletService(Web3ServiceSpy, OutcomeServiceSpy);
  });

  it('should initialize EXO token', () => {
    expect(walletService.getToken()).toBeTruthy();
  });

  it('should get balance of an address', (done) => {
    walletService.getBalance('0x9999', 'ether').then(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(9999);
      done();
    });
  });

  it('should return error if get balance failed', (done) => {
    walletService.getBalance('0xERROR', 'ether').catch(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).not.toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().message).toEqual('ERROR');
      done();
    });
  });

  it('should get balance of the default account', (done) => {
    walletService.getBalanceOfDefaultAccount('ether').then(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(8888);
      done();
    });
  });

  it('should transfer tokens to another address', (done) => {
    walletService.transfer('0xOK', 1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if transfer tokens failed', (done) => {
    walletService.transfer('0xERROR', 1, 'ether').catch(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should deposit stake', (done) => {
    walletService.depositStake(1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().depositStake).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if deposit stake failed', (done) => {
    walletService.depositStake(-1, 'ether').catch(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().depositStake).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should withdraw stake', (done) => {
    walletService.withdrawStake(1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().withdrawStake).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if withdraw stake failed', (done) => {
    walletService.withdrawStake(-1, 'ether').catch(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().withdrawStake).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should update stake balance', (done) => {
    walletService.updateStakeBalance().then(outcome => {
      expect(walletService.getToken().updateStakeBalance).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if update stake balance failed', (done) => {
    EXOTokenSpy.updateStakeBalance.and.callFake(
      (callback: (result) => void) => {
        callback('ERROR');
      }
    );
    walletService.updateStakeBalance().catch(outcome => {
      expect(walletService.getToken().updateStakeBalance).toHaveBeenCalled();
      expect(Web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should calculate interest', (done) => {
    walletService.calculateInterest('ether').then(outcome => {
      expect(walletService.getToken().calculateInterest.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(5);
      done();
    });
  });

  it('should return error if calculate interest failed', (done) => {
    EXOTokenSpy.calculateInterest.call.and.callFake(
      (callback: (err, result) => void) => {
        callback({message: 'ERROR'}, null);
      }
    );
    walletService.calculateInterest('ether').catch(outcome => {
      expect(walletService.getToken().calculateInterest.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).not.toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      done();
    });
  });
});
