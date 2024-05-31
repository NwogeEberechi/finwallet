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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
var uuid_1 = require("uuid");
var data_source_1 = require("../data-source");
var Wallet_1 = require("../entity/Wallet");
var Transaction_1 = require("../entity/Transaction");
var transaction_1 = require("../interfaces/transaction");
var WalletService = /** @class */ (function () {
    function WalletService() {
    }
    WalletService.prototype.creditWallet = function (_a) {
        var transactionalEntityManager = _a.transactionalEntityManager, wallet = _a.wallet, amount = _a.amount, purpose = _a.purpose, metadata = _a.metadata, _b = _a.referenceId, referenceId = _b === void 0 ? (0, uuid_1.v4)() : _b;
        return __awaiter(this, void 0, void 0, function () {
            var updatedWallet, transaction;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transactionalEntityManager.increment(Wallet_1.Wallet, { id: wallet.id }, "balance", amount)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                                where: { id: wallet.id },
                            })];
                    case 2:
                        updatedWallet = _c.sent();
                        transaction = new Transaction_1.Transaction();
                        transaction.type = transaction_1.TransactionType.CREDIT;
                        transaction.purpose = purpose;
                        transaction.amount = amount;
                        transaction.wallet = updatedWallet;
                        transaction.status = transaction_1.TransactionStatus.COMPLETED;
                        transaction.metadata = metadata;
                        transaction.referenceId = referenceId;
                        return [4 /*yield*/, transactionalEntityManager.save(transaction)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, updatedWallet.balance];
                }
            });
        });
    };
    WalletService.prototype.debitWallet = function (_a) {
        var transactionalEntityManager = _a.transactionalEntityManager, wallet = _a.wallet, amount = _a.amount, purpose = _a.purpose, metadata = _a.metadata, _b = _a.referenceId, referenceId = _b === void 0 ? (0, uuid_1.v4)() : _b;
        return __awaiter(this, void 0, void 0, function () {
            var currentWallet, updatedWallet, transaction;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                            where: { id: wallet.id },
                            lock: { mode: "pessimistic_write" },
                        })];
                    case 1:
                        currentWallet = _c.sent();
                        if (currentWallet.balance < amount) {
                            return [2 /*return*/, { success: false, error: "Insufficient balance" }];
                        }
                        return [4 /*yield*/, transactionalEntityManager.decrement(Wallet_1.Wallet, { id: wallet.id }, "balance", amount)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                                where: { id: wallet.id },
                            })];
                    case 3:
                        updatedWallet = _c.sent();
                        transaction = new Transaction_1.Transaction();
                        transaction.type = transaction_1.TransactionType.DEBIT;
                        transaction.purpose = purpose;
                        transaction.amount = amount;
                        transaction.wallet = updatedWallet;
                        transaction.status = transaction_1.TransactionStatus.COMPLETED;
                        transaction.metadata = metadata;
                        transaction.referenceId = referenceId;
                        return [4 /*yield*/, transactionalEntityManager.save(transaction)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, { balance: updatedWallet.balance, success: true }];
                }
            });
        });
    };
    WalletService.prototype.deposit = function (userId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.AppDataSource.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var wallet, updatedBalance;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                                            where: { user: { id: userId } },
                                            relations: ["user"],
                                        })];
                                    case 1:
                                        wallet = _a.sent();
                                        if (!wallet) {
                                            return [2 /*return*/, {
                                                    success: false,
                                                    error: "User or wallet not found",
                                                }];
                                        }
                                        return [4 /*yield*/, this.creditWallet({
                                                transactionalEntityManager: transactionalEntityManager,
                                                wallet: wallet,
                                                amount: amount,
                                                purpose: transaction_1.TransactionPurpose.DEPOSIT,
                                            })];
                                    case 2:
                                        updatedBalance = _a.sent();
                                        return [2 /*return*/, { balance: updatedBalance, success: true }];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WalletService.prototype.withdraw = function (userId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.AppDataSource.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var wallet, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                                            where: { user: { id: userId } },
                                            relations: ["user"],
                                        })];
                                    case 1:
                                        wallet = _a.sent();
                                        if (!wallet) {
                                            return [2 /*return*/, {
                                                    success: false,
                                                    error: "User or wallet not found",
                                                }];
                                        }
                                        return [4 /*yield*/, this.debitWallet({
                                                transactionalEntityManager: transactionalEntityManager,
                                                wallet: wallet,
                                                amount: amount,
                                                purpose: transaction_1.TransactionPurpose.WITHDRAWAL,
                                            })];
                                    case 2:
                                        result = _a.sent();
                                        return [2 /*return*/, { balance: result.balance, success: result.success, error: result.error }];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WalletService.prototype.transfer = function (senderWalletId, recipientWalletId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, data_source_1.AppDataSource.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var senderWallet, recipientWallet, referenceId, senderResult, updatedRecipientBalance;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                                            where: { id: senderWalletId },
                                            relations: ["user"],
                                        })];
                                    case 1:
                                        senderWallet = _a.sent();
                                        return [4 /*yield*/, transactionalEntityManager.findOne(Wallet_1.Wallet, {
                                                where: { id: recipientWalletId },
                                                relations: ["user"],
                                            })];
                                    case 2:
                                        recipientWallet = _a.sent();
                                        if (!recipientWallet) {
                                            return [2 /*return*/, {
                                                    success: false,
                                                    error: "Recipient wallet not found",
                                                }];
                                        }
                                        referenceId = (0, uuid_1.v4)();
                                        return [4 /*yield*/, this.debitWallet({
                                                transactionalEntityManager: transactionalEntityManager,
                                                amount: amount,
                                                referenceId: referenceId,
                                                wallet: senderWallet,
                                                purpose: transaction_1.TransactionPurpose.TRANSFER,
                                                metadata: { recipientId: recipientWallet.user.id },
                                            })];
                                    case 3:
                                        senderResult = _a.sent();
                                        if (!senderResult.success) {
                                            return [2 /*return*/, { success: false, error: senderResult.error }];
                                        }
                                        return [4 /*yield*/, this.creditWallet({
                                                transactionalEntityManager: transactionalEntityManager,
                                                amount: amount,
                                                referenceId: referenceId,
                                                wallet: recipientWallet,
                                                purpose: transaction_1.TransactionPurpose.TRANSFER,
                                                metadata: { senderId: senderWallet.user.id },
                                            })];
                                    case 4:
                                        updatedRecipientBalance = _a.sent();
                                        return [2 /*return*/, {
                                                success: true,
                                                senderBalance: senderResult.balance,
                                                recipientBalance: updatedRecipientBalance,
                                            }];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return WalletService;
}());
exports.WalletService = WalletService;
//# sourceMappingURL=WalletService.js.map