"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.default.Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "blog",
});
module.exports = pool;
//# sourceMappingURL=db.js.map