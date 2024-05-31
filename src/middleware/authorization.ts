import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";

export const userAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: { id: req[" currentUser"].id },
  });

  if (user.id !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export const transactionAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const { senderWalletId } = req.body;
  const user = await userRepo.findOne({
    where: { id: req[" currentUser"].id },
    relations: ["wallet"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const walletRepo = AppDataSource.getRepository(Wallet);
  const senderWallet = await walletRepo.findOne({
    where: { id: senderWalletId },
    relations: ["user"],
  });

  if (!senderWallet) {
    return res.status(404).json({ message: "Wallet not found." });
  }

  if (user.wallet.id !== senderWalletId) {
    return res.status(403).json({ message: "You can only transact from your wallet" });
  }
  next();
};
