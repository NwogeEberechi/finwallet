import * as express from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { WalletController } from "./controller/WalletController";
import { authentification } from "./middleware/authentification";
import {
  userAuthorization,
  transactionAuthorization,
} from "./middleware/authorization";
import {
  validateUserId,
  validateWalletId,
  validateAmount,
  validateAuth,
} from "./middleware/validator";

const Router = express.Router();

//Todo: only admin users should access this route
Router.get("/users", authentification, UserController.all);
Router.get(
  "/users/:userId",
  authentification,
  validateUserId,
  userAuthorization,
  UserController.one
);
Router.post("/signup", validateAuth, UserController.signup);
Router.post("/login", validateAuth, AuthController.login);
//Todo: only admin users should access this route
Router.delete(
  "/users/:userId",
  authentification,
  validateUserId,
  UserController.remove
);
Router.get(
  "/users/:userId/balance",
  authentification,
  validateUserId,
  userAuthorization,
  WalletController.getBalance
);
Router.post(
  "/users/:userId/deposit",
  authentification,
  validateUserId,
  validateAmount,
  userAuthorization,
  WalletController.deposit
);
Router.post(
  "/users/:userId/transfer",
  authentification,
  validateUserId,
  validateWalletId,
  validateAmount,
  userAuthorization,
  transactionAuthorization,
  WalletController.transfer
);
Router.post(
  "/users/:userId/withdraw",
  authentification,
  validateUserId,
  validateAmount,
  userAuthorization,
  WalletController.withdraw
);
Router.get(
  "/users/:userId/transactions",
  authentification,
  validateUserId,
  userAuthorization,
  UserController.getUserTransactions
);

export { Router as serviceRouter };
