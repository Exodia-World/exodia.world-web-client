import { Outcome, OutcomeType } from './models/outcome.model';

export class ElectronServiceMock { }

export class MetamaskServiceMock { }

export class Web3ServiceMock { }

export class WalletServiceMock { }

export function spyOnEXOToken(): any {
  const EXOTokenSpy = {
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
    stakeBalanceOf: {
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
            callback({message: 'ERROR'}, null);
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
    'getBlock'
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
      return (hash: string) => {
        Web3ServiceSpy.getTransactionReceipt(hash, (err, receipt) => {
          if (err) {
            reject(new Outcome(OutcomeType.Failure, err));
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
      callback(null, {timestamp: 1234567890});
    }
  );
  return Web3ServiceSpy;
}

export function spyOnOutcomeService(): any {
  const OutcomeServiceSpy = jasmine.createSpyObj('OutcomeService', [
    'succeed',
    'fail',
    'getErrMsg'
  ]);

  OutcomeServiceSpy.succeed.and.callFake(
    (data: any = null, msg: string = ''): Outcome => new Outcome(OutcomeType.Success, data, msg)
  );
  OutcomeServiceSpy.fail.and.callFake(
    (errName: string, data: any = null): Outcome => new Outcome(OutcomeType.Failure, data, '')
  );
  OutcomeServiceSpy.getErrMsg.and.callFake((errName: string) => '');
  return OutcomeServiceSpy;
}
