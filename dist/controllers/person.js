"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerson = exports.getPersonsFromHistory = exports.getPersons = exports.addPerson = void 0;
const Person_1 = __importDefault(require("../models/Person"));
const History_1 = __importDefault(require("../models/History"));
const helper_1 = require("../helper");
const addPerson = async (req, res, next) => {
    const body = req.body;
    const date = (0, helper_1.getDate)();
    const payment = [
        {
            status: "add",
            money: +body.money,
            date: date,
            info: body.debtInfo || "",
            sumOfMoney: body.money,
        },
    ];
    const allDatas = {
        name: body.name,
        surname: body.surname,
        info: body.personInfo,
        money: body.money,
        mobNumber: body.mobNumber,
        payment: payment,
        status: "NotInHistory",
    };
    try {
        const history = await History_1.default.findById("63add4fe312a99c884ab7971");
        if (!history) {
            throw new Error("eror in totalMonyInHistory!");
        }
        // აქ ის ლოგიკაა რო თუ ისტორიიდან ვამატებ ტიპს, მაშინ ვშლი ისტორიიდან./
        if (body.histroyStatus.status === "history") {
            history.people = history.people.filter((p) => {
                var _a;
                return "_id" in p
                    ? ((_a = p._id) === null || _a === void 0 ? void 0 : _a.toString()) !== body.histroyStatus.id.toString()
                    : true;
            });
        }
        const newPerson = new Person_1.default(allDatas);
        const add = await newPerson.save();
        history.totalMoney += body.money;
        history.totalMoney = +history.totalMoney.toFixed(2);
        await history.save();
        res.json({ result: add });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.addPerson = addPerson;
const getPersons = async (req, res, next) => {
    try {
        const api = await Person_1.default.find();
        res.json({ persons: api });
    }
    catch (error) {
        next(error);
    }
};
exports.getPersons = getPersons;
const getPersonsFromHistory = async (req, res, next) => {
    try {
        const history = await History_1.default.findById("63add4fe312a99c884ab7971");
        res.json({ persons: history === null || history === void 0 ? void 0 : history.people });
    }
    catch (error) {
        next(error);
    }
};
exports.getPersonsFromHistory = getPersonsFromHistory;
const updatePerson = async (req, res, next) => {
    const { name, surname, money, updateInfo, personInfo, mobNumber, id } = req.body;
    try {
        const person = await Person_1.default.findById(id);
        if (!person) {
            throw new Error("შეცდომაა! ასეთი ადამიანი სიაში ვერ ვიპოვე!");
        }
        person.name = name;
        person.surname = surname;
        person.info = personInfo;
        person.mobNumber = mobNumber;
        // თუ თანხა იცვლება მხოლოდ მაშინ ხდება მთლიანი თანხის შეცვლა და იუზერის ფეიმენთებში დამატება როგორც თანხის ედით სტატუსი.
        if (money !== person.money) {
            const history = await History_1.default.findById("63add4fe312a99c884ab7971");
            if (!history) {
                throw new Error("eror in totalMonyInHistory!");
            }
            history.totalMoney -= person.money;
            history.totalMoney = +history.totalMoney.toFixed(2);
            history.totalMoney += money;
            history.totalMoney = +history.totalMoney.toFixed(2);
            await history.save();
            person.money = money;
            const date = (0, helper_1.getDate)();
            const payment = {
                status: "edit",
                money: +money,
                date: date,
                info: updateInfo,
                sumOfMoney: +money,
            };
            person.payment.push(payment);
        }
        await person.save();
        res.json({ result: "წარმატებულია!" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePerson = updatePerson;
