"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformProductCategory = void 0;
const transformProductCategory = (category) => {
    if (Array.isArray(category)) {
        return category.map((category) => modifyResultObject(category));
    }
    return modifyResultObject(category);
};
exports.transformProductCategory = transformProductCategory;
const modifyResultObject = (category) => {
    const { _id, __v, ...rest } = category;
    return { id: _id, ...rest };
};
