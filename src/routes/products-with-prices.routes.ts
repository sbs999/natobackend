import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import * as productController from "../controllers/products-with-prices.controller";

const router = Router();

router.post("/addProduct", isAuth, productController.addProduct);
router.get("/getProducts", isAuth, productController.getProducts);
router.get("/getProduct/:id", isAuth, productController.getProductById);
router.put("/updateProduct", isAuth, productController.updateProduct);
router.delete("/removeProduct/:id", isAuth, productController.removeProduct);
router.post(
  "/addHistory/:productId",
  isAuth,
  productController.addPriceHistory
);
router.delete(
  "/removeHistory/:productId/:historyId",
  isAuth,
  productController.removePriceHistory
);

export default router;
