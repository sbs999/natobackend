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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const models_constants_1 = require("../../constants/models.constants");
const product_statuses_constants_1 = require("../../constants/product-statuses.constants");
const ProductsToBringSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    imageUrls: {
        type: [String],
        required: false,
    },
    status: {
        type: String,
        enum: Object.values(product_statuses_constants_1.ProductStatuses),
        default: product_statuses_constants_1.ProductStatuses.ACTIVE,
        required: false,
    },
    lastStatusUpdateAt: {
        type: Date,
        default: Date.now(),
        required: false,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: models_constants_1.MODELS.productCategories,
        required: false,
    },
    purchaseLocations: {
        type: [
            { type: mongoose_1.Schema.Types.ObjectId, ref: models_constants_1.MODELS.ProductPurchaseLocations },
        ],
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model(models_constants_1.MODELS.ProductsToBring, ProductsToBringSchema);
