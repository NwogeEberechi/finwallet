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
exports.Transaction = void 0;
var typeorm_1 = require("typeorm");
var Wallet_1 = require("./Wallet");
var transaction_1 = require("../interfaces/transaction");
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Transaction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: transaction_1.TransactionType }),
        __metadata("design:type", String)
    ], Transaction.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: transaction_1.TransactionStatus,
            default: transaction_1.TransactionStatus.PENDING,
        }),
        __metadata("design:type", String)
    ], Transaction.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: transaction_1.TransactionPurpose }),
        __metadata("design:type", String)
    ], Transaction.prototype, "purpose", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", default: function () { return "uuid_generate_v4()"; } }),
        __metadata("design:type", String)
    ], Transaction.prototype, "referenceId", void 0);
    __decorate([
        (0, typeorm_1.Column)("json", { nullable: true }),
        __metadata("design:type", Object)
    ], Transaction.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Transaction.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Wallet_1.Wallet; }, function (wallet) { return wallet.transactions; }),
        __metadata("design:type", Wallet_1.Wallet)
    ], Transaction.prototype, "wallet", void 0);
    Transaction = __decorate([
        (0, typeorm_1.Entity)()
    ], Transaction);
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map