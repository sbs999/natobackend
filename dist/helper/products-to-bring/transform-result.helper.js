"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCategory = void 0;
const transformCategory = (category) => {
    if (Array.isArray(category)) {
        return category.map((category) => modifyCategory(category));
    }
    return modifyCategory(category);
};
exports.transformCategory = transformCategory;
const modifyCategory = (category) => {
    const { _id, __v, ...rest } = category;
    return { id: _id, ...rest };
};
