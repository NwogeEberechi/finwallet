import * as express from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { WalletController } from "./controller/WalletController";
import { authentification } from "./middleware/authentification";
import { userAuthorization } from "./middleware/authorization";

const Router = express.Router();

//Todo: only admin users should access this route
Router.get("/users", authentification, UserController.all);
Router.get(
  "/users/:userId",
  authentification,
  userAuthorization,
  UserController.one
);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
//Todo: only admin users should access this route
Router.delete("/users/:userId", authentification, UserController.remove);
Router.get(
  "/users/:userId/balance",
  authentification,
  userAuthorization,
  WalletController.getBalance
);
Router.post(
  "/users/:userId/deposit",
  authentification,
  userAuthorization,
  WalletController.deposit
);
Router.post(
  "/users/:userId/transfer",
  authentification,
  userAuthorization,
  WalletController.transfer
);
Router.post(
  "/users/:userId/withdraw",
  authentification,
  userAuthorization,
  WalletController.withdraw
);
Router.get(
  "/users/:userId/transactions",
  authentification,
  userAuthorization,
  UserController.getUserTransactions
);

export { Router as serviceRouter };
