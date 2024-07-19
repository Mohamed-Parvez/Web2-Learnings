import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./usermodel.js";
import Authenticate from "./middleware.js";

const app = express();

app.use(express.json());

// login
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (!existingUser || existingUser.password != password) {
    res.json("wrong user");
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
    },
    "secretkeyappearshere",
    { expiresIn: "1h" }
  );
  res.status(200).json({ token: token });
});

// sign up
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = User({
    name,
    email,
    password,
  });
  await newUser.save();
  const token = jwt.sign(
    {
      userId: newUser.id,
      email: newUser.email,
    },
    "secretkeyappearshere",
    { expiresIn: "1h" }
  );
  res.status(201).json({ token: token });
});

// protected route
app.get("/accessResource", Authenticate, (req, res) => {
  res.json("you are here at protected route");
});

// protected route
app.get("/parvezdata", Authenticate, (req, res) => {
  res.json({
    name: "parvez",
    isLegend: true,
  });
});

//Connecting to the database
mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    app.listen("3000", () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error Occurred");
  });
