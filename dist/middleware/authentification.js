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
exports.authentification = void 0;
const config_1 = require("../config");
const helpers_1 = require("../helpers/helpers");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const authentification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers[config_1.tokenHeaderKey];
        if (!header) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = helpers_1.encrypt.verifyToken(token);
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        req[" currentUser"] = decode;
        const user = yield userRepository.findOne({
            where: { id: req[" currentUser"].id },
        });
        if (!user) {
            return res.status(401).json({ message: "User does not exist or token has expired." });
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});
exports.authentification = authentification;
//# sourceMappingURL=authentification.js.map