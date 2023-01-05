"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const all_1 = require("../controllers/all");
const is_auth_1 = __importDefault(require("../helper/is-auth"));
const router = (0, express_1.Router)();
router.post("/signIn", all_1.SignIn);
router.post("/addPerson", is_auth_1.default, all_1.addPerson);
router.get("/getPerson", is_auth_1.default, all_1.getPersons);
router.post("/addMoney", is_auth_1.default, all_1.addMoney);
router.post("/payMoney", is_auth_1.default, all_1.payMoney);
router.get("/getPersonsFromHistory", is_auth_1.default, all_1.getPersonsFromHistory);
router.post("/updatePerson", is_auth_1.default, all_1.updatePerson);
router.get("/getTotalMoney", is_auth_1.default, all_1.getTotalMoney);
exports.default = router;
