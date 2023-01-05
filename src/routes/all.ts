import {Router} from "express";
import { addPerson,getPersons,addMoney,payMoney,getPersonsFromHistory,updatePerson,SignIn,getTotalMoney } from "../controllers/all";
import isAuth from "../helper/is-auth";
const router = Router();

router.post("/signIn",SignIn);
router.post("/addPerson",isAuth,addPerson);
router.get("/getPerson",isAuth,getPersons);
router.post("/addMoney",isAuth,addMoney);
router.post("/payMoney",isAuth,payMoney);
router.get("/getPersonsFromHistory",isAuth,getPersonsFromHistory);
router.post("/updatePerson",isAuth,updatePerson);
router.get("/getTotalMoney",isAuth,getTotalMoney);
export default router;