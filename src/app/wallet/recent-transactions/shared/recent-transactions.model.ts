export interface Transaction {
  action: string;
  hash: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  WAITING,
  COMPLETED,
  REJECTED
}
