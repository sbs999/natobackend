"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePersonFromHistory = exports.updatePerson = exports.getPersonsFromHistory = exports.getPersons = exports.addPerson = void 0;
const helper_1 = require("../helper");
const service = __importStar(require("../services/person"));
const addPerson = async (req, res, next) => {
    const body = req.body;
    const date = (0, helper_1.getDate)();
    try {
        const newPerson = await service.addPersonLogic({ ...body, date });
        res.json({ result: newPerson });
    }
    catch (eror) {
        next(eror);
    }
};
exports.addPerson = addPerson;
const getPersons = async (req, res, next) => {
    try {
        const persons = await service.getPersonLogic();
        res.json({ persons });
    }
    catch (error) {
        next(error);
    }
};
exports.getPersons = getPersons;
const getPersonsFromHistory = async (req, res, next) => {
    try {
        const persons = await service.getPersonsFromHistoryLogic();
        res.json({ persons });
    }
    catch (error) {
        next(error);
    }
};
exports.getPersonsFromHistory = getPersonsFromHistory;
const updatePerson = async (req, res, next) => {
    const body = req.body;
    try {
        await service.updatePersonLogic(body);
        res.json({ result: "წარმატებულია!" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePerson = updatePerson;
const removePersonFromHistory = async (req, res, next) => {
    const id = req.params.id;
    try {
        await service.removePersonFromHistoryLogic(id);
        res.json({ message: "delete successfuly!" });
    }
    catch (error) {
        next(error);
    }
};
exports.removePersonFromHistory = removePersonFromHistory;
