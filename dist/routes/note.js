"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_auth_1 = __importDefault(require("../middlewares/is-auth"));
const note_1 = require("../controllers/note");
const router = (0, express_1.Router)();
router.get("/getNote", is_auth_1.default, note_1.getText);
router.post("/postNote", is_auth_1.default, note_1.postText);
exports.default = router;
