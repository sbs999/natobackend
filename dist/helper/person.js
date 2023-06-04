"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
const getDate = () => {
    return {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: new Date().getHours() + 4,
        minute: new Date().getMinutes(),
    };
};
exports.getDate = getDate;
