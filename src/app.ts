import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import personsRouter from "./routes/person";
import paymentRouter from "./routes/payment";
import noteRouter from "./routes/note";
import statisticsRouter from "./routes/statistics";
import mediaRouter from "./routes/media.routes";
import productsToBringRouter from "./routes/products-to-bring.routes";
import productsWithPricesRouter from "./routes/products-with-prices.routes";

const app = express();

//
import dotenv from "dotenv";
dotenv.config();
//

app.use(json());
mongoose.set("strictQuery", false);

const portStatus = process.env.PORT
  ? "https://sbs999.github.io"
  : "http://localhost:3000";

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", portStatus);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRouter);
app.use(personsRouter);
app.use(paymentRouter);
app.use(noteRouter);
app.use(statisticsRouter);
app.use("/media", mediaRouter);
app.use("/products-to-bring", productsToBringRouter);
app.use("/products-with-prices", productsWithPricesRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const message = error.message;
  res.status(400).json(message);
});

const mongoUrl = process.env.MONGODB_URL || "";
mongoose.connect(mongoUrl).then((data) => {
  const port = process.env.PORT || 8080;
  app.listen(port);
});
