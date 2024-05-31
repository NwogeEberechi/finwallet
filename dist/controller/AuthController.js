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
exports.AuthController = void 0;
const dotenv = require("dotenv");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const helpers_1 = require("../helpers/helpers");
dotenv.config();
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!username || !password) {
                    return res
                        .status(400)
                        .json({ message: "username and password required" });
                }
                const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepository.findOne({ where: { username } });
                const isPasswordValid = helpers_1.encrypt.comparepassword(user.password, password);
                if (!user || !isPasswordValid) {
                    return res.status(404).json({ message: "User not found" });
                }
                const token = helpers_1.encrypt.generateToken({ id: user.id });
                return res.status(200).json({
                    message: "Login successful",
                    user: Object.assign(Object.assign({}, user), { password: undefined }),
                    token,
                });
            }
            catch (error) {
                console.error(error);
                return res.status().json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map