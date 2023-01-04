import express,{Request,Response,NextFunction} from "express";
import {json} from "body-parser";
import mongoose from "mongoose";
import router from "./routes/all";
const app = express();
// 
import dotenv from "dotenv";
dotenv.config();
// 
app.use(json());
// mongoose.set('strictQuery', false);
const portStatus = process.env.PORT ? "https://sbs999.github.io" : "http://localhost:3000";
console.log('process.env.PORT',process.env.PORT);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin',portStatus);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use(router);
  app.use((error: Error,req: Request,res: Response,next: NextFunction) => {
    const message = error.message;
    res.status(400).json(message);
  })
  // const date = {year: new Datje().getFullYear(),month: new Date().getMonth(),day: new Date().getDate(),hour: new Date().getHours(),minute: new Date().getMinutes()};
  // console.log(date);
  console.log('process.env.MONGODB_URL',process.env.MONGODB_URL);
  mongoose.connect('mongodb+srv://sabasaba123:sabasaba123@cluster0.5pewmdl.mongodb.net/shop?retryWrites=true&w=majority')
  .then(() => {
    const port = process.env.PORT || 8080;
      app.listen(port);
  })

