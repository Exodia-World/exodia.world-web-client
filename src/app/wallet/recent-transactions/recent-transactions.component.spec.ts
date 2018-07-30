import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransactionsComponent } from './recent-transactions.component';
import { spyOnWeb3Service, spyOnEXOToken, spyOnTransactionService } from '../../global.mock';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionStatus } from '../../models/transaction.model';

describe('RecentTransactionsComponent', () => {
  let component: RecentTransactionsComponent;
  let fixture: ComponentFixture<RecentTransactionsComponent>;
  let el: any;
  let TransactionServiceSpy: any;

  beforeEach(async(() => {
    let Web3ServiceSpy = spyOnWeb3Service(spyOnEXOToken());
    TransactionServiceSpy = spyOnTransactionService(Web3ServiceSpy);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: TransactionService, useValue: TransactionServiceSpy }
      ],
      declarations: [ RecentTransactionsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTransactionsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show that it is loading at the beginning', () => {
    expect(component.isLoading).toBe(true);
    let progressSpinner = el.querySelector('mat-progress-spinner');
    expect(progressSpinner).not.toBe(null);
  });

  it('should indicate that there are no transactions found', fakeAsync(() => {
    tick(1001);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.isLoading).toBe(false);

      component.recentTxs = [];
      let noTransactionsIcon = el.querySelector('.s-no-tx-icon');
      expect(noTransactionsIcon).not.toBe(null);
    });
  }));

  it('should display the most recent transactions', fakeAsync(() => {
    tick(1001);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.isLoading).toBe(false);

      component.recentTxs = [
        new Transaction('title', 'hash', TransactionStatus.Waiting)
      ];

      let recentTransaction = el.querySelector('.s-recent-tx');
      expect(recentTransaction).not.toBe(null);

      let txTitle = el.querySelector('.s-tx-title');
      expect(txTitle.textContent).toBe('title');

      let txHash = el.querySelector('.s-tx-hash');
      expect(txHash.textContent).toBe('hash');

      let txStatus = el.querySelector('.s-tx-status');
      expect(txStatus.textContent).toBe(TransactionStatus.Waiting);
    });
  }));

  it('should change status badge\'s color based on transaction status', fakeAsync(() => {
    tick(1001);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.isLoading).toBe(false);

      component.recentTxs = [
        new Transaction('title', 'hash', TransactionStatus.Waiting)
      ];
      let txStatus = el.querySelector('.s-tx-status.-badge--normal');
      expect(txStatus).not.toBe(null);

      component.recentTxs = [
        new Transaction('title', 'hash', TransactionStatus.Completed)
      ];
      txStatus = el.querySelector('.s-tx-status.-badge--success');
      expect(txStatus).not.toBe(null);

      component.recentTxs = [
        new Transaction('title', 'hash', TransactionStatus.Rejected)
      ];
      txStatus = el.querySelector('.s-tx-status.-badge--error');
      expect(txStatus).not.toBe(null);
    });
  }));
});
