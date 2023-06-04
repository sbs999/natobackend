import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import { postText, getText } from "../controllers/note";

const router = Router();

router.get("/getNote", isAuth, getText);
router.post("/postNote", isAuth, postText);

export default router;
