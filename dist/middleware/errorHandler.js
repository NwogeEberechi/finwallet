"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    console.error("Error: ".concat(error.message));
    return res.status(500).json({ message: "Internal server error." });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map