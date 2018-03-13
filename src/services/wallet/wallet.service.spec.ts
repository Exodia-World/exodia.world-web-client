import { TestBed, async } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { Web3ServiceMock } from '../../mocks';
import { OutcomeType } from '../../models/outcome.model';

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
      'getTransactionReceipt'
    ]);
    web3ServiceSpy.getContract.and.returnValue({
      balanceOf: {
        call: jasmine.createSpy('call').and.callFake(
          (address: string, callback: (err, result) => void) => {
            switch (address) {
              case '0x0':
                callback(null, 9999);
                break;
              case '0x1234':
                callback(null, 8888);
                break;
              case '0xERROR':
                callback({ message: 'ERROR' }, null);
                break;
              default:
                break;
            }
          }
        )
      },
      transfer: jasmine.createSpy('transfer').and.callFake(
        (to: string, value: number, callback: (result) => void) => {
          switch (to) {
            case '0x4567':
              callback('f123'); // return transaction hash
              break;
            case '0xERROR':
              callback('a456');
              break;
            default:
              break;
          }
        }
      )
    });
    web3ServiceSpy.getDefaultAccount.and.callFake(() => '0x1234');
    web3ServiceSpy.fromWei.and.callFake((value: number) => value);
    web3ServiceSpy.toWei.and.callFake((value: number) => value);
    web3ServiceSpy.getTransactionReceipt.and.callFake(
      (hash: string, callback: (result: any) => void) => {
        const status = hash === 'f123' ? '0x1' : '0x0';
        callback({ status });
      }
    );

    walletService = new WalletService(web3ServiceSpy);
  });

  it('should initialize EXO token', () => {
    expect(walletService.getToken()).toBeTruthy();
  });

  it('should get balance of an address', (done) => {
    walletService.getBalance('0x0', 'ether').then(outcome => {
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
      expect(outcome.getMessage()).toEqual('failed to get balance');
      done();
    });
  });

  it('should get balance of the default account', (done) => {
    walletService.getBalanceOfDefaultAccount('ether').then(outcome => {
      expect(walletService.getToken().balanceOf.call).toHaveBeenCalled();
      expect(web3ServiceSpy.fromWei).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Success);
      expect(outcome.getData()).toEqual(8888);
      done();
    });
  });

  it('should transfer tokens to another address', (done) => {
    walletService.transfer('0x4567', 1, 'ether').then(outcome => {
      expect(web3ServiceSpy.toWei).toHaveBeenCalled();
      expect(walletService.getToken().transfer).toHaveBeenCalled();
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
      expect(web3ServiceSpy.getTransactionReceipt).toHaveBeenCalled();
      expect(outcome.getType()).toEqual(OutcomeType.Fail);
      expect(outcome.getData().status).toEqual('0x0');
      expect(outcome.getMessage()).toEqual('failed to transfer tokens');
      done();
    });
  });
});
