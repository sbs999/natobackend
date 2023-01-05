import jsonWebToken from "jsonwebtoken";
import { RequestHandler } from "express";
const isAuth: RequestHandler = async (req,res,next) => {
    const token = req.get('Authorization');
    try{
        if(!token) {
            throw new Error("error!");
        }
       const tokenVerify = await jsonWebToken.verify(token,'MyTokenIsVerySafeDontTrySomthingBoolshitBySbsMaster!');
    }catch(err){
       next(err);
    }
    next();
};


export default isAuth