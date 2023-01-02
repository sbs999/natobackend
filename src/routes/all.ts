import {Router} from "express";
import { addPerson,getPersons,addMoney,payMoney,getPersonsFromHistory,updatePerson,SignIn,getTotalMoney } from "../controllers/all";

const router = Router();

router.post("/signIn",SignIn);
router.post("/addPerson",addPerson);
router.get("/getPerson",getPersons);
router.post("/addMoney",addMoney);
router.post("/payMoney",payMoney);
router.get("/getPersonsFromHistory",getPersonsFromHistory);
router.post("/updatePerson",updatePerson);
router.get("/getTotalMoney",getTotalMoney);
export default router;