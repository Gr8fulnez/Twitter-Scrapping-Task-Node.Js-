"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserValidator = joi_1.default.object().keys({
    fullName: joi_1.default.string().trim().required(),
    username: joi_1.default.string().trim().required(),
    password: joi_1.default.string().required().min(4),
    confirmPassword: joi_1.default.any().equal(joi_1.default.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
}).with('password', 'confirmPassword');
exports.options = {
    abortEarly: false,
    errors: {
        wrap: { label: "" },
    },
};
