"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
const History_1 = __importDefault(require("../models/History"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SignIn = async (req, res, next) => {
    const password = req.body.password;
    try {
        const history = await History_1.default.findById("63add4fe312a99c884ab7971");
        if (!history) {
            throw new Error("eror in totalMonyInHistory!");
        }
        if (history.secPas.toString() === password.toString()) {
            const token = jsonwebtoken_1.default.sign({}, process.env.JSON_WEB_TOKEN || "");
            res.json({ message: "წარმატებულია!", token: token });
        }
        else {
            throw new Error("არასწორია პაროლი!");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.SignIn = SignIn;
