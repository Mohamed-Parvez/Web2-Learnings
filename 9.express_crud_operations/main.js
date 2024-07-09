const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const db = [];

// GET USER
app.get("/", (req, res) => {
  res.status(201).send(db);
});

// POST USER
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

// UPDATE USER
app.put("/users", (req, res) => {
  const { uid, uname, upassword } = req.body;
  if (!uid || !uname || !upassword) {
    res.status(401).send("user not updated");
  } else {
    const findIndex = () => {
      return db.findIndex((value) => value.user_id === uid);
    };
    const getIndex = findIndex();
    db[getIndex].user_name = uname;
    db[getIndex].user_password = upassword;
    res.status(201).send("user updated successfully");
  }
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
