"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isAuth = async (req, res, next) => {
    const token = req.get("Authorization");
    try {
        if (!token) {
            throw new Error("error!");
        }
        const tokenVerify = await jsonwebtoken_1.default.verify(token, process.env.JSON_WEB_TOKEN || "");
    }
    catch (err) {
        next(err);
    }
    next();
};
exports.default = isAuth;
