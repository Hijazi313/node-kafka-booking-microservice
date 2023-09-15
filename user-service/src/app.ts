import dotenv from "dotenv";
import express from "express";
import config from "config";
import connectToMongoDB from "./utils/connect";
import { envSchema } from "../config/default";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

dotenv.config();
// cons
const app = express();
const PORT = config.get<number>("port");

app.use(express.json());
app.use(deserializeUser);
app.listen(PORT, async () => {
  // TODO WORK ON THIS
  // envSchema.parse({...process.env, PORT:process.env.PORT});
  // log.info("")
  console.log("Users service is running on ", PORT);
  await connectToMongoDB();
  routes(app);
});
