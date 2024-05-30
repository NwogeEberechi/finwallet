import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
  } from "typeorm";
  import { Exclude } from 'class-transformer';
  import { Wallet } from "./Wallet";
  
  @Entity()
  @Unique(["username"])
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    username: string;
  
    @Exclude()
    @Column({ nullable: false })
    password: string;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @OneToOne(() => Wallet, (wallet) => wallet.user)
    @JoinColumn()
    wallet: Wallet;
  }
  