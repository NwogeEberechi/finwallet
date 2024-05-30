import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import { encrypt } from "../helpers/helpers";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required." });
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
      const existingUser = await userRepository.findOne({
        where: { username },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists." });
      }

      const encryptedPassword = await encrypt.encryptpass(password);

      await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
          const user = new User();
          user.username = username;
          user.password = encryptedPassword;
          await transactionalEntityManager.save(user);

          const wallet = new Wallet();
          wallet.balance = 0;
          wallet.user = user;
          await transactionalEntityManager.save(wallet);

          const token = encrypt.generateToken({ id: user.id });

          return res.status(200).json({
            message: "User created successfully.",
            token,
            username: user.username,
            id: user.id,
            walletId: wallet.id,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error creating user or wallet.",
        error: error.message,
      });
    }
  }

  static async all(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      relations: ["wallet", "wallet.transactions"],
    });

    return res.status(200).json({
      data: instanceToPlain(users),
    });
  }

  static async one(request: Request, res: Response) {
    const id = request.params.id;
    const userRepository = AppDataSource.getRepository("User");
    const user = await userRepository.findOne({
      where: { id },
      relations: ["wallet", "wallet.transactions"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not registered." });
    }
    return res.status(200).json({
      data: instanceToPlain(user),
    });
  }

  static async remove(req: Request, res: Response) {
    const id = req.params.userId;
    const userRepository = AppDataSource.getRepository("User");
    let userToRemove = await userRepository.findOneBy({ id });

    if (!userToRemove) {
      return res.status(404).json({ message: "This user does not exist." });
    }

    await userRepository.remove(userToRemove);

    return res.status(200).json({ message: "user has been removed." });
  }

  static async getUserTransactions(req: Request, res: Response) {
    const userId = req.params.userId;
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ["wallet"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const wallet = user.wallet;

      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      const transactionRepository = AppDataSource.getRepository(Transaction);
      const transactions = await transactionRepository.find({
        where: { wallet: { id: wallet.id } },
      });

      return res.status(200).json({ transactions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
