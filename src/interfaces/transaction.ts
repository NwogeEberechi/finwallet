import { EntityManager } from "typeorm";
import { Wallet } from "../entity/Wallet";

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}
export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  DECLINED = "declined",
}
export enum TransactionPurpose {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  REFUND = "refund",
}
export interface TransactionMetadata {
  [key: string]: any;
}

export interface TransactionPayload {
  transactionalEntityManager: EntityManager;
  wallet: Wallet;
  amount: number;
  purpose: TransactionPurpose;
  metadata?: TransactionMetadata;
  referenceId?: string;
}
