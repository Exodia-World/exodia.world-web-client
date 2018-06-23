import { BigNumber } from 'bignumber.js';
import { Outcome, OutcomeType } from './models/outcome.model';

export function spyOnEXOToken(): any {
  const EXOTokenSpy = {
    balanceOf: {
      call: jasmine.createSpy('call').and.callFake(
        (address: string, callback: (err, result) => void) => {
          if (address === '0xERROR') {
            callback({ message: 'ERROR' }, null);
          } else {
            callback(null, parseInt(address.split('0x')[1]));
          }
        }
      )
    },
    stakeBalanceOf: {
      call: jasmine.createSpy('call').and.callFake(
        (address: string, callback: (err, result) => void) => {
          if (address === '0xERROR') {
            callback({ message: 'ERROR' }, null);
          } else {
            callback(null, parseInt(address.split('0x')[1]));
          }
        }
      )
    },
    transfer: jasmine.createSpy('transfer').and.callFake(
      (to: string, value: number, txObj: any, callback: (err, result) => void) => {
        if (to === '0xERROR') {
          callback(null, 'ERROR');
        } else {
          callback(null, to.split('0x')[1]); // return transaction hash
        }
      }
    ),
    depositStake: jasmine.createSpy('depositStake').and.callFake(
      (value: number, txObj: any, callback: (err, result) => void) => {
        if (value <= 0) {
          callback(null, 'ERROR');
        } else {
          callback(null, 'OK');
        }
      }
    ),
    withdrawStake: jasmine.createSpy('withdrawStake').and.callFake(
      (value: number, txObj: any, callback: (err, result) => void) => {
        if (value <= 0) {
          callback(null, 'ERROR');
        } else {
          callback(null, 'OK');
        }
      }
    ),
    updateStakeBalance: jasmine.createSpy('updateStakeBalance').and.callFake(
      (txObj: any, callback: (err, result) => void) => {
        callback(null, 'OK');
      }
    ),
    calculateInterest: {
      call: jasmine.createSpy('calculateInterest').and.callFake(
        (callback: (err, result) => void) => {
          callback(null, 5);
        }
      )
    },
    stakeStartTimeOf: {
      call: jasmine.createSpy('call').and.callFake(
        (address: string, callback: (err, result) => void) => {
          if (address === '0xERROR') {
            callback({ message: 'ERROR' }, null);
          } else {
            callback(null, parseInt(address.split('0x')[1]));
          }
        }
      )
    },
  };
  return EXOTokenSpy;
}

export function spyOnWeb3Service(contractSpy: any): any {
  const Web3ServiceSpy = jasmine.createSpyObj('Web3Service', [
    'canSignTransactions',
    'getInstance',
    'getContract',
    'getDefaultAccount',
    'fromWei',
    'toWei',
    'getTransactionReceipt',
    'checkTransactionStatus',
    'getBlock',
    'isAddress'
  ]);
  Web3ServiceSpy.canSignTransactions.and.returnValue(true);
  Web3ServiceSpy.getContract.and.returnValue(contractSpy);
  Web3ServiceSpy.getDefaultAccount.and.callFake(() => '0x8888');
  Web3ServiceSpy.fromWei.and.callFake((value: number) => value);
  Web3ServiceSpy.toWei.and.callFake((value: number) => value);
  Web3ServiceSpy.getTransactionReceipt.and.callFake(
    (hash: string, callback?: (err: any, result: any) => void) => {
      const status = hash === 'OK' ? '0x1' : '0x0';
      callback(null, { status });
    }
  );
  Web3ServiceSpy.checkTransactionStatus.and.callFake(
    (resolve, reject) => {
      return (err: any, hash: string) => {
        if (err) {
          reject(new Outcome(OutcomeType.Failure, err));
          return;
        }
        resolve(new Outcome(OutcomeType.Success));

        Web3ServiceSpy.getTransactionReceipt(hash, (err, receipt) => {
          if (err) {
            reject(new Outcome(OutcomeType.Failure, err));
            return;
          }
          if (parseInt(receipt.status, 16) === 1) {
            resolve(new Outcome(OutcomeType.Success, receipt));
          } else {
            reject(new Outcome(OutcomeType.Failure, receipt));
          }
        });
      };
    }
  );
  Web3ServiceSpy.getBlock.and.callFake(
    (blockNumber: any, callback?: (err: any, result: any) => void) => {
      callback(null, { timestamp: 1234567890 });
    }
  );
  Web3ServiceSpy.isAddress.and.callFake(
    (addr: string) => addr === '0xfE9e8709d3215310075d67E3ed32A380CCf451C8'
  );
  return Web3ServiceSpy;
}

export function spyOnOutcomeService(): any {
  const OutcomeServiceSpy = jasmine.createSpyObj('OutcomeService', [
    'succeed',
    'fail',
    'getMessage'
  ]);

  OutcomeServiceSpy.succeed.and.callFake(
    (msgName: string, data: any = null): Outcome => new Outcome(OutcomeType.Success, data, '')
  );
  OutcomeServiceSpy.fail.and.callFake(
    (msgName: string, data: any = null): Outcome => new Outcome(OutcomeType.Failure, data, '')
  );
  OutcomeServiceSpy.getMessage.and.callFake((msgName: string) => '');
  return OutcomeServiceSpy;
}

export function spyOnWalletService(): any {
  const WalletServiceSpy = jasmine.createSpyObj('WalletService', [
    'ofDefaultAccount',
    'transfer',
    'depositStake',
    'withdrawStake',
    'updateStakeBalance',
    'calculateInterest'
  ]);

  WalletServiceSpy.ofDefaultAccount.and.callFake((methodName: string, ...args: any[]) => {
    return Promise.resolve(new Outcome(OutcomeType.Success, new BigNumber(9999), ''));
  });
  WalletServiceSpy.transfer.and.returnValue(Promise.resolve(new Outcome(OutcomeType.Success, null, '')));
  WalletServiceSpy.depositStake.and.returnValue(Promise.resolve(new Outcome(OutcomeType.Success, null, '')));
  WalletServiceSpy.withdrawStake.and.returnValue(Promise.resolve(new Outcome(OutcomeType.Success, null, '')));
  WalletServiceSpy.updateStakeBalance.and.returnValue(Promise.resolve(new Outcome(OutcomeType.Success, null, '')));
  WalletServiceSpy.calculateInterest.and.returnValue(
    Promise.resolve(new Outcome(OutcomeType.Success, new BigNumber(9999), ''))
  );

  return WalletServiceSpy;
}
