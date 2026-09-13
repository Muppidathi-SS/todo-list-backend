import { Request, Response } from "express";
import { Todo } from "../models/todo.model";

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { id, taskName } = req.body;

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
      return res.status(404).json({
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
