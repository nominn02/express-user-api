import express from "express";
const app = express()
const port = 3000;


app.get('/', (req, res) => {
  res.send({
    name: "testName",
    age: "12",
  });
});

app.post("/api/user", (req, res) => {
    const { name, age } = req.body;
    res.json({ message: `User ${name} with age ${age} created.`})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
