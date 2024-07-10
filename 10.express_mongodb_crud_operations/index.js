const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/crud_operations")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model("Users", userSchema);

app.get("/", async (req, res) => {
  const getdata = await Users.find();
  res.status(201).json(getdata);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getdata = await Users.findById(id);
    res.status(201).json(getdata);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

app.post("/api/user", async (req, res) => {
  try {
    await Users.create(req.body);
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteuser = await Users.findByIdAndDelete(id);
    res
      .status(201)
      .json({ data: deleteuser, message: "user deleted successfully" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

app.put("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Users.findByIdAndUpdate(id, req.body);
    res.status(201).json({ message: "user updated successfully" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
