"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalMoney = exports.payMoney = exports.addMoney = void 0;
const Person_1 = __importDefault(require("../models/Person"));
const History_1 = __importDefault(require("../models/History"));
const helper_1 = require("../helper");
const addMoney = async (req, res, next) => {
    const money = req.body.money;
    const date = (0, helper_1.getDate)();
    try {
        const person = await Person_1.default.findById(req.body.id);
        if (!person) {
            throw new Error("ასეთი ადამიანი არ არსებობს!");
        }
        person.money += money;
        person.money = +person.money.toFixed(2);
        const payment = {
            status: "add",
            money: +money,
            date: date,
            info: req.body.info || "",
            sumOfMoney: person.money,
        };
        person.payment.push(payment);
        const result = await person.save();
        const totalMonyInHistory = await History_1.default.findById("63add4fe312a99c884ab7971");
        if (!totalMonyInHistory) {
            throw new Error("eror in totalMonyInHistory!");
        }
        totalMonyInHistory.totalMoney += money;
        totalMonyInHistory.totalMoney = +totalMonyInHistory.totalMoney.toFixed(2);
        await totalMonyInHistory.save();
        res.json({ result: result });
    }
    catch (error) {
        next(error);
    }
};
exports.addMoney = addMoney;
const payMoney = async (req, res, next) => {
    const money = req.body.money;
    const date = (0, helper_1.getDate)();
    try {
        const history = await History_1.default.findById("63add4fe312a99c884ab7971");
        if (!history) {
            throw new Error("eror in totalMonyInHistory!");
        }
        const person = await Person_1.default.findById(req.body.id);
        if (!person) {
            throw new Error("ასეთი ადამიანი არ არსებობს!");
        }
        if (money > person.money) {
            throw new Error("არასწორად შეყვანილი თანხა, სცადეთ თავიდან!");
            // ვჩეკავ ფული მეტი ხო არ ჩარიცხა რაც ვალია
        }
        if (money === person.money) {
            // ვჩეკავ ვალს სრულად იხდის თუ არა და თუ სრულად იხდის ვშლი ვალების სიიდან და ვამატებ ისტორიების სიაში.
            history.people.push({
                name: person.name,
                surname: person.surname,
                info: person.info,
                mobNumber: person.mobNumber,
                lastPaymentHistory: person.payment,
            });
            history.totalMoney -= person.money;
            history.totalMoney = +history.totalMoney.toFixed(2);
            await history.save();
            //
            await Person_1.default.findByIdAndDelete(person._id);
            res.json({ result: "succesfully add!" });
            return;
        }
        //  და ბოლოს თუ უბრალოდ ვალის რაღაც ნაწილს იხდის ვაკლებ ვალს ისტრიაშიც და ადამინთან
        person.money -= money;
        person.money = +person.money.toFixed(2);
        const payment = {
            status: "pay",
            money: +money,
            date: date,
            info: req.body.info || "",
            sumOfMoney: person.money,
        };
        person.payment.push(payment);
        const result = await person.save();
        history.totalMoney -= money;
        history.totalMoney = +history.totalMoney.toFixed(2);
        await history.save();
        res.json({ result: result });
    }
    catch (error) {
        next(error);
    }
};
exports.payMoney = payMoney;
const getTotalMoney = async (req, res, next) => {
    try {
        const history = await History_1.default.findById("63add4fe312a99c884ab7971");
        res.json({ totalMoney: history === null || history === void 0 ? void 0 : history.totalMoney });
    }
    catch (error) {
        next(error);
    }
};
exports.getTotalMoney = getTotalMoney;
