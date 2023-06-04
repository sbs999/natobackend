import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import * as personFuncs from "../controllers/person";

const router = Router();

router.post("/addPerson", isAuth, personFuncs.addPerson);
router.get("/getPerson", isAuth, personFuncs.getPersons);
router.get("/getPersonsFromHistory", isAuth, personFuncs.getPersonsFromHistory);
router.post("/updatePerson", isAuth, personFuncs.updatePerson);

export default router;
