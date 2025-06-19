import userRouter from "./router/user/user";
import express, { Request, Response } from "express";
import { todoRouter } from "./router/todo/todos.router";

const app = express()
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/", userRouter);
app.use('/todos', todoRouter);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



// const todo = {
//   id: 1,
//   desc: 'hool hiih',
//   isComplete: false
// }
// const tod2 = {
//   id: 2,
//   desc: 'hool hiih',
//   isComplete: false
// }



// const todos = [todo, tod2]

// const updatedTodos = todos.map((todo) => {
//   if (todo.id === 2) {
//     return {
//       ...todo,
//       isComplete: true
//     }
//   }

//   return todo
// })

// console.log("updatedTodos: ", updatedTodos)