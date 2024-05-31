"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPurpose = exports.TransactionStatus = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["FAILED"] = "failed";
    TransactionStatus["DECLINED"] = "declined";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransactionPurpose;
(function (TransactionPurpose) {
    TransactionPurpose["DEPOSIT"] = "deposit";
    TransactionPurpose["WITHDRAWAL"] = "withdrawal";
    TransactionPurpose["TRANSFER"] = "transfer";
    TransactionPurpose["REFUND"] = "refund";
})(TransactionPurpose = exports.TransactionPurpose || (exports.TransactionPurpose = {}));
//# sourceMappingURL=transaction.js.map