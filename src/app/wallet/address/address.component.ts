import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommunicatorComponent } from '../../components/communicator.component';
import { Web3Service } from '../../services/web3.service';

/**
 * Displays and manages wallet address information.
 */
@Component({
  selector: 'exo-wallet-address',
  template: `
    <div *ngIf="address" class="address">
      <qrcode class="address-qrcode" [qrdata]="address" [size]="128" [level]="'L'"></qrcode>
      <p class="address-text">{{address}}</p>
      <exo-message name="copy-address" position="above">
        <button mat-icon-button color="primary" class="copy-address"
          [clipboard]="address" (clipboardCopy)="onCopyAddressSuccess()">
          <mat-icon>file_copy</mat-icon>
        </button>
      </exo-message>
    </div>
    <p *ngIf="! address" class="address-unlock-msg">
      Please unlock your Ethereum wallet account to show its address or
      refresh the wallet if you have done so.
    </p>
  `,
  styleUrls: ['address.component.css']
})
export class AddressComponent extends CommunicatorComponent implements OnInit {
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
