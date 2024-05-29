import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Wallet } from "./entity/Wallet";
import { Transaction } from "./entity/Transaction";
import {
  postgresUrl,
  postgresDatabase,
  postgresPassword,
  postgresUser,
  postgresPort,
} from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: postgresUrl,
  port: +postgresPort,
  username: postgresUser,
  password: postgresPassword,
  database: postgresDatabase,
  synchronize: true,
  logging: false,
  entities: [User, Wallet, Transaction],
  migrations: [],
  subscribers: [],
  uuidExtension: "uuid-ossp",
});
