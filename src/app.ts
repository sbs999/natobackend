import express,{Request,Response,NextFunction} from "express";
import {json} from "body-parser";
import mongoose from "mongoose";
import router from "./routes/all";
const app = express();

app.use(json());
// mongoose.set('strictQuery', false);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
   
  mongoose.connect('mongodb+srv://sabasaba123:sabasaba123@cluster0.5pewmdl.mongodb.net/shop?retryWrites=true&w=majority')
  .then(() => {
      app.listen(8080);
  })

