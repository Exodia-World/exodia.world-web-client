import { async } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { OutcomeType, Outcome } from '../../models/outcome.model';
import {
  spyOnEXOToken,
  spyOnWeb3Service,
  spyOnOutcomeService,
  spyOnTransactionService
} from '../../global.mock';

describe('WalletService', () => {
  let EXOTokenSpy: any;
  let Web3ServiceSpy: any;
  let OutcomeServiceSpy: any;
  let TransactionServiceSpy: any;
  let walletService: WalletService;

  beforeEach(() => {
    EXOTokenSpy = spyOnEXOToken();
    Web3ServiceSpy = spyOnWeb3Service(EXOTokenSpy);
    OutcomeServiceSpy = spyOnOutcomeService();
    TransactionServiceSpy = spyOnTransactionService(Web3ServiceSpy);
    walletService = new WalletService(Web3ServiceSpy, OutcomeServiceSpy,
      TransactionServiceSpy);
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
    walletService.ofDefaultAccount('getBalance', 'ether').then(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(8888);
      done();
    });
  });

  it('should get stake balance of an address', (done) => {
    walletService.getStakeBalance('0x9999', 'ether').then(outcome => {
      expect(walletService.getToken().stakeBalanceOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(9999);
      done();
    });
  });

  it('should return error if get stake balance failed', (done) => {
    walletService.getStakeBalance('0xERROR', 'ether').catch(outcome => {
      expect(walletService.getToken().stakeBalanceOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.fromWei).not.toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().message).toEqual('ERROR');
      done();
    });
  });

  it('should transfer tokens to another address', (done) => {
    walletService.transfer('0xOK', 1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should return success even if transfer tokens failed', (done) => {
    walletService.transfer('0xERROR', 1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should deposit stake', (done) => {
    walletService.depositStake(1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().depositStake).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should return success even if deposit stake failed', (done) => {
    walletService.depositStake(-1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().depositStake).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should withdraw stake', (done) => {
    walletService.withdrawStake(1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().withdrawStake).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should return success even if withdraw stake failed', (done) => {
    walletService.withdrawStake(-1, 'ether').then(outcome => {
      expect(Web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().withdrawStake).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should update stake balance', (done) => {
    walletService.updateStakeBalance().then(outcome => {
      expect(walletService.getToken().updateStakeBalance).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      done();
    });
  });

  it('should return success even if update stake balance failed', (done) => {
    EXOTokenSpy.updateStakeBalance.and.callFake(
      (txObj: any, callback: (err, result) => void) => {
        callback(null, 'ERROR');
      }
    );
    walletService.updateStakeBalance().then(outcome => {
      expect(walletService.getToken().updateStakeBalance).toHaveBeenCalled();
      expect(TransactionServiceSpy.checkStatus).toHaveBeenCalled();
      expect(Web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
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

  it('should get the latest stake time of an address', (done) => {
    walletService.getStakeStartTime('0x9999').then(outcome => {
      expect(walletService.getToken().stakeStartTimeOf.call).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(9999);
      done();
    });
  });

  it ('should return error if get stake time failed', (done) => {
    walletService.getStakeStartTime('0xERROR').catch(outcome => {
      expect(walletService.getToken().stakeStartTimeOf.call).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().message).toEqual('ERROR');
      done();
    });
  });

  it('should get the latest stake duration of an address', (done) => {
    walletService.getStakeDuration('0x9999').then(outcome => {
      expect(walletService.getToken().stakeStartTimeOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.getBlock).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(1234557891);
      done();
    });
  });

  it ('should return error if get stake duration failed', (done) => {
    walletService.getStakeDuration('0xERROR').catch(outcome => {
      expect(walletService.getToken().stakeStartTimeOf.call).toHaveBeenCalled();
      expect(Web3ServiceSpy.getBlock).not.toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Failure);
      expect(outcome.getData().message).toEqual('ERROR');
      done();
    });
  });
});
