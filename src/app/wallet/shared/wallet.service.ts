import { Injectable } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { Outcome, OutcomeType } from '../../models/outcome.model';

const exoTokenABI = require('../../contracts/EXOToken.json').abi;
const exoTokenAddress = '0x13974e705CBBcC8FEF113EAD43cB8161888e6B64';

@Injectable()
export class WalletService {
  private exoToken: any;

  constructor(private web3Service: Web3Service) {
    this.exoToken = this.web3Service.getContract(exoTokenABI, exoTokenAddress);
  }

  getToken(): any {
    return this.exoToken;
  }

  getBalanceOfDefaultAccount(unit: string): Promise<Outcome> {
    return this.getBalance(this.web3Service.getDefaultAccount(), unit);
  }

  getBalance(address: string, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.balanceOf.call(address, (err, balance) => {
        if (err) {
          reject(new Outcome(OutcomeType.Failure, err));
        } else {
          resolve(new Outcome(OutcomeType.Success, this.web3Service.fromWei(balance, unit)));
        }
      });
    });
  }

  transfer(to: string, value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.transfer(to, value, this.web3Service.checkTransactionStatus(resolve, reject));
    });
  }

  depositStake(value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.depositStake(value, this.web3Service.checkTransactionStatus(resolve, reject));
    });
  }

  withdrawStake(value: number, unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      const valueInWei = this.web3Service.toWei(value, unit);
      this.exoToken.withdrawStake(value, this.web3Service.checkTransactionStatus(resolve, reject));
    });
  }

  updateStakeBalance(): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.updateStakeBalance(this.web3Service.checkTransactionStatus(resolve, reject));
    });
  }

  calculateInterest(unit: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.calculateInterest.call((err, interest) => {
        if (err) {
          reject(new Outcome(OutcomeType.Failure, err));
        } else {
          resolve(new Outcome(OutcomeType.Success, this.web3Service.fromWei(interest, unit)));
        }
      });
    });
  }
}
