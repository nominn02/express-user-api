import { Todo, User } from "../types/types"
import { Request, Response } from "express";
import fs from "fs-extra";

export const todos: Todo[] = []


export const getTodos = (req: Request, res: Response) => {
  const todos = fs.readFileSync("./todo.json", { encoding: "utf8", flag: "r" });
  res.json(JSON.parse(todos))
}


export const addTodo = (req: Request, res: Response) => {
  const { desc } = req.body

  const filePath = "./todo.json";
  const id = Math.random();
  let todos: Todo[] = [];
  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf8").trim();
    if (existingData.length > 0) {
      todos = JSON.parse(existingData);
    }
  }
  const newTodo: Todo = ({
    id,
    desc,
    isComplete: false,
  });
  todos.push(newTodo);

  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

  res.send("Successfully created todos");
};


export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const existingData = fs.readFileSync("./todo.json", "utf8").trim();

  if (!existingData) {
    res.status(404).json({ success: false, message: "No todos found" });
    return
  }

  const todos: Todo[] = JSON.parse(existingData);
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    res.status(404).json({ success: false, message: "Todo not found" });
    return
  }

  res.json({ success: true, todo })
};


export const deleteTodo = (req: Request, res: Response) => {
  const { todoId } = req.params;

  const existingData = fs.readFileSync("./todo.json", "utf8").trim();

  const todos: Todo[] = JSON.parse(existingData)

  const updatedTodos = todos.filter(todo => todo.id !== Number(todoId));

  const stringifyTodos = JSON.stringify(updatedTodos, null, 2);

  fs.writeFileSync("./todo.json", stringifyTodos);

  res.json({ message: "User deleted successfully", todoId });
};


export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { desc, isComplete } = req.body;

  const existingData = fs.readFileSync("./todo.json", "utf8").trim();

  const todos: Todo[] = JSON.parse(existingData)

  const updatedTodos = todos.map(todo => {
    if (todo.id === Number(id)) {
      return {
        id: Number(id),
        desc,
        isComplete
      }
    } else {
      return todo
    }
  });

  const stringifyTodos = JSON.stringify(updatedTodos, null, 2);

  fs.writeFileSync("./todo.json", stringifyTodos);

  res.json({ message: "User deleted successfully", id });
};


