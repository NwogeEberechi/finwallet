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
exports.UserController = void 0;
const class_transformer_1 = require("class-transformer");
const User_1 = require("../entity/User");
const Wallet_1 = require("../entity/Wallet");
const helpers_1 = require("../helpers/helpers");
const data_source_1 = require("../data-source");
const Transaction_1 = require("../entity/Transaction");
class UserController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                return res
                    .status(400)
                    .json({ message: "username and password required." });
            }
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            try {
                const existingUser = yield userRepository.findOne({
                    where: { username },
                });
                if (existingUser) {
                    return res.status(400).json({ message: "Username already exists." });
                }
                const encryptedPassword = yield helpers_1.encrypt.encryptpass(password);
                yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    const user = new User_1.User();
                    user.username = username;
                    user.password = encryptedPassword;
                    yield transactionalEntityManager.save(user);
                    const wallet = new Wallet_1.Wallet();
                    wallet.balance = 0;
                    wallet.user = user;
                    yield transactionalEntityManager.save(wallet);
                    const token = helpers_1.encrypt.generateToken({ id: user.id });
                    return res.status(200).json({
                        message: "User created successfully.",
                        token,
                        username: user.username,
                        id: user.id,
                        walletId: wallet.id,
                    });
                }));
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Error creating user or wallet.",
                    error: error.message,
                });
            }
        });
    }
    static all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            const users = yield userRepository.find({
                relations: ["wallet", "wallet.transactions"],
            });
            return res.status(200).json({
                data: (0, class_transformer_1.instanceToPlain)(users),
            });
        });
    }
    static one(request, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const userRepository = data_source_1.AppDataSource.getRepository("User");
            const user = yield userRepository.findOne({
                where: { id },
                relations: ["wallet", "wallet.transactions"],
            });
            if (!user) {
                return res.status(404).json({ message: "User not registered." });
            }
            return res.status(200).json({
                data: (0, class_transformer_1.instanceToPlain)(user),
            });
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.userId;
            const userRepository = data_source_1.AppDataSource.getRepository("User");
            let userToRemove = yield userRepository.findOneBy({ id });
            if (!userToRemove) {
                return res.status(404).json({ message: "This user does not exist." });
            }
            yield userRepository.remove(userToRemove);
            return res.status(200).json({ message: "user has been removed." });
        });
    }
    static getUserTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
            try {
                const user = yield userRepository.findOne({
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
                const transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
                const transactions = yield transactionRepository.find({
                    where: { wallet: { id: wallet.id } },
                });
                return res.status(200).json({ transactions });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map