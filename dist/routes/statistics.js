"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_auth_1 = __importDefault(require("../middlewares/is-auth"));
const statistics_1 = require("../controllers/statistics");
const router = (0, express_1.Router)();
router.get("/statistics", is_auth_1.default, statistics_1.fetchStatistics);
exports.default = router;
