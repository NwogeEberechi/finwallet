import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../data-source";
import { Wallet } from "../entity/Wallet";
import { Transaction } from "../entity/Transaction";
import {
  TransactionPurpose,
  TransactionStatus,
  TransactionType,
  TransactionPayload,
} from "../interfaces/transaction";

class WalletService {
  private async creditWallet({
    transactionalEntityManager,
    wallet,
    amount,
    purpose,
    metadata,
    referenceId = uuidv4(),
  }: TransactionPayload) {
    await transactionalEntityManager.increment(
      Wallet,
      { id: wallet.id },
      "balance",
      amount
    );

    const updatedWallet = await transactionalEntityManager.findOne(Wallet, {
      where: { id: wallet.id },
    });

    const transaction = new Transaction();
    transaction.type = TransactionType.CREDIT;
    transaction.purpose = purpose;
    transaction.amount = amount;
    transaction.wallet = updatedWallet;
    transaction.status = TransactionStatus.COMPLETED;
    transaction.metadata = metadata;
    transaction.referenceId = referenceId;
    await transactionalEntityManager.save(transaction);

    return updatedWallet.balance;
  }
  private async debitWallet({
    transactionalEntityManager,
    wallet,
    amount,
    purpose,
    metadata,
    referenceId = uuidv4(),
  }: TransactionPayload) {
    const currentWallet = await transactionalEntityManager.findOne(Wallet, {
      where: { id: wallet.id },
      lock: { mode: "pessimistic_write" },
    });

    if (currentWallet.balance < amount) {
      return { success: false, error: "Insufficient balance" };
    }

    await transactionalEntityManager.decrement(
      Wallet,
      { id: wallet.id },
      "balance",
      amount
    );

    const updatedWallet = await transactionalEntityManager.findOne(Wallet, {
      where: { id: wallet.id },
    });

    const transaction = new Transaction();
    transaction.type = TransactionType.DEBIT;
    transaction.purpose = purpose;
    transaction.amount = amount;
    transaction.wallet = updatedWallet;
    transaction.status = TransactionStatus.COMPLETED;
    transaction.metadata = metadata;
    transaction.referenceId = referenceId;
    await transactionalEntityManager.save(transaction);

    return { balance: updatedWallet.balance, success: true };
  }

  async deposit(
    userId: string,
    amount: number
  ): Promise<{ balance?: number; success?: boolean; error?: string } | null> {
    return await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const wallet = await transactionalEntityManager.findOne(Wallet, {
          where: { user: { id: userId } },
          relations: ["user"],
        });

        if (!wallet) {
          return {
            success: false,
            error: "User or wallet not found",
          };
        }

        const updatedBalance = await this.creditWallet({
          transactionalEntityManager,
          wallet,
          amount,
          purpose: TransactionPurpose.DEPOSIT,
        });

        return { balance: updatedBalance, success: true };
      }
    );
  }

  async withdraw(
    userId: string,
    amount: number
  ): Promise<{ balance?: number; success?: boolean; error?: string } | null> {
    return await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const wallet = await transactionalEntityManager.findOne(Wallet, {
          where: { user: { id: userId } },
          relations: ["user"],
        });

        if (!wallet) {
          return {
            success: false,
            error: "User or wallet not found",
          };
        }

        const result = await this.debitWallet({
          transactionalEntityManager,
          wallet,
          amount,
          purpose: TransactionPurpose.WITHDRAWAL,
        });

        return { balance: result.balance, success: result.success, error: result.error };
      }
    );
  }

  async transfer(
    senderWalletId: string,
    recipientWalletId: string,
    amount: number,
  ): Promise<{
    senderBalance?: number;
    recipientBalance?: number;
    error?: string;
    success: boolean;
  } | null> {
    return await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const senderWallet = await transactionalEntityManager.findOne(Wallet, {
          where: { id: senderWalletId },
          relations: ["user"],
        });

        const recipientWallet = await transactionalEntityManager.findOne(
          Wallet,
          {
            where: { id: recipientWalletId },
            relations: ["user"],
          }
        );

        if (!recipientWallet) {
          return {
            success: false,
            error: "Recipient wallet not found",
          };
        }

        const referenceId = uuidv4();
        const senderResult = await this.debitWallet({
          transactionalEntityManager,
          amount,
          referenceId,
          wallet: senderWallet,
          purpose: TransactionPurpose.TRANSFER,
          metadata: { recipientId: recipientWallet.user.id },
        });
        if (!senderResult.success) {
          return { success: false, error: senderResult.error };
        }
        const updatedRecipientBalance = await this.creditWallet({
          transactionalEntityManager,
          amount,
          referenceId,
          wallet: recipientWallet,
          purpose: TransactionPurpose.TRANSFER,
          metadata: { senderId: senderWallet.user.id },
        });
        return {
          success: true,
          senderBalance: senderResult.balance,
          recipientBalance: updatedRecipientBalance,
        };
      }
    );
  }
}

export { WalletService };
