"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenHeaderKey = exports.jwtSecret = exports.postgresDatabase = exports.postgresPassword = exports.postgresUser = exports.postgresUrl = exports.postgresPort = exports.port = void 0;
require("dotenv").config();
exports.port = process.env.PORT || 3000;
exports.postgresPort = process.env.POSTGRES_PORT || 5432;
exports.postgresUrl = process.env.POSTGRES_URL;
exports.postgresUser = process.env.POSTGRES_USER;
exports.postgresPassword = process.env.POSTGRES_PASSWORD;
exports.postgresDatabase = process.env.POSTGRES_DATABASE;
exports.jwtSecret = process.env.JWT_SECRET;
exports.tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//# sourceMappingURL=config.js.map