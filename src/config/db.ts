import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI;

export const connectDB = async () => {
  await mongoose.connect(`${MONGO_URL}/${process.env.DB_NAME}`);
  console.log("MongoDB Connected Successfully");
};