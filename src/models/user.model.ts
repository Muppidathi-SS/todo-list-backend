import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  isVote: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    isVote: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "check",
  },
);

export const User = mongoose.model<IUser>("User", userSchema);
