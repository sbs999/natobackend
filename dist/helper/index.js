"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
const getDate = (date) => {
    return {
        year: date ? date.getFullYear() : new Date().getFullYear(),
        month: date ? date.getMonth() : new Date().getMonth(),
        day: date ? date.getDate() : new Date().getDate(),
        hour: date ? date.getHours() : new Date().getHours() + 4,
        minute: date ? date.getMinutes() : new Date().getMinutes(),
    };
};
exports.getDate = getDate;
