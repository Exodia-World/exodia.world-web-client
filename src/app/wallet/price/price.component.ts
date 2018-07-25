import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommunicatorComponent } from '../../components/communicator.component';
import { Web3Service } from '../../services/web3.service';

/**
 * Displays and manages exo prices.
 */
@Component({
  selector: 'exo-price',
  template: `
    <section class="price-section wallet-section--value -raised ng-star-inserted">
      <img [src]="'/assets/img/icons/dollar_icon.png'" class="price-info-item__image">
      <span class="price-info-item__value">
        <strong>98.745</strong> USD
      </span>
    </section>

    <section class="price-section wallet-section--value -raised ng-star-inserted">
      <img [src]="'/assets/img/icons/ethereum_icon.png'" class="price-info-item__image">
      <span class="price-info-item__value">
        <strong>98.745</strong> ETH
      </span>
    </section>
  `,
  styleUrls: ['price.component.css']
})
export class PriceComponent extends CommunicatorComponent implements OnInit {
  @Input() isMaximized = false;

  address: string;

  constructor(private web3Service: Web3Service) {
    super();
  }

  ngOnInit() {
    this.refreshAll();
  }

  refreshAll() {
    this.updateAddress();
  }

  updateAddress() {
    this.address = this.web3Service.getDefaultAccount();
    console.log('Address', this.address);
  }

  onCopyAddressSuccess() {
    this.communicate('copy-address', 'Copied!');
  }
}
