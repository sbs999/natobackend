"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProduct = exports.deleteProduct = exports.updateProduct = exports.checkProductExistence = exports.findProduct = exports.getProducts = exports.createProduct = void 0;
const ProductCategories = __importStar(require("./product-categories.controller"));
const ProductPurchaseLocations = __importStar(require("./product-purchase-locations.controller"));
const products_to_bring_model_1 = __importDefault(require("../../models/products-to-bring/products-to-bring.model"));
const product_statuses_constants_1 = require("../../constants/product-statuses.constants");
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = async (req, res, next) => {
    var _a;
    try {
        const credentials = req.body;
        let category;
        let purchaseLocations;
        if (credentials.category) {
            category = await ProductCategories.CheckCategoryExistence(credentials.category);
        }
        if ((_a = credentials.purchaseLocations) === null || _a === void 0 ? void 0 : _a.length) {
            purchaseLocations =
                await ProductPurchaseLocations.checkPurchaseLocationsExistence(credentials.purchaseLocations);
        }
        const newProduct = new products_to_bring_model_1.default({
            name: credentials.name,
            description: credentials.description,
            category,
            purchaseLocations: purchaseLocations,
            imageUrls: credentials.imageUrls,
        });
        const product = await newProduct.save();
        res.json({ message: "Successfully Created!", product });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res, next) => {
    try {
        const { status } = req.query;
        const filterObject = {};
        if (status) {
            filterObject["status"] = status;
        }
        const products = await products_to_bring_model_1.default.find(filterObject)
            .populate("category purchaseLocations")
            .sort({ updatedAt: -1, createdAt: -1 });
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - 7);
        const productsToDelete = products
            .filter((product) => (product === null || product === void 0 ? void 0 : product.status) && product.lastStatusUpdateAt
            ? [product_statuses_constants_1.ProductStatuses.BROUGHT, product_statuses_constants_1.ProductStatuses.REMOVED].includes(product.status) && new Date(product.lastStatusUpdateAt) < targetDate
            : false)
            .map((product) => new mongoose_1.default.Types.ObjectId(product._id));
        if (productsToDelete.length) {
            // Delete all products, which status is BROUGHT or REMOVED , and they have the status more than 7 days
            await products_to_bring_model_1.default.deleteMany({ _id: { $in: productsToDelete } });
        }
        res.json({ products });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const findProduct = async (id) => {
    try {
        const product = await products_to_bring_model_1.default.findById(id);
        if (!product) {
            return null;
        }
        return product;
    }
    catch (error) {
        return null;
    }
};
exports.findProduct = findProduct;
const checkProductExistence = async (id) => {
    const product = await (0, exports.findProduct)(id);
    if (!product) {
        throw new Error("არ არსებობს ასეთი პროდუქტი!");
    }
    return product;
};
exports.checkProductExistence = checkProductExistence;
const updateProduct = async (req, res, next) => {
    var _a;
    try {
        const credentials = req.body;
        const data = credentials.updateData;
        let category;
        let purchaseLocations;
        let statusUpdateData;
        await (0, exports.checkProductExistence)(credentials.productId);
        if (data.category) {
            category = await ProductCategories.CheckCategoryExistence(data.category);
        }
        if ((_a = data.purchaseLocations) === null || _a === void 0 ? void 0 : _a.length) {
            purchaseLocations =
                await ProductPurchaseLocations.checkPurchaseLocationsExistence(data.purchaseLocations);
        }
        if (credentials.updateData.status) {
            statusUpdateData = {
                status: credentials.updateData.status,
                lastStatusUpdateAt: Date.now(),
            };
        }
        await products_to_bring_model_1.default.updateOne({ _id: credentials.productId }, {
            ...(category ? { category } : {}),
            ...(data.description ? { description: data.description } : {}),
            ...(data.imageUrls ? { imageUrls: data.imageUrls } : {}),
            ...(data.name ? { name: data.name } : {}),
            ...(purchaseLocations ? { purchaseLocations } : {}),
            ...(statusUpdateData ? statusUpdateData : {}),
        });
        const product = await products_to_bring_model_1.default.findById(credentials.productId);
        res.json({
            message: "Successfully Update Product.",
            product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, exports.checkProductExistence)(id);
        await products_to_bring_model_1.default.deleteOne({ _id: id });
        res.json({
            message: "Successfully Delete Product.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
const fetchProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await products_to_bring_model_1.default.findById(id).populate("category purchaseLocations");
        if (!product) {
            throw new Error("პროდუქტი ვერ მოიძებნა.");
        }
        res.json({
            product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.fetchProduct = fetchProduct;
