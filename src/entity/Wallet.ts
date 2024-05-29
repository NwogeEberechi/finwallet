import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
  } from "typeorm";
  import { User } from "./User";
  import { Transaction } from "./Transaction";
  
  @Entity()
  export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    balance: number;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @OneToOne(() => User, (user) => user.wallet)
    user: User;
  
    @OneToMany(() => Transaction, (transaction) => transaction.wallet)
    transactions: Transaction[];
  }
  