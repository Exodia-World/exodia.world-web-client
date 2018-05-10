import { Component } from '@angular/core';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exodia.World';
  showAppWarning = false;

  constructor(private web3Service: Web3Service) {
    this.showAppWarning = ! this.web3Service.canSignTransactions();
  }
}
