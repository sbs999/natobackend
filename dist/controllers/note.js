"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getText = exports.postText = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const helper_1 = require("../helper");
const postText = async (req, res, next) => {
    try {
        if (!("text" in req.body && typeof req.body.text === "string")) {
            throw new Error("ტექსტი აუცილებელია.");
        }
        const note = await Note_1.default.findById("647c987c365b2d2da9d5735d");
        if (!note) {
            throw new Error("არ არის ასეთი ჩანაწერი.");
        }
        note.text = " " + req.body.text;
        await note.save();
        res.json({ message: "ჩანაწერი წარმატებით შეიქმნა!", text: req.body.text });
    }
    catch (error) {
        next(error);
    }
};
exports.postText = postText;
const getText = async (req, res, next) => {
    try {
        const note = await Note_1.default.findById("647c987c365b2d2da9d5735d");
        if (!note) {
            throw new Error("ჩანაწერი ვერ მოიძებნა.");
        }
        res.json({
            text: note.text.trim(),
            date: (0, helper_1.getDate)(note.updatedAt),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getText = getText;
