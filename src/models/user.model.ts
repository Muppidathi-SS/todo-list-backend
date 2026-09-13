import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  userEmail: string;
  userPassword: string;
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

export const User = mongoose.model<IUser>("User", userSchema);