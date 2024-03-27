import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import { generatePreSignedUrl } from "../controllers/media.controller";

const router = Router();

router.get("/generate-pre-signed-url", isAuth, generatePreSignedUrl);

export default router;
