"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStatistics = void 0;
const Person_1 = __importDefault(require("../models/Person"));
const History_1 = __importDefault(require("../models/History"));
const fetchStatistics = async (req, res, next) => {
    try {
        const persons = await Person_1.default.find();
        const history = await History_1.default.findById("63add4fe312a99c884ab7971");
        if (!history) {
            throw new Error("error in History!");
        }
        const totalDebt = persons.reduce((acumulator, current) => acumulator + current.money, 0);
        const peopleWithDebt = persons.length;
        const peopleWithoutDebt = history.people.length;
        res.json({
            peopleWithDebt,
            totalDebt: totalDebt.toFixed(2),
            allPeople: peopleWithoutDebt + persons.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.fetchStatistics = fetchStatistics;
