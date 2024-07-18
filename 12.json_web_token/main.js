import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./usermodel.js";

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
app.get("/accessResource", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }
  const decodedToken = jwt.verify(token, "secretkeyappearshere");
  res.status(200).json({
    success: true,
    data: {
      userId: decodedToken.userId,
      email: decodedToken.email,
    },
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
