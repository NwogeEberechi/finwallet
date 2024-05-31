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
exports.WalletController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const WalletService_1 = require("../services/WalletService");
class WalletController {
    static getBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOne({
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
        });
    }
    static deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletService = new WalletService_1.WalletService();
            const userId = req.params.userId;
            const { amount } = req.body;
            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ message: "Invalid amount." });
            }
            try {
                const result = yield walletService.deposit(userId, parseFloat(amount));
                if (!result.success) {
                    return res.status(404).json({ message: result.error });
                }
                return res
                    .status(200)
                    .json({ message: "Deposit successful.", balance: result.balance });
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Error processing transaction.", error });
            }
        });
    }
    static withdraw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletService = new WalletService_1.WalletService();
            const userId = req.params.userId;
            const { amount } = req.body;
            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ message: "Invalid amount" });
            }
            try {
                const result = yield walletService.withdraw(userId, parseFloat(amount));
                if (!result.success) {
                    return res.status(404).json({ message: result.error });
                }
                return res
                    .status(200)
                    .json({ message: "Withdrawal successful.", balance: result.balance });
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({
                    message: "Error processing transaction.",
                    error: error.message,
                });
            }
        });
    }
    static transfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletService = new WalletService_1.WalletService();
            const { senderWalletId, recipientWalletId, amount } = req.body;
            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ message: "Invalid amount." });
            }
            if (!senderWalletId) {
                return res.status(400).json({ message: "No sender wallet id provided." });
            }
            if (!recipientWalletId) {
                return res
                    .status(400)
                    .json({ message: "No recipient wallet id provided." });
            }
            try {
                const result = yield walletService.transfer(senderWalletId, recipientWalletId, parseFloat(amount), req[" currentUser"].id);
                if (!result.success) {
                    return res.status(400).json({ message: result.error });
                }
                return res.status(200).json({
                    message: "Transfer successful.",
                    balance: result.senderBalance,
                });
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({
                    message: "Error processing transaction.",
                    error: error.message,
                });
            }
        });
    }
}
exports.WalletController = WalletController;
//# sourceMappingURL=WalletController.js.map