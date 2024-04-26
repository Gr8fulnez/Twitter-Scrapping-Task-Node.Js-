"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('postgres://default:aEZ7hAMBVLW2@ep-young-field-a4sxtk9e.us-east-1.postgres.vercel-storage.com:5432/verceldb', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
exports.default = db;
