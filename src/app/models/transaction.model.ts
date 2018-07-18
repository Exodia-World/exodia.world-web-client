export class Transaction {

  constructor(
    private title: string,
    private hash: string,
    private status: TransactionStatus
  ) {
  }

  getTitle(): string {
    return this.title;
  }

  getHash(): string {
    return this.hash;
  }

  getStatus(): TransactionStatus {
    return this.status;
  }

  setStatus(status: TransactionStatus) {
    this.status = status;
  }

}

export enum TransactionStatus {
  Waiting,
  Completed,
  Rejected
}
