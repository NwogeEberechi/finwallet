import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
  } from "typeorm";
  import { Wallet } from "./Wallet";
  
  @Entity()
  @Unique(["username"])
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @OneToOne(() => Wallet, (wallet) => wallet.user)
    @JoinColumn()
    wallet: Wallet[];
  }
  