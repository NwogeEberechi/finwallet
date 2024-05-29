export type TransactionType = "credit" | "debit";
export type TransactionStatus = "pending" | "success" | "failed" | "declined";
export type TransactionPurpose =
  | "deposit"
  | "withdrawal"
  | "transfer"
  | "refund";
export interface TransactionMetadata {
  [key: string]: any;
}
