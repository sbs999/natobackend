"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCategory = exports.CheckCategoryExistence = exports.findCategory = exports.getCategories = exports.updateProductCategory = exports.createCategory = void 0;
const product_categories_model_1 = __importDefault(require("../../models/products-to-bring/product-categories.model"));
const createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newCategory = new product_categories_model_1.default({ name, description });
        const category = await newCategory.save();
        res.json({
            message: "Successfully Created Category.",
            category: category,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const updateProductCategory = async (req, res, next) => {
    try {
        const { id, updateData } = req.body;
        await (0, exports.CheckCategoryExistence)(id);
        console.log("Debugging log", {
            ...(updateData.name ? { name: updateData.name } : {}),
            ...(typeof (updateData === null || updateData === void 0 ? void 0 : updateData.description) === "string"
                ? { description: updateData.description }
                : {}),
        });
        await product_categories_model_1.default.updateOne({ _id: id }, {
            ...(updateData.name ? { name: updateData.name } : {}),
            ...(typeof (updateData === null || updateData === void 0 ? void 0 : updateData.description) === "string"
                ? { description: updateData.description }
                : {}),
        });
        const updatedCategory = await (0, exports.findCategory)(id);
        res.json({
            message: "Successfully Update Product Category.",
            category: updatedCategory,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductCategory = updateProductCategory;
const getCategories = async (req, res, next) => {
    try {
        const categories = await product_categories_model_1.default.find();
        res.json({
            categories: categories,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategories = getCategories;
const findCategory = async (id) => {
    try {
        const category = await product_categories_model_1.default.findById(id);
        if (!category) {
            return null;
        }
        return category;
    }
    catch (error) {
        return null;
    }
};
exports.findCategory = findCategory;
const CheckCategoryExistence = async (categoryId) => {
    const category = await (0, exports.findCategory)(categoryId);
    if (!category) {
        throw new Error("არასწორი კატეგორია!");
    }
    return category;
};
exports.CheckCategoryExistence = CheckCategoryExistence;
const deleteProductCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, exports.CheckCategoryExistence)(id);
        await product_categories_model_1.default.deleteOne({ _id: id });
        res.json({
            message: "Successfully Delete Product Category.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProductCategory = deleteProductCategory;
