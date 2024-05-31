"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
var express = require("express");
var UserController_1 = require("./controller/UserController");
var AuthController_1 = require("./controller/AuthController");
var WalletController_1 = require("./controller/WalletController");
var authentification_1 = require("./middleware/authentification");
var authorization_1 = require("./middleware/authorization");
var validator_1 = require("./middleware/validator");
var Router = express.Router();
exports.serviceRouter = Router;
//Todo: only admin users should access this route
Router.get("/users", authentification_1.authentification, UserController_1.UserController.all);
Router.get("/users/:userId", authentification_1.authentification, validator_1.validateUserId, authorization_1.userAuthorization, UserController_1.UserController.one);
Router.post("/signup", validator_1.validateAuth, UserController_1.UserController.signup);
Router.post("/login", validator_1.validateAuth, AuthController_1.AuthController.login);
//Todo: only admin users should access this route
Router.delete("/users/:userId", authentification_1.authentification, validator_1.validateUserId, UserController_1.UserController.remove);
Router.get("/users/:userId/balance", authentification_1.authentification, validator_1.validateUserId, authorization_1.userAuthorization, WalletController_1.WalletController.getBalance);
Router.post("/users/:userId/deposit", authentification_1.authentification, validator_1.validateUserId, validator_1.validateAmount, authorization_1.userAuthorization, WalletController_1.WalletController.deposit);
Router.post("/users/:userId/transfer", authentification_1.authentification, validator_1.validateUserId, validator_1.validateWalletId, validator_1.validateAmount, authorization_1.userAuthorization, authorization_1.transactionAuthorization, WalletController_1.WalletController.transfer);
Router.post("/users/:userId/withdraw", authentification_1.authentification, validator_1.validateUserId, validator_1.validateAmount, authorization_1.userAuthorization, WalletController_1.WalletController.withdraw);
Router.get("/users/:userId/transactions", authentification_1.authentification, validator_1.validateUserId, authorization_1.userAuthorization, UserController_1.UserController.getUserTransactions);
//# sourceMappingURL=routes.js.map