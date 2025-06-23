import userRouter from "./router/user/user";
import express, { Request, Response } from "express";
import { todoRouter } from "./router/todo/todos.router";
import { Db, MongoClient } from "mongodb";

const app = express()
const port = 3000;

app.use(express.json());



let db: Db
const uri =
  "mongodb+srv://naominominb:wTOgbQilmgOSMc8q@cluster0.fzdkvnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    console.log("DATABASE CONNECTED");
    return client;
  } catch (error) {
    return error;
  }
};

app.get("/", async (req: Request, res: Response) => {
  const responses = db.collection("users").find()
  const users = await responses.toArray()
  res.json(users)
})

app.post("/addUser", async (req: Request, res: Response) => {
  try {
    const response = db
      .collection("users")
      .insertOne({ name: "John Doe", age: 33 });

    res.json((await response).insertedId.getTimestamp());
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, async () => {
  await connectDb();

  console.log(`Example app listening on port http://localhost:${port}`)
})






// app.get("/", (req: Request, res: Response) => {

// });

// app.use("/", userRouter);
// app.use('/todos', todoRouter);










































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