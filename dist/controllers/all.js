"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalMoney = exports.SignIn = exports.updatePerson = exports.getPersonsFromHistory = exports.payMoney = exports.addMoney = exports.getPersons = exports.addPerson = void 0;
const Person_1 = __importDefault(require("../models/Person"));
const History_1 = __importDefault(require("../models/History"));
const addPerson = async (req, res, next) => {
    const { name, surname, personInfo, debtInfo, money, mobNumber, histroyStatus } = req.body;
    const date = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate(), hour: new Date().getHours() + 4, minute: new Date().getMinutes() };
    const payment = [{ status: "add", money: +money, date: date, info: debtInfo || "", sumOfMoney: money }];
    const allDatas = { name: name, surname: surname, info: personInfo, money: money, mobNumber: mobNumber, payment: payment, status: "NotInHistory" };
    try {
        const history = await History_1.default.findById('63add4fe312a99c884ab7971');
        if (!history) {
            throw new Error("eror in totalMonyInHistory!");
        }
        if (histroyStatus.status === "history") {
            history.people = history.people.filter(p => { var _a; return "_id" in p ? ((_a = p._id) === null || _a === void 0 ? void 0 : _a.toString()) !== histroyStatus.id.toString() : true; });
        }
        const newPerson = new Person_1.default(allDatas);
        const add = await newPerson.save();
        // 
        history.totalMoney += money;
        history.totalMoney = +history.totalMoney.toFixed(2);
        await history.save();
        //  
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
const addMoney = async (req, res, next) => {
    const money = req.body.money;
    const date = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate(), hour: new Date().getHours(), minute: new Date().getMinutes() };
    try {
        const person = await Person_1.default.findById(req.body.id);
        if (!person) {
            throw new Error("ასეთი ადამიანი არ არსებობს!");
        }
        person.money += money;
        person.money = +person.money.toFixed(2);
        const payment = { status: "add", money: +money, date: date, info: req.body.info || "", sumOfMoney: person.money };
        person.payment.push(payment);
        const result = await person.save();
        // 
        const totalMonyInHistory = await History_1.default.findById('63add4fe312a99c884ab7971');
        if (!totalMonyInHistory) {
            throw new Error("eror in totalMonyInHistory!");
        }
        totalMonyInHistory.totalMoney += money;
        totalMonyInHistory.totalMoney = +totalMonyInHistory.totalMoney.toFixed(2);
        await totalMonyInHistory.save();
        //  
        res.json({ result: result });
    }
    catch (error) {
        next(error);
    }
};
exports.addMoney = addMoney;
const payMoney = async (req, res, next) => {
    const money = req.body.money;
    const date = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate(), hour: new Date().getHours(), minute: new Date().getMinutes() };
    try {
        const history = await History_1.default.findById('63add4fe312a99c884ab7971');
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
            // 
            history.people.push({ name: person.name, surname: person.surname, info: person.info, mobNumber: person.mobNumber, lastPaymentHistory: person.payment });
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
        const payment = { status: "pay", money: +money, date: date, info: req.body.info || "", sumOfMoney: person.money };
        person.payment.push(payment);
        const result = await person.save();
        // 
        history.totalMoney -= money;
        history.totalMoney = +history.totalMoney.toFixed(2);
        await history.save();
        // 
        res.json({ result: result });
    }
    catch (error) {
        next(error);
    }
};
exports.payMoney = payMoney;
const getPersonsFromHistory = async (req, res, next) => {
    try {
        const history = await History_1.default.findById('63add4fe312a99c884ab7971');
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
        if (money !== person.money) {
            const history = await History_1.default.findById('63add4fe312a99c884ab7971');
            if (!history) {
                throw new Error("eror in totalMonyInHistory!");
            }
            history.totalMoney -= person.money;
            history.totalMoney = +history.totalMoney.toFixed(2);
            history.totalMoney += money;
            history.totalMoney = +history.totalMoney.toFixed(2);
            await history.save();
            // 
            person.money = money;
            const date = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate(), hour: new Date().getHours(), minute: new Date().getMinutes() };
            const payment = { status: "edit", money: +money, date: date, info: updateInfo, sumOfMoney: +money };
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
const SignIn = async (req, res, next) => {
    const password = req.body.password;
    try {
        const history = await History_1.default.findById('63add4fe312a99c884ab7971');
        if (!history) {
            throw new Error("eror in totalMonyInHistory!");
        }
        if (history.secPas.toString() === password.toString()) {
            res.json({ message: "წარმატებულია!" });
        }
        else {
            throw new Error("არასწორია პაროლი!");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.SignIn = SignIn;
const getTotalMoney = async (req, res, next) => {
    try {
        const history = await History_1.default.findById('63add4fe312a99c884ab7971');
        res.json({ totalMoney: history === null || history === void 0 ? void 0 : history.totalMoney });
    }
    catch (error) {
        next(error);
    }
};
exports.getTotalMoney = getTotalMoney;
