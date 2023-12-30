import { info } from "console";
import mongoose from "mongoose";
import config from "../config/default";

export default async function connectToMongoDB() {
  // const MONGO_URI = config.get<string>("mongoUri");
  const MONGO_URI = config.mongoUri;
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    info("Connected to DBi");
  } catch (err) {
    console.error(err);
    console.error("Could not connect to db");
    process.exit(1);
  }
}
