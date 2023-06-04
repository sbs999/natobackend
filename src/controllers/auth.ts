import { RequestHandler } from "express";
import History from "../models/History";
import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const SignIn: RequestHandler = async (req, res, next) => {
  const password = req.body.password;

  try {
    const history = await History.findById("63add4fe312a99c884ab7971");
    if (!history) {
      throw new Error("eror in totalMonyInHistory!");
    }

    if (history.secPas.toString() === password.toString()) {
      const token = jsonWebToken.sign({}, process.env.JSON_WEB_TOKEN || "");

      res.json({ message: "წარმატებულია!", token: token });
    } else {
      throw new Error("არასწორია პაროლი!");
    }
  } catch (error) {
    next(error);
  }
};
