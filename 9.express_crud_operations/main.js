const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const db = [
  { user_id: 1, user_name: "faka", user_password: "parvez.me" },
  { user_id: 2, user_name: "raka", user_password: "parvez.me" },
  { user_id: 3, user_name: "jo", user_password: "parvez.me" },
  { user_id: 4, user_name: "ko", user_password: "parvez.me" },
];

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

// DELETE DATA
app.delete("/users", (req, res) => {
  const { uid, uname, upassword } = req.body;
  const findId = () => {
    return db.findIndex((value) => value.user_id === uid);
  };
  const getId = findId();
  if (!uid || !uname || !upassword) {
    res.status(402).send("delete user failed");
  } else {
    db.splice(getId, 1);
    res.status(201).send("user deleted successfully");
  }
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
