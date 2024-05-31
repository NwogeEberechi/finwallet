"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Transaction_1 = require("./Transaction");
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Wallet.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Wallet.prototype, "balance", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Wallet.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return User_1.User; }, function (user) { return user.wallet; }),
        __metadata("design:type", User_1.User)
    ], Wallet.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Transaction_1.Transaction; }, function (transaction) { return transaction.wallet; }),
        __metadata("design:type", Array)
    ], Wallet.prototype, "transactions", void 0);
    Wallet = __decorate([
        (0, typeorm_1.Entity)()
    ], Wallet);
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map