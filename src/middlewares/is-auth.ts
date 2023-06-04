import jsonWebToken from "jsonwebtoken";
import { RequestHandler } from "express";
import dotenv from "dotenv";

dotenv.config();

const isAuth: RequestHandler = async (req, res, next) => {
  const token = req.get("Authorization");

  try {
    if (!token) {
      throw new Error("error!");
    }
    jsonWebToken.verify(token, process.env.JSON_WEB_TOKEN || "");
  } catch (err) {
    next(err);
  }

  next();
};

export default isAuth;
