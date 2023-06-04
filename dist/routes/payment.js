"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controllers/payment");
const is_auth_1 = __importDefault(require("../middlewares/is-auth"));
const router = (0, express_1.Router)();
router.post("/addMoney", is_auth_1.default, payment_1.addMoney);
router.post("/payMoney", is_auth_1.default, payment_1.payMoney);
router.get("/getTotalMoney", is_auth_1.default, payment_1.getTotalMoney);
exports.default = router;
