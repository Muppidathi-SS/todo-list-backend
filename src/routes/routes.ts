import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { addTodo, getTodos, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/add-todo", addTodo);
router.get("/todos/:userId", getTodos);
router.patch("/todos/:userId/:todoId", updateTodo);
router.patch("/todos/:todoId", updateTodo);

export default router;
