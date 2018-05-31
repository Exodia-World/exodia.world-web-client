import { Injectable } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { OutcomeService } from '../../services/outcome.service';
import { Outcome } from '../../models/outcome.model';

const exoTokenContract = require('../../contracts/EXOToken.json');
const exoTokenABI = exoTokenContract.abi;
const exoTokenAddress = exoTokenContract.address;

/**
 * Provides wallet-related functions. Mainly interacts with EXOToken contract.
 */
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

  /**
   * Call a wallet method with the default account.
   *
   * @param {string} methodName The name of method to call
   * @param {any[]} args Arguments for the method
   */
  ofDefaultAccount(methodName: string, ...args: any[]): Promise<Outcome> {
    const defaultAccount = this.web3Service.getDefaultAccount();
    if (defaultAccount) {
      return this[methodName](defaultAccount, ...args);
    } else {
      return Promise.reject(this.outcomeService.fail('NoDefaultAccount'));
    }
  }

  /**
   * Get the balance of an address in unit.
   *
   * @param {string} address The account address
   * @param {string} unit The unit of value (wei, ether, etc.)
   */
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

  /**
   * Get the staking balance of an address in unit.
   *
   * @param {string} address The account address
   * @param {string} unit The unit of value (wei, ether, etc.)
   */
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

  /**
   * Transfer an amount of tokens in unit from the default account to another address.
   *
   * @param {string} address Account address
   * @param {number} value Amount of tokens
   * @param {string} unit The unit of value (wei, ether, etc.)
   */
  transfer(to: string, value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.transfer(to, value, this.web3Service.checkTransactionStatus(
        resolve, reject, 'TransferFailed'
      ));
    });
  }

  /**
   * Deposit an amount of tokens in unit into staking balance of the default account.
   *
   * @param {number} value Amount of tokens
   * @param {string} unit The unit of value (wei, ether, etc.)
   */
  depositStake(value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.depositStake(value, this.web3Service.checkTransactionStatus(
        resolve, reject, 'DepositStakeFailed'
      ));
    });
  }

  /**
   * Withdraw an amount of tokens in unit from staking balance of the default account.
   *
   * @param {number} value Amount of tokens
   * @param {string} unit The unit of value (wei, ether, etc.)
   */
  withdrawStake(value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.withdrawStake(value, this.web3Service.checkTransactionStatus(
        resolve, reject, 'WithdrawStakeFailed'
      ));
    });
  }

  /**
   * Update staking balance of the default account.
   */
  updateStakeBalance(): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.updateStakeBalance(this.web3Service.checkTransactionStatus(
        resolve, reject, 'UpdateStakeBalanceFailed'
      ));
    });
  }

  /**
   * Calculate the interest gained by the default account.
   *
   * @param {string} unit The unit of value (wei, ether, etc.)
   */
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

  /**
   * Get staking duration of an address.
   *
   * @param {string} address Account address
   */
  getStakeDuration(address: string): Promise<Outcome> {
    return this.getStakeStartTime(address).then(success => {
      return new Promise<Outcome>((resolve, reject) => {
        const stakeStartTime = success.getData();
        this.web3Service.getBlock('latest', (err, block) => {
          if (err) {
            reject(this.outcomeService.fail('GetLatestBlockFailed', err));
          }
          resolve(this.outcomeService.succeed(
            stakeStartTime > 0 ? block.timestamp - stakeStartTime : 0
          ));
        });
      });
    });
  }

  /**
   * Get staking start time of an address.
   *
   * @param {string} address Account address
   */
  getStakeStartTime(address: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.stakeStartTimeOf.call(address, (err, stakeStartTime) => {
        if (err) {
          reject(this.outcomeService.fail('GetStakeStartTimeFailed', err));
        } else {
          resolve(this.outcomeService.succeed(stakeStartTime));
        }
      });
    });
  }
}
