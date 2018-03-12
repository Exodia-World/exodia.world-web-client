import { Web3Service } from "./services/web3.service";
import { MetamaskService } from "./services/metamask.service";
import { ElectronService } from "./services/electron.service";
import { WalletService } from "./services/wallet/wallet.service";

export class Web3ServiceMock extends Web3Service {
  constructor() {
    super(new MetamaskServiceMock());
  }
}

export class MetamaskServiceMock extends MetamaskService {
  constructor() {
    super(new ElectronServiceMock());
  }
}

export class ElectronServiceMock extends ElectronService {
}

export class WalletServiceMock extends WalletService {
  constructor() {
    super(new Web3ServiceMock());
  }
}
