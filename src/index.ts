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
