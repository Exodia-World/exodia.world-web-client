import { Injectable } from "@angular/core";
import { Web3Service } from "../web3.service";
import { MetamaskService } from "../metamask.service";
import { BigNumber } from "bignumber.js";
import { Outcome, OutcomeType } from "../../models/outcome.model";

const exoTokenABI = require('../../contract/EXOToken.json');
const exoTokenAddress = '';

@Injectable()
export class WalletService {
  private exoToken: any;

  constructor(private web3Service: Web3Service, private metamaskService: MetamaskService) {
    this.exoToken = this.web3Service.getContract(exoTokenABI, exoTokenAddress);
  }

  getBalanceOfDefaultAccount(): any {
    this.getBalance(this.web3Service.getDefaultAccount());
  }

  getBalance(address: string): Promise<Outcome> {
    return new Promise((resolve, reject) => {
      this.exoToken.balanceOf.call(address, (err, result) => {
        if (err) reject(new Outcome(OutcomeType.Fail, err));

        resolve(new Outcome(OutcomeType.Success, this.web3Service.fromWei(result)));
      });
    });
  }
}
