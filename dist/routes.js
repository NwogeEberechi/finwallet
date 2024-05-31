"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express = require("express");
const UserController_1 = require("./controller/UserController");
const AuthController_1 = require("./controller/AuthController");
const WalletController_1 = require("./controller/WalletController");
const authentification_1 = require("./middleware/authentification");
const authorization_1 = require("./middleware/authorization");
const Router = express.Router();
exports.serviceRouter = Router;
//Todo: only admin users should access this route
Router.get("/users", authentification_1.authentification, UserController_1.UserController.all);
Router.get("/users/:userId", authentification_1.authentification, authorization_1.userAuthorization, UserController_1.UserController.one);
Router.post("/signup", UserController_1.UserController.signup);
Router.post("/login", AuthController_1.AuthController.login);
//Todo: only admin users should access this route
Router.delete("/users/:userId", authentification_1.authentification, UserController_1.UserController.remove);
Router.get("/users/:userId/balance", authentification_1.authentification, authorization_1.userAuthorization, WalletController_1.WalletController.getBalance);
Router.post("/users/:userId/deposit", authentification_1.authentification, authorization_1.userAuthorization, WalletController_1.WalletController.deposit);
Router.post("/users/:userId/transfer", authentification_1.authentification, authorization_1.userAuthorization, WalletController_1.WalletController.transfer);
Router.post("/users/:userId/withdraw", authentification_1.authentification, authorization_1.userAuthorization, WalletController_1.WalletController.withdraw);
Router.get("/users/:userId/transactions", authentification_1.authentification, authorization_1.userAuthorization, UserController_1.UserController.getUserTransactions);
//# sourceMappingURL=routes.js.map