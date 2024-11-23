import { connect } from "mongoose";
import { MONGODB_URI } from "./config";

export async function connectDB() {
  try {
    await connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
}
