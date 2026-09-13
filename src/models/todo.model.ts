import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    todos: [
      {
        taskName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);