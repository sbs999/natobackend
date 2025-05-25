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
const models_constants_1 = require("../constants/models.constants");
// Each history entry will now have its own _id field by default
const PriceHistorySchema = new mongoose_1.Schema({
    shopName: {
        type: String,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
const ProductWithPricesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: models_constants_1.MODELS.productCategories,
        required: false,
    },
    history: {
        type: [PriceHistorySchema],
        required: false,
        default: [],
    },
}, {
    timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
});
exports.default = mongoose_1.default.model(models_constants_1.MODELS.ProductsWithHistory, ProductWithPricesSchema);
