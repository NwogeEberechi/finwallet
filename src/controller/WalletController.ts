import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { WalletService } from "../services/WalletService";

export class WalletController {
  static async getBalance(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
      relations: ["wallet"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.wallet) {
      return res.status(404).json({ message: "No wallet found for user." });
    }
    return res.status(200).json({ balance: user.wallet.balance });
  }

  static async deposit(req: Request, res: Response) {
    const walletService = new WalletService();
    const userId = req.params.userId;
    const { amount } = req.body;

    try {
      const result = await walletService.deposit(userId, parseFloat(amount));

      if (!result.success) {
        return res.status(404).json({ message: result.error });
      }

      return res
        .status(200)
        .json({ message: "Deposit successful.", balance: result.balance });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error processing transaction.", error });
    }
  }

  static async withdraw(req: Request, res: Response) {
    const walletService = new WalletService();
    const userId = req.params.userId;
    const { amount } = req.body;

    try {
      const result = await walletService.withdraw(userId, parseFloat(amount));

      if (!result.success) {
        return res.status(404).json({ message: result.error });
      }

      return res
        .status(200)
        .json({ message: "Withdrawal successful.", balance: result.balance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error processing transaction.",
        error: error.message,
      });
    }
  }

  static async transfer(req: Request, res: Response) {
    const walletService = new WalletService();
    const { senderWalletId, recipientWalletId, amount } = req.body;

    try {
      const result = await walletService.transfer(
        senderWalletId,
        recipientWalletId,
        parseFloat(amount)
      );

      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }

      return res.status(200).json({
        message: "Transfer successful.",
        balance: result.senderBalance,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error processing transaction.",
        error: error.message,
      });
    }
  }
}
