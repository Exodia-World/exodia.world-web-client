import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Web3Service } from './web3.service';
import { WindowService } from './window.service';
import { MetamaskService } from './metamask.service';
import { OutcomeService } from './outcome.service';
import { MetamaskServiceSpy } from '../spies/metamask-service-spy';
import { WindowServiceSpy } from '../spies/window-service-spy';
import { OutcomeServiceSpy} from '../spies/outcome-service-spy';


describe('Service: Web3Service', () => {
  let web3Service: Web3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        Web3Service,
        { provide: WindowService, useClass: WindowServiceSpy },
        { provide: MetamaskService, useClass: MetamaskServiceSpy },
        { provide: OutcomeService, useClass: OutcomeServiceSpy },
      ]
    })
  });

  web3Service = TestBed.get(Web3Service);

  it('should return true if window has web3', () => {
    const isSigned = web3Service.canSignTransactions();
    console.log(isSigned);
  })






});
