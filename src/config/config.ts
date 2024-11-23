import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/myDatabase";
