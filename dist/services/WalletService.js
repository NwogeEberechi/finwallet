"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const uuid_1 = require("uuid");
const data_source_1 = require("../data-source");
const Wallet_1 = require("../entity/Wallet");
const Transaction_1 = require("../entity/Transaction");
const transaction_1 = require("../interfaces/transaction");
class WalletService {
    creditWallet({ transactionalEntityManager, wallet, amount, purpose, metadata, referenceId = (0, uuid_1.v4)(), }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield transactionalEntityManager.increment(Wallet_1.Wallet, { id: wallet.id }, "balance", amount);
            const updatedWallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                where: { id: wallet.id },
            });
            const transaction = new Transaction_1.Transaction();
            transaction.type = transaction_1.TransactionType.CREDIT;
            transaction.purpose = purpose;
            transaction.amount = amount;
            transaction.wallet = updatedWallet;
            transaction.status = transaction_1.TransactionStatus.COMPLETED;
            transaction.metadata = metadata;
            transaction.referenceId = referenceId;
            yield transactionalEntityManager.save(transaction);
            return updatedWallet.balance;
        });
    }
    debitWallet({ transactionalEntityManager, wallet, amount, purpose, metadata, referenceId = (0, uuid_1.v4)(), }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentWallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                where: { id: wallet.id },
                lock: { mode: "pessimistic_write" },
            });
            if (currentWallet.balance < amount) {
                return { success: false, error: "Insufficient balance" };
            }
            yield transactionalEntityManager.decrement(Wallet_1.Wallet, { id: wallet.id }, "balance", amount);
            const updatedWallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                where: { id: wallet.id },
            });
            const transaction = new Transaction_1.Transaction();
            transaction.type = transaction_1.TransactionType.DEBIT;
            transaction.purpose = purpose;
            transaction.amount = amount;
            transaction.wallet = updatedWallet;
            transaction.status = transaction_1.TransactionStatus.COMPLETED;
            transaction.metadata = metadata;
            transaction.referenceId = referenceId;
            yield transactionalEntityManager.save(transaction);
            return { balance: updatedWallet.balance, success: true };
        });
    }
    deposit(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const wallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                    where: { user: { id: userId } },
                    relations: ["user"],
                });
                if (!wallet) {
                    return {
                        success: false,
                        error: "User or wallet not found",
                    };
                }
                const updatedBalance = yield this.creditWallet({
                    transactionalEntityManager,
                    wallet,
                    amount,
                    purpose: transaction_1.TransactionPurpose.DEPOSIT,
                });
                return { balance: updatedBalance, success: true };
            }));
        });
    }
    withdraw(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const wallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                    where: { user: { id: userId } },
                    relations: ["user"],
                });
                if (!wallet) {
                    return {
                        success: false,
                        error: "User or wallet not found",
                    };
                }
                const result = yield this.debitWallet({
                    transactionalEntityManager,
                    wallet,
                    amount,
                    purpose: transaction_1.TransactionPurpose.WITHDRAWAL,
                });
                return { balance: result.balance, success: result.success, error: result.error };
            }));
        });
    }
    transfer(senderWalletId, recipientWalletId, amount, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const senderWallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                    where: { id: senderWalletId },
                    relations: ["user"],
                });
                if (!senderWallet) {
                    return {
                        success: false,
                        error: "Sender wallet not found",
                    };
                }
                if (currentUserId !== senderWallet.user.id) {
                    return {
                        success: false,
                        error: "Forbidden: You can only transfer from your wallet",
                    };
                }
                const recipientWallet = yield transactionalEntityManager.findOne(Wallet_1.Wallet, {
                    where: { id: recipientWalletId },
                    relations: ["user"],
                });
                if (!recipientWallet) {
                    return {
                        success: false,
                        error: "Recipient wallet not found",
                    };
                }
                const referenceId = (0, uuid_1.v4)();
                const senderResult = yield this.debitWallet({
                    transactionalEntityManager,
                    amount,
                    referenceId,
                    wallet: senderWallet,
                    purpose: transaction_1.TransactionPurpose.TRANSFER,
                    metadata: { recipientId: recipientWallet.user.id },
                });
                if (!senderResult.success) {
                    return { success: false, error: senderResult.error };
                }
                const updatedRecipientBalance = yield this.creditWallet({
                    transactionalEntityManager,
                    amount,
                    referenceId,
                    wallet: recipientWallet,
                    purpose: transaction_1.TransactionPurpose.TRANSFER,
                    metadata: { senderId: senderWallet.user.id },
                });
                return {
                    success: true,
                    senderBalance: senderResult.balance,
                    recipientBalance: updatedRecipientBalance,
                };
            }));
        });
    }
}
exports.WalletService = WalletService;
//# sourceMappingURL=WalletService.js.map