"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductPurchaseLocation = void 0;
const product_categories_model_1 = __importDefault(require("../../models/products-to-bring/product-categories.model"));
const createProductPurchaseLocation = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newCategory = new product_categories_model_1.default({ name, description });
        const category = await newCategory.save();
        res.json({
            message: "Successfully Created Product Purchase Location.",
            category: category,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductPurchaseLocation = createProductPurchaseLocation;
