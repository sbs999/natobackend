import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import {
  deleteObject,
  generatePreSignedUrl,
} from "../controllers/media.controller";

const router = Router();

router.get("/generate-pre-signed-url", generatePreSignedUrl);
router.delete("/object/:key", deleteObject);

export default router;
