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
exports.WalletController = void 0;
var data_source_1 = require("../data-source");
var User_1 = require("../entity/User");
var WalletService_1 = require("../services/WalletService");
var WalletController = /** @class */ (function () {
    function WalletController() {
    }
    WalletController.getBalance = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({
                                where: { id: req[" currentUser"].id },
                                relations: ["wallet"],
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: "User not found." })];
                        }
                        if (!user.wallet) {
                            return [2 /*return*/, res.status(404).json({ message: "No wallet found for user." })];
                        }
                        return [2 /*return*/, res.status(200).json({ balance: user.wallet.balance })];
                }
            });
        });
    };
    WalletController.deposit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var walletService, userId, amount, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletService = new WalletService_1.WalletService();
                        userId = req.params.userId;
                        amount = req.body.amount;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, walletService.deposit(userId, parseFloat(amount))];
                    case 2:
                        result = _a.sent();
                        if (!result.success) {
                            return [2 /*return*/, res.status(404).json({ message: result.error })];
                        }
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Deposit successful.", balance: result.balance })];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ message: "Error processing transaction.", error: error_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WalletController.withdraw = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var walletService, userId, amount, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletService = new WalletService_1.WalletService();
                        userId = req.params.userId;
                        amount = req.body.amount;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, walletService.withdraw(userId, parseFloat(amount))];
                    case 2:
                        result = _a.sent();
                        if (!result.success) {
                            return [2 /*return*/, res.status(404).json({ message: result.error })];
                        }
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: "Withdrawal successful.", balance: result.balance })];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [2 /*return*/, res.status(500).json({
                                message: "Error processing transaction.",
                                error: error_2.message,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WalletController.transfer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var walletService, _a, senderWalletId, recipientWalletId, amount, result, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        walletService = new WalletService_1.WalletService();
                        _a = req.body, senderWalletId = _a.senderWalletId, recipientWalletId = _a.recipientWalletId, amount = _a.amount;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, walletService.transfer(senderWalletId, recipientWalletId, parseFloat(amount))];
                    case 2:
                        result = _b.sent();
                        if (!result.success) {
                            return [2 /*return*/, res.status(400).json({ message: result.error })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: "Transfer successful.",
                                balance: result.senderBalance,
                            })];
                    case 3:
                        error_3 = _b.sent();
                        console.error(error_3);
                        return [2 /*return*/, res.status(500).json({
                                message: "Error processing transaction.",
                                error: error_3.message,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return WalletController;
}());
exports.WalletController = WalletController;
//# sourceMappingURL=WalletController.js.map