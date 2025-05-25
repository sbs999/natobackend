"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePriceHistory = exports.addPriceHistory = exports.removeProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.addProduct = void 0;
const ProductWithPricesSchema_1 = __importDefault(require("../models/ProductWithPricesSchema"));
const mongoose_1 = require("mongoose");
const addProduct = async (req, res, next) => {
    const { name, description, imageUrl, category } = req.body;
    try {
        if (!name)
            throw new Error("Name is required");
        const product = new ProductWithPricesSchema_1.default({
            name,
            description,
            imageUrl,
            category,
            history: [],
        });
        const result = await product.save();
        res.json({ result });
    }
    catch (error) {
        next(error);
    }
};
exports.addProduct = addProduct;
const getProducts = async (req, res, next) => {
    try {
        const products = await ProductWithPricesSchema_1.default.find().populate("category");
        res.json({ products });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res, next) => {
    try {
        const product = await ProductWithPricesSchema_1.default.findById(req.params.id).populate("category");
        if (!product)
            throw new Error("Product not found");
        res.json({ product });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res, next) => {
    const { id, name, description, imageUrl, category } = req.body;
    try {
        const product = await ProductWithPricesSchema_1.default.findById(id);
        if (!product)
            throw new Error("Product not found");
        if (name !== undefined)
            product.name = name;
        if (description !== undefined)
            product.description = description;
        if (imageUrl !== undefined)
            product.imageUrl = imageUrl;
        if (category !== undefined) {
            if (!mongoose_1.Types.ObjectId.isValid(category)) {
                throw new Error("Invalid category id");
            }
            product.category = new mongoose_1.Types.ObjectId(category);
        }
        const result = await product.save();
        res.json({ result });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const removeProduct = async (req, res, next) => {
    try {
        await ProductWithPricesSchema_1.default.findByIdAndDelete(req.params.id);
        res.json({ result: "Product removed successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.removeProduct = removeProduct;
// PriceHistory controllers
const addPriceHistory = async (req, res, next) => {
    const { productId } = req.params;
    const { shopName, purchasePrice, sellingPrice, description } = req.body;
    try {
        const product = await ProductWithPricesSchema_1.default.findById(productId);
        if (!product)
            throw new Error("Product not found");
        // Push directly, using non-null assertion since schema defines a default
        product.history.push({
            shopName,
            purchasePrice,
            sellingPrice,
            description,
        });
        const result = await product.save();
        res.json({ history: result.history });
    }
    catch (error) {
        next(error);
    }
};
exports.addPriceHistory = addPriceHistory;
const removePriceHistory = async (req, res, next) => {
    const { productId, historyId } = req.params;
    try {
        const product = await ProductWithPricesSchema_1.default.findById(productId);
        if (!product)
            throw new Error("Product not found");
        // Use non-null assertion and Mongoose subdoc removal
        const entry = product.history.id(historyId);
        if (!entry)
            throw new Error("History entry not found");
        entry.remove();
        const result = await product.save();
        res.json({ history: result.history });
    }
    catch (error) {
        next(error);
    }
};
exports.removePriceHistory = removePriceHistory;
