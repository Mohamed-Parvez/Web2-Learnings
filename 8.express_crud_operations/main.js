const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const db = [];

app.get("/", (req, res) => {
  res.status(201).send(db);
});

app.post("/users", (req, res) => {
  const { uname, upassword } = req.body;
  if (!uname || !upassword) {
    res.status(401).send("please provide valid username and password");
  } else {
    const data = {
      user_id: db.length + 1,
      user_name: uname,
      user_password: upassword,
    };
    db.push(data);
    res.status(201).send("user created successfully");
  }
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
