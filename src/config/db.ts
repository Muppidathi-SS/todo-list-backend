import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/todo-list";

export const connectDB = async () => {
  await mongoose.connect(MONGO_URL);

  console.log("MongoDB Connected Successfully");
};