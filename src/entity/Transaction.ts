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

  @Column()
  type: TransactionType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column()
  status: TransactionStatus;

  @Column()
  purpose: TransactionPurpose;

  @Column({ type: 'uuid', default: () => `uuid_generate_v4()`, unique: true})
  referenceId: string;

  @Column("json", { nullable: true })
  metadata: TransactionMetadata | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet: Wallet;
}
