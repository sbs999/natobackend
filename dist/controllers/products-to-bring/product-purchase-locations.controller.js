"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductPurchaseLocation = exports.findPurchaseLocation = exports.checkPurchaseLocationsExistence = exports.findPurchaseLocationsByLocationIds = exports.getProductPurchaseLocations = exports.createProductPurchaseLocation = exports.updateProductPurchaseLocation = void 0;
const product_purchase_locations_model_1 = __importDefault(require("../../models/products-to-bring/product-purchase-locations.model"));
const updateProductPurchaseLocation = async (req, res, next) => {
    try {
        const { id, updateData } = req.body;
        const location = await (0, exports.findPurchaseLocation)(id);
        if (!location) {
            throw new Error("არასწორი ლოკაცია.");
        }
        await product_purchase_locations_model_1.default.updateOne({ _id: id }, {
            ...(updateData.name ? { name: updateData.name } : {}),
            ...(typeof (updateData === null || updateData === void 0 ? void 0 : updateData.description) === "string"
                ? { description: updateData.description }
                : {}),
        });
        const updatedLocation = await product_purchase_locations_model_1.default.findById(id);
        res.json({
            message: "Successfully Update Product Purchase Location.",
            location: updatedLocation,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductPurchaseLocation = updateProductPurchaseLocation;
const createProductPurchaseLocation = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newLocation = new product_purchase_locations_model_1.default({ name, description });
        const location = await newLocation.save();
        res.json({
            message: "Successfully Created Product Purchase Location.",
            location,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductPurchaseLocation = createProductPurchaseLocation;
const getProductPurchaseLocations = async (req, res, next) => {
    try {
        const locations = await product_purchase_locations_model_1.default.find();
        res.json({
            locations,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductPurchaseLocations = getProductPurchaseLocations;
const findPurchaseLocationsByLocationIds = async (ids) => {
    try {
        const locations = await product_purchase_locations_model_1.default.find({
            _id: { $in: ids },
        });
        if (!locations) {
            return null;
        }
        return locations;
    }
    catch (error) {
        return null;
    }
};
exports.findPurchaseLocationsByLocationIds = findPurchaseLocationsByLocationIds;
const checkPurchaseLocationsExistence = async (purchase_locations) => {
    const purchaseLocations = await (0, exports.findPurchaseLocationsByLocationIds)(purchase_locations);
    if (!(purchaseLocations === null || purchaseLocations === void 0 ? void 0 : purchaseLocations.length)) {
        throw new Error("არასწორი ლოკაცია!");
    }
    return purchaseLocations;
};
exports.checkPurchaseLocationsExistence = checkPurchaseLocationsExistence;
const findPurchaseLocation = async (id) => {
    try {
        const location = await product_purchase_locations_model_1.default.findById(id);
        if (!location) {
            return null;
        }
        return location;
    }
    catch (error) {
        return null;
    }
};
exports.findPurchaseLocation = findPurchaseLocation;
const deleteProductPurchaseLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const location = await (0, exports.findPurchaseLocation)(id);
        if (!location) {
            throw new Error("არასწორი ლოკაცია.");
        }
        await product_purchase_locations_model_1.default.deleteOne({ _id: id });
        res.json({
            message: "Successfully Delete Product Purchase Location.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProductPurchaseLocation = deleteProductPurchaseLocation;
