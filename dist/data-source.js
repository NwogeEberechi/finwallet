"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Wallet_1 = require("./entity/Wallet");
var Transaction_1 = require("./entity/Transaction");
var config_1 = require("./config");
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