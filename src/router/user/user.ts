import fs from "fs-extra";
import express, { Request, Response } from "express";
import { User } from "../../types/types";


const userRouter = express.Router();

userRouter.get("/users", (req: Request, res: Response) => {
    const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r"});
    res.json(JSON.parse(users));
});

userRouter.post("/createUser", (req: Request, res: Response) => {
    const {name, age, userName, email, phoneNumber, password}: User = req.body;

const filePath = "./user.json";

const uniqueId = Math.random();

 let users: User[] = [];

    if (fs.existsSync(filePath)) {
        const existingData = fs.readFileSync(filePath, "utf8");
        if (existingData.trim().length > 0) {
            users = JSON.parse(existingData);
        }
    }

    users.push({
        name,
        age,
        userName,
        email,
        phoneNumber,
        password,
        userId: uniqueId,
    });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.send("User created successfully");
});

userRouter.post("/deleteUser", (req: Request, res: Response) => {
  const { userId } = req.body;
  const existingData = fs.readFileSync("./user.json", "utf8");

  const deletedUser = JSON.parse(existingData).filter(
    (user: any) => user.userId !== userId
  );

  fs.writeFileSync("./user.json", JSON.stringify(deletedUser, null, 2));

  res.json({
    userId,
  });

  res.send("User deleted successfully");
});

userRouter.put("/updateUser", (req: Request, res: Response) => {
  const { name, age, userId }: { name: string; age: number; userId: string } =
    req.body;
  const existingData = fs.readFileSync("./user.json", "utf8");

  const updatedUser = JSON.parse(existingData).map((user: any) => {
    if (user.userId === userId) {
      return { ...user, name: name, age: age };
    }
  });

  fs.writeFileSync("./user.json", JSON.stringify(updatedUser, null, 2));

  res.json(updatedUser);
});

export default userRouter