import { Router } from "express";
import { authHandler } from "../middlewares/authHandler.js";
import { todoHandler } from "../middlewares/todoHandler.js";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.route("/todos").post(authHandler, todoHandler, createTodo);
todoRouter.route("/todos").get(authHandler, getTodos);
todoRouter.route("/todos/:todoId").delete(authHandler, deleteTodo);
todoRouter.route("/todos/:todoId").put(authHandler, todoHandler, updateTodo);

export { todoRouter };
