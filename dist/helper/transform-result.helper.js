"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformResult = void 0;
const transformResult = (category) => {
    if (Array.isArray(category)) {
        return category.map((category) => modifyResultObject(category));
    }
    return modifyResultObject(category);
};
exports.transformResult = transformResult;
const modifyResultObject = (category) => {
    const { _id, __v, ...rest } = category;
    return { id: _id, ...rest };
};
