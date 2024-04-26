"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const database_config_1 = __importDefault(require("./config/database.config"));
const Port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
database_config_1.default.sync()
    .then(() => {
    console.log('Database conneted successfully');
})
    .catch((err) => {
    console.log('Error connecting to database');
    console.log(err);
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', user_1.default);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
exports.default = app;
