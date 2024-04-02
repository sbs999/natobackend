import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import * as ProductsToBringCategories from "../controllers/products-to-bring/product-categories.controller";
import * as ProductPurchaseLocations from "../controllers/products-to-bring/product-purchase-locations.controller";
import * as ProductsToBring from "../controllers/products-to-bring/products-to-bring.controller";

const router = Router();

router.post("/category", ProductsToBringCategories.createCategory);
router.get("/categories", ProductsToBringCategories.getCategories);
router.patch("/category", ProductsToBringCategories.updateProductCategory);
router.delete("/category/:id", ProductsToBringCategories.deleteProductCategory);
router.post(
  "/purchase-location",
  ProductPurchaseLocations.createProductPurchaseLocation
);
router.get(
  "/purchase-locations",
  ProductPurchaseLocations.getProductPurchaseLocations
);
router.patch(
  "/purchase-location",
  ProductPurchaseLocations.updateProductPurchaseLocation
);
router.delete(
  "/purchase-location/:id",
  ProductPurchaseLocations.deleteProductPurchaseLocation
);
router.post("/product", ProductsToBring.createProduct);
router.get("/products", ProductsToBring.getProducts);
router.patch("/product", ProductsToBring.updateProduct);
router.delete("/product/:id", ProductsToBring.deleteProduct);
router.get("/product/:id", ProductsToBring.fetchProduct);

export default router;
