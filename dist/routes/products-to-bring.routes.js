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
const express_1 = require("express");
const ProductsToBringCategories = __importStar(require("../controllers/products-to-bring/product-categories.controller"));
const ProductPurchaseLocations = __importStar(require("../controllers/products-to-bring/product-purchase-locations.controller"));
const ProductsToBring = __importStar(require("../controllers/products-to-bring/products-to-bring.controller"));
const router = (0, express_1.Router)();
router.post("/category", ProductsToBringCategories.createCategory);
router.get("/categories", ProductsToBringCategories.getCategories);
router.patch("/category", ProductsToBringCategories.updateProductCategory);
router.delete("/category/:id", ProductsToBringCategories.deleteProductCategory);
router.post("/purchase-location", ProductPurchaseLocations.createProductPurchaseLocation);
router.get("/purchase-locations", ProductPurchaseLocations.getProductPurchaseLocations);
router.patch("/purchase-location", ProductPurchaseLocations.updateProductPurchaseLocation);
router.delete("/purchase-location/:id", ProductPurchaseLocations.deleteProductPurchaseLocation);
router.post("/product", ProductsToBring.createProduct);
router.get("/products", ProductsToBring.getProducts);
router.patch("/product", ProductsToBring.updateProduct);
router.delete("/product/:id", ProductsToBring.deleteProduct);
router.get("/product/:id", ProductsToBring.fetchProduct);
exports.default = router;
