"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require("express");
var morgan = require("morgan");
var routes_1 = require("./routes");
var errorHandler_1 = require("./middleware/errorHandler");
var app = express();
exports.app = app;
app.use(morgan("tiny"));
app.use(express.json());
app.use("/v1", routes_1.serviceRouter);
app.use(function (req, res) {
    return res.status(505).json({ message: "Bad Request" });
});
app.use(errorHandler_1.errorHandler);
//# sourceMappingURL=app.js.map