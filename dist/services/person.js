"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePersonFromHistoryLogic = exports.updatePersonLogic = exports.getPersonsFromHistoryLogic = exports.getPersonLogic = exports.addPersonLogic = void 0;
const Person_1 = __importDefault(require("../models/Person"));
const History_1 = __importDefault(require("../models/History"));
const helper_1 = require("../helper");
const addPersonLogic = async (values) => {
    const payment = {
        status: "add",
        money: +values.money,
        date: values.date,
        info: values.debtInfo || "",
        sumOfMoney: values.money,
    };
    const allDatas = {
        name: values.name,
        surname: values.surname,
        info: values.personInfo,
        money: values.money,
        mobNumber: values.mobNumber,
        payment: [payment],
        status: "NotInHistory",
    };
    // თუ ისტორიიდან ვამატებ ტიპს, მაშინ ვშლი ისტორიიდან.
    if (values.histroyStatus.status === "history") {
        await (0, exports.removePersonFromHistoryLogic)(values.histroyStatus.id);
    }
    const newPerson = new Person_1.default(allDatas);
    await newPerson.save();
    return newPerson;
};
exports.addPersonLogic = addPersonLogic;
const getPersonLogic = async () => {
    const persons = await Person_1.default.find();
    return persons;
};
exports.getPersonLogic = getPersonLogic;
const getPersonsFromHistoryLogic = async () => {
    const history = await History_1.default.findById("63add4fe312a99c884ab7971");
    return history === null || history === void 0 ? void 0 : history.people;
};
exports.getPersonsFromHistoryLogic = getPersonsFromHistoryLogic;
const updatePersonLogic = async (values) => {
    const person = await Person_1.default.findById(values.id);
    if (!person) {
        throw new Error("შეცდომაა! ასეთი ადამიანი სიაში ვერ ვიპოვე!");
    }
    person.name = values.name;
    person.surname = values.surname;
    person.info = values.personInfo;
    person.mobNumber = values.mobNumber;
    // თუ თანხა იცვლება მხოლოდ მაშინ ხდება იუზერის ფეიმენთებში დამატება როგორც თანხის ედით სტატუსი.
    if (values.money !== person.money) {
        person.money = values.money;
        const date = (0, helper_1.getDate)();
        const payment = {
            status: "edit",
            money: +values.money,
            date: date,
            info: values.updateInfo,
            sumOfMoney: +values.money,
        };
        person.payment.push(payment);
    }
    await person.save();
};
exports.updatePersonLogic = updatePersonLogic;
const removePersonFromHistoryLogic = async (id) => {
    const history = await History_1.default.findById("63add4fe312a99c884ab7971");
    if (!history) {
        throw new Error("eror in totalMonyInHistory!");
    }
    const people = history.people.filter((p) => { var _a; return "_id" in p ? ((_a = p._id) === null || _a === void 0 ? void 0 : _a.toString()) !== id.toString() : true; });
    if (people.length === history.people.length) {
        throw new Error("არ არის ასეთი ადამიანი!");
    }
    history.people = people;
    await history.save();
};
exports.removePersonFromHistoryLogic = removePersonFromHistoryLogic;
