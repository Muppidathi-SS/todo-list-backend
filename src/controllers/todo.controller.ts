import { Request, Response } from "express";
import mongoose from "mongoose";
import { Todo } from "../models/todo.model";

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { id, taskName, isCompleted = false } = req.body;

    if (!id || !taskName) {
      return res.status(400).json({
        message: "User ID and task name are required",
      });
    }

    const todo = await Todo.findOneAndUpdate(
      { userId: id },
      {
        $push: {
          todos: {
            taskName: taskName,
            isCompleted: typeof isCompleted === "boolean" ? isCompleted : false,
            createdAt: new Date(),
          },
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      },
    );

    return res.status(201).json({
      message: "Todo added successfully",
      todo,
    });
  } catch (error) {
    console.error("Add Todo Error:", error);

    return res.status(500).json({
      message: "Failed to add todo",
    });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const todo = await Todo.findOne({ userId });

    if (!todo) {
      return res.status(200).json({
        message: "No todos found for this user",
        todos: [],
      });
    }

    return res.status(200).json({
      message: "Todos fetched successfully",
      todos: todo.todos,
    });
  } catch (error) {
    console.error("Get Todos Error:", error);

    return res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || req.body.userId || req.body.id;
    const todoId = req.params.todoId || req.body.todoId || req.body._id;
    const { isCompleted } = req.body;

    if (!todoId) {
      return res.status(400).json({
        message: "Todo ID is required",
      });
    }

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid User ID format",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({
        message: "Invalid Todo ID format",
      });
    }

    const completed =
      typeof isCompleted === "boolean"
        ? isCompleted
        : isCompleted === "true" || isCompleted === true;

    const query: Record<string, any> = {
      "todos._id": todoId,
    };
    if (userId) {
      query.userId = userId;
    }

    const todo = await Todo.findOneAndUpdate(
      query,
      {
        $set: {
          "todos.$.isCompleted": completed,
        },
      },
      {
        new: true,
        returnDocument: "after",
      },
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.error("Update Todo Error:", error);

    return res.status(500).json({
      message: "Failed to update todo",
    });
  }
};
