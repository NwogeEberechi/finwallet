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
exports.TransactionController = void 0;
const Transaction_1 = require("../entity/Transaction");
const data_source_1 = require("../data-source");
class TransactionController {
    static all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
            const transactions = yield transactionRepository.find({});
            return res.status(200).json({
                data: transactions,
            });
        });
    }
    static userTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.userId;
            const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
            const userTransactions = yield transactionRepository.find({
                relations: ["wallet", "wallet.transactions"],
            });
            const userRepository = data_source_1.AppDataSource.getRepository("User");
            let userToRemove = yield userRepository.findOneBy({ id });
            return res.status(200).json({ message: "user has been removed." });
        });
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=TransactionController.js.map