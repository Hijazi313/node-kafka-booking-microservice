import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./datasources/mongo.datasource";
// import { envSchema } from "../config/default";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

import config from "./config/default";
import GlobalErrorHandler from "./controllers/error.controller";
// cons
const app = express();
const PORT = config.port;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.listen(PORT, async () => {
  // TODO WORK ON THIS
  // envSchema.parse({...process.env, PORT:process.env.PORT});
  // log.info("")
  console.log("Users service is running on ", PORT);
  await connectToMongoDB();
  routes(app);
  app.use(GlobalErrorHandler);
});
