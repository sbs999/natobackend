import {Router} from "express";
import { addPerson,getPersons,addMoney,payMoney,getPersonsFromHistory,updatePerson } from "../controllers/all";

const router = Router();

router.post("/addPerson",addPerson);
router.get("/getPerson",getPersons);
router.post("/addMoney",addMoney);
router.post("/payMoney",payMoney);
router.get("/getPersonsFromHistory",getPersonsFromHistory);
router.post("/updatePerson",updatePerson);
export default router;