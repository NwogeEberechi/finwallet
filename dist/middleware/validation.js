"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = exports.validateWalletId = exports.validateAmount = exports.validateUserId = void 0;
var express_validator_1 = require("express-validator");
exports.validateUserId = [
    (0, express_validator_1.param)("userId").isUUID().withMessage("Invalid UUID format for userId"),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateAmount = [
    (0, express_validator_1.body)("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be a positive number"),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateWalletId = [
    (0, express_validator_1.body)("senderWalletId")
        .notEmpty().withMessage('No sender wallet id provided.')
        .isUUID()
        .withMessage("Invalid UUID format for senderWalletId"),
    (0, express_validator_1.body)("recipientWalletId")
        .notEmpty().withMessage('No recipient wallet id provided.')
        .isUUID()
        .withMessage("Invalid UUID format for recipientWalletId"),
    (0, express_validator_1.body)("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be a positive number"),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateAuth = [
    (0, express_validator_1.body)('username')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
//# sourceMappingURL=validation.js.map