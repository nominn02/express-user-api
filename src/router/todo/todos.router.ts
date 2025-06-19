import express from "express";
import {
    getTodos,
    addTodo,
    getTodoById,
    updateTodo
} from "../../controller/todos.controller";

import { deleteTodo } from "../../controller/todos.controller";

const todoRouter = express.Router()

todoRouter.get('/', getTodos)

todoRouter.post('/', addTodo)

todoRouter.delete('/:todoId', deleteTodo)

todoRouter.get('/:id', getTodoById)

todoRouter.put('/:id', updateTodo)

export { todoRouter };