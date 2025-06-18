import { Todo } from "../types/types"
import { Request, Response } from "express";
import fs from "fs-extra";

export const todos :Todo[] = []


const getTodos = (req: Request, res: Response) => {
        const todos = fs.readFileSync("./todo.json", { encoding: "utf8", flag: "r"});
    res.json(JSON.parse(todos))
}

const addTodo = (req: Request, res: Response) => {
    const { desc } = req.body

      const filePath = "./todo.json";
  const id = Math.random();

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf8");
    if (existingData.trim().length > 0) {
      todo:String = JSON.parse(existingData);
    }
  }
  todos.push({
    id,
    desc,
    isComplete: false,
  });

    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

  res.send("Successfully created todos");
};

const getTodoById = (req: Request, res: Response) => {
    const { id } = req.params
    const todo = todos.find((todo) => todo.id === Number(id))

    if (!todo) {
        res.json({ success: false, message: 'not found todo' })
    }
    res.json({ todo })
}

export  {
    getTodoById, getTodos, addTodo
}


