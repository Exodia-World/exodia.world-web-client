import { Injectable } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { OutcomeService } from '../../services/outcome.service';
import { Outcome } from '../../models/outcome.model';

const exoTokenContract = require('../../contracts/EXOToken.json');
const exoTokenABI = exoTokenContract.abi;
const exoTokenAddress = exoTokenContract.address;

@Injectable()
export class WalletService {
  private exoToken: any;

  constructor(
    private web3Service: Web3Service,
    private outcomeService: OutcomeService
  ) {
    this.exoToken = this.web3Service.getContract(exoTokenABI, exoTokenAddress);
  }

  getToken(): any {
    return this.exoToken;
  }

  getBalanceOfDefaultAccount(unit: string): Promise<Outcome> {
    const defaultAccount = this.web3Service.getDefaultAccount();
    if (defaultAccount) {
      return this.getBalance(defaultAccount, unit);
    } else {
      return Promise.reject(this.outcomeService.fail('NoDefaultAccount'));
    }
  }

  getStakeBalanceOfDefaultAccount(unit: string): Promise<Outcome> {
    const defaultAccount = this.web3Service.getDefaultAccount();
    if (defaultAccount) {
      return this.getStakeBalance(defaultAccount, unit);
    } else {
      return Promise.reject(this.outcomeService.fail('NoDefaultAccount'));
    }
  }

  getBalance(address: string, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.balanceOf.call(address, (err, balance) => {
        if (err) {
          reject(this.outcomeService.fail('GetBalanceFailed', err));
        } else {
          resolve(this.outcomeService.succeed(this.web3Service.fromWei(balance,unit)));
        }
      });
    });
  }

  getStakeBalance(address: string, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.stakeBalanceOf.call(address, (err, balance) => {
        if (err) {
          reject(this.outcomeService.fail('GetStakeBalanceFailed', err));
        } else {
          resolve(this.outcomeService.succeed(this.web3Service.fromWei(balance,unit)));
        }
      });
    });
  }

  transfer(to: string, value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.transfer(to, value, this.web3Service.checkTransactionStatus(
        resolve, reject, 'TransferFailed'
      ));
    });
  }

  depositStake(value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.depositStake(value, this.web3Service.checkTransactionStatus(
        resolve, reject, 'DepositStakeFailed'
      ));
    });
  }

  withdrawStake(value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.withdrawStake(value, this.web3Service.checkTransactionStatus(
        resolve, reject, 'WithdrawStakeFailed'
      ));
    });
  }

  updateStakeBalance(): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.updateStakeBalance(this.web3Service.checkTransactionStatus(
        resolve, reject, 'UpdateStakeBalanceFailed'
      ));
    });
  }

  calculateInterest(unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.calculateInterest.call((err, interest) => {
        if (err) {
          reject(this.outcomeService.fail('CalculateInterestFailed', err));
        } else {
          resolve(this.outcomeService.succeed(this.web3Service.fromWei(interest, unit)));
        }
      });
    });
  }
}
