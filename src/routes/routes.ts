import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/add-todo", addTodo);
router.get("/todos/:userId", getTodos);
router.patch("/todos/:userId/:todoId", updateTodo);
router.patch("/todos/:todoId", updateTodo);
router.delete("/delete-todo/:userId/:todoId", deleteTodo);

export default router;
