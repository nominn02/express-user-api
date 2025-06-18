import express from "express";
import { getTodos, addTodo, getTodoById } from "../../controller/todos.controller";

const todoRouter = express.Router()

todoRouter.get('/', getTodos)

todoRouter.post('/add', addTodo)

todoRouter.get('/:id', getTodoById)

export { todoRouter };