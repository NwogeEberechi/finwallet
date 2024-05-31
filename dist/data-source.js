"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Wallet_1 = require("./entity/Wallet");
const Transaction_1 = require("./entity/Transaction");
const config_1 = require("./config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: config_1.postgresUrl,
    port: +config_1.postgresPort,
    username: config_1.postgresUser,
    password: config_1.postgresPassword,
    database: config_1.postgresDatabase,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Wallet_1.Wallet, Transaction_1.Transaction],
    migrations: [],
    subscribers: [],
    uuidExtension: "uuid-ossp",
});
//# sourceMappingURL=data-source.js.map