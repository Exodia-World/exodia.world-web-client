import { TestBed, async } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { Web3ServiceMock } from '../../mocks';
import { OutcomeType, Outcome } from '../../models/outcome.model';

describe('WalletService', () => {
  let web3ServiceSpy: any;
  let walletService: WalletService;

  beforeEach(() => {
    web3ServiceSpy = jasmine.createSpyObj('Web3Service', [
      'getInstance',
      'getContract',
      'getDefaultAccount',
      'fromWei',
      'toWei',
      'getTransactionReceipt',
      'checkTransactionStatus'
    ]);
    web3ServiceSpy.getContract.and.returnValue({
      balanceOf: {
        call: jasmine.createSpy('call').and.callFake(
          (address: string, callback: (err, result) => void) => {
            if (address === '0xERROR') {
              callback({message: 'ERROR'}, null);
            } else {
              callback(null, parseInt(address.split('0x')[1]));
            }
          }
        )
      },
      transfer: jasmine.createSpy('transfer').and.callFake(
        (to: string, value: number, callback: (result) => void) => {
          if (to === '0xERROR') {
            callback('ERROR');
          } else {
            callback(to.split('0x')[1]); // return transaction hash
          }
        }
      ),
      depositStake: jasmine.createSpy('depositStake').and.callFake(
        (value: number, callback: (result) => void) => {
          if (value <= 0) {
            callback('ERROR');
          } else {
            callback('OK');
          }
        }
      ),
      withdrawStake: jasmine.createSpy('withdrawStake').and.callFake(
        (value: number, callback: (result) => void) => {
          if (value <= 0) {
            callback('ERROR');
          } else {
            callback('OK');
          }
        }
      ),
      updateStakeBalance: jasmine.createSpy('updateStakeBalance').and.callFake(
        (callback: (result) => void) => {
          callback('OK');
        }
      )
    });
    web3ServiceSpy.getDefaultAccount.and.callFake(() => '0x8888');
    web3ServiceSpy.fromWei.and.callFake((value: number) => value);
    web3ServiceSpy.toWei.and.callFake((value: number) => value);
    web3ServiceSpy.getTransactionReceipt.and.callFake(
      (hash: string, callback: (result: any) => void) => {
        const status = hash === 'OK' ? '0x1' : '0x0';
        callback({ status });
      }
    );
    web3ServiceSpy.checkTransactionStatus.and.callFake(
      (resolve, reject) => {
        return (hash: string) => {
          web3ServiceSpy.getTransactionReceipt(hash, receipt => {
            if (parseInt(receipt, 16) === 1) {
              resolve(new Outcome(OutcomeType.Success, receipt));
            } else {
              reject(new Outcome(OutcomeType.Fail, receipt));
            }
          });
        };
      }
    );

    walletService = new WalletService(web3ServiceSpy);
  });

  it('should initialize EXO token', () => {
    expect(walletService.getToken()).toBeTruthy();
  });

  it('should get balance of an address', (done) => {
    walletService.getBalance('0x9999', 'ether').then(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(9999);
      done();
    });
  });

  it('should return error if get balance failed', (done) => {
    walletService.getBalance('0xERROR', 'ether').catch(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(web3ServiceSpy.fromWei).not.toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Fail);
      expect(outcome.getData().message).toEqual('ERROR');
      done();
    });
  });

  it('should get balance of the default account', async (done) => {
    walletService.getBalanceOfDefaultAccount('ether').then(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(8888);
      done();
    });
  });

  it('should transfer tokens to another address', (done) => {
    walletService.transfer('0xOK', 1, 'ether').then(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if transfer tokens failed', (done) => {
    walletService.transfer('0xERROR', 1, 'ether').catch(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Fail);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should deposit stake', (done) => {
    walletService.depositStake(1, 'ether').then(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().depositStake).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if deposit stake failed', (done) => {
    walletService.depositStake(-1, 'ether').catch(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().depositStake).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Fail);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should withdraw stake', (done) => {
    walletService.withdrawStake(1, 'ether').then(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().withdrawStake).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });

  it('should return error if withdraw stake failed', (done) => {
    walletService.withdrawStake(-1, 'ether').catch(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().withdrawStake).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Fail);
      expect(outcome.getData().status).toEqual('0x0');
      done();
    });
  });

  it('should update stake balance', (done) => {
    walletService.updateStakeBalance().then(outcome => {
      expect(walletService.getToken().updateStakeBalance).toHaveBeenCalled();
      expect(web3ServiceSpy.checkTransactionStatus).toHaveBeenCalled();
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData().status).toEqual('0x1');
      done();
    });
  });
});
