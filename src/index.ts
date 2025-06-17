import userRouter from "./router/user/user";
import express, { Request, Response } from "express";

const app = express()
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
