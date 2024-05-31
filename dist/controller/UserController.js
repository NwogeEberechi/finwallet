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
exports.UserController = void 0;
var class_transformer_1 = require("class-transformer");
var User_1 = require("../entity/User");
var Wallet_1 = require("../entity/Wallet");
var helpers_1 = require("../helpers/helpers");
var data_source_1 = require("../data-source");
var Transaction_1 = require("../entity/Transaction");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, userRepository, existingUser, encryptedPassword_1, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, userRepository.findOne({
                                where: { username: username },
                            })];
                    case 2:
                        existingUser = _b.sent();
                        if (existingUser) {
                            return [2 /*return*/, res.status(400).json({ message: "Username already exists." })];
                        }
                        return [4 /*yield*/, helpers_1.encrypt.encryptpass(password)];
                    case 3:
                        encryptedPassword_1 = _b.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                var user, wallet, token;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            user = new User_1.User();
                                            user.username = username;
                                            user.password = encryptedPassword_1;
                                            return [4 /*yield*/, transactionalEntityManager.save(user)];
                                        case 1:
                                            _a.sent();
                                            wallet = new Wallet_1.Wallet();
                                            wallet.balance = 0;
                                            wallet.user = user;
                                            return [4 /*yield*/, transactionalEntityManager.save(wallet)];
                                        case 2:
                                            _a.sent();
                                            token = helpers_1.encrypt.generateToken({ id: user.id });
                                            return [2 /*return*/, res.status(200).json({
                                                    message: "User created successfully.",
                                                    token: token,
                                                    username: user.username,
                                                    id: user.id,
                                                    walletId: wallet.id,
                                                })];
                                    }
                                });
                            }); })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [2 /*return*/, res.status(500).json({
                                message: "Error creating user or wallet.",
                                error: error_1.message,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.all = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.find({
                                relations: ["wallet", "wallet.transactions"],
                            })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                data: (0, class_transformer_1.instanceToPlain)(users),
                            })];
                }
            });
        });
    };
    UserController.one = function (request, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        userRepository = data_source_1.AppDataSource.getRepository("User");
                        return [4 /*yield*/, userRepository.findOne({
                                where: { id: id },
                                relations: ["wallet", "wallet.transactions"],
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: "User not registered." })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                data: (0, class_transformer_1.instanceToPlain)(user),
                            })];
                }
            });
        });
    };
    UserController.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, userToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.userId;
                        userRepository = data_source_1.AppDataSource.getRepository("User");
                        return [4 /*yield*/, userRepository.findOneBy({ id: id })];
                    case 1:
                        userToRemove = _a.sent();
                        if (!userToRemove) {
                            return [2 /*return*/, res.status(404).json({ message: "This user does not exist." })];
                        }
                        return [4 /*yield*/, userRepository.remove(userToRemove)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: "user has been removed." })];
                }
            });
        });
    };
    UserController.getUserTransactions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, userRepository, user, wallet, transactionRepository, transactions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userRepository.findOne({
                                where: { id: userId },
                                relations: ["wallet"],
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                        }
                        wallet = user.wallet;
                        if (!wallet) {
                            return [2 /*return*/, res.status(404).json({ message: "Wallet not found" })];
                        }
                        transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
                        return [4 /*yield*/, transactionRepository.find({
                                where: { wallet: { id: wallet.id } },
                            })];
                    case 3:
                        transactions = _a.sent();
                        return [2 /*return*/, res.status(200).json({ transactions: transactions })];
                    case 4:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map