import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import { fetchStatistics } from "../controllers/statistics";

const router = Router();

router.get("/statistics", isAuth, fetchStatistics);

export default router;
