"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const all_1 = __importDefault(require("./routes/all"));
const app = (0, express_1.default)();
// 
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 
app.use((0, body_parser_1.json)());
// mongoose.set('strictQuery', false);
const portStatus = process.env.PORT ? "https://sbs999.github.io" : "http://localhost:3000";
console.log('process.env.PORT', process.env.PORT);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', portStatus);
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(all_1.default);
app.use((error, req, res, next) => {
    const message = error.message;
    res.status(400).json(message);
});
// const date = {year: new Datje().getFullYear(),month: new Date().getMonth(),day: new Date().getDate(),hour: new Date().getHours(),minute: new Date().getMinutes()};
// console.log(date);
console.log('process.env.MONGODB_URL', process.env.MONGODB_URL);
mongoose_1.default.connect('mongodb+srv://sabasaba123:sabasaba123@cluster0.5pewmdl.mongodb.net/shop?retryWrites=true&w=majority')
    .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port);
});
