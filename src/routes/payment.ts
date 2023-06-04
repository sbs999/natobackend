import { Router } from "express";
import { addMoney, payMoney, getTotalMoney } from "../controllers/payment";
import isAuth from "../middlewares/is-auth";

const router = Router();

router.post("/addMoney", isAuth, addMoney);
router.post("/payMoney", isAuth, payMoney);
router.get("/getTotalMoney", isAuth, getTotalMoney);

export default router;
