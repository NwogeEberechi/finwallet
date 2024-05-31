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
const express = require("express");
const data_source_1 = require("./data-source");
const routes_1 = require("./routes");
const config_1 = require("./config");
const app = express();
app.use(express.json());
app.use("/v1", routes_1.serviceRouter);
app.get("*", (req, res) => {
    res.status(505).json({ message: "Bad Request" });
});
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // start express server
    app.listen(config_1.port);
    console.log(`Express server has started on ${config_1.port}`);
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map