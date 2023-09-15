import config from "config";
import { info } from "console";
import mongoose from "mongoose";

export default async function connectToMongoDB() {
  //   console.log(process.env);
  const MONGO_URI = config.get<string>("mongoUri");
  //   console.log(MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    info("Connected to DB");
  } catch (err) {
    console.error("Could not connect to db");
    process.exit(1);
  }
}
