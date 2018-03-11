import { Injectable } from "@angular/core";
import { Web3Service } from "./web3.service";
import { MetamaskService } from "./metamask.service";

@Injectable()
export class WalletService {

  constructor(private web3Service: Web3Service, private metamaskService: MetamaskService) {
  }

  sendEther(to: string, value: number): void {
    this.web3Service.getInstance().eth.sendTransaction({
      to: to,
      value: value
    }, (err, res) => {
      if (err) this.metamaskService.closeNotification();
      if (res) this.metamaskService.closeNotification();
    });

    setTimeout(() => {
      this.metamaskService.openNotification();
    }, 500);
  }
}
