import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(response.connection.host);
  } catch (error) {
    throw new Error(error.message);
  }
};
