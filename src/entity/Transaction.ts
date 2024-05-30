import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from "./Wallet";
import {
  TransactionType,
  TransactionStatus,
  TransactionPurpose,
  TransactionMetadata,
} from "../interfaces/transaction";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ type: "enum", enum: TransactionPurpose })
  purpose: TransactionPurpose;

  @Column({ type: "uuid", default: () => `uuid_generate_v4()` })
  referenceId: string;

  @Column("json", { nullable: true })
  metadata: TransactionMetadata | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet: Wallet;
}
