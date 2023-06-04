import { Router } from "express";
import { SignIn } from "../controllers/auth";

const router = Router();

router.post("/signIn", SignIn);

export default router;
