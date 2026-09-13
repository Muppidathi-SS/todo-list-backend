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
        isCompleted: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  },
);

export const Todo = mongoose.model("Todo", todoSchema);
