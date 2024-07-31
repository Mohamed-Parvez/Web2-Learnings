import express from "express";
import cors from "cors";
import { config } from "dotenv";
import Connection from "../db/connection.js";
import { Posts, User } from "../db/schema.js";
import AuthMiddleware from "./middleware.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

config();

app.get("/posts", AuthMiddleware, async (req, res) => {
  const getPosts = await Posts.find();
  return res.status(201).json({ getPosts });
});

app.post("/api/createPost", AuthMiddleware, async (req, res) => {
  const { postName, postDescription } = req.body;
  if (!postName || !postDescription) {
    res.status(401).json({
      status: "failed",
      message: "enter postname or post description",
    });
  } else {
    try {
      await Posts.create({
        postName: postName,
        postDescription: postDescription,
      });
      res.status(201).json({
        status: "success",
        message: "post created successully",
      });
    } catch {
      res.json({
        status: "failed",
        message: "post creation failed",
        reason: "check your internet connection",
      });
    }
  }
});

app.delete("/api/deletePost", AuthMiddleware, async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    res.json({
      status: "failed",
      message: "enter post name",
    });
  } else {
    try {
      await Posts.findByIdAndDelete(_id).then(() => {
        res.json({
          status: "success",
          message: "post deleted successfully",
        });
      });
    } catch {
      res.json({
        status: "failed",
        message: "delete post failed",
        reason: "check your internet connection",
      });
    }
  }
});

app.put("/api/updatePost", AuthMiddleware, async (req, res) => {
  const { _id, postName, postDescription } = req.body;
  if (!_id || !postName || !postDescription) {
    res.json({
      status: "failed",
      message: "enter post details",
    });
  } else {
    try {
      await Posts.findByIdAndUpdate(_id, {
        postName: postName,
        postDescription: postDescription,
      }).then(() => {
        res.json({
          status: "success",
          message: "post updated successfully",
        });
      });
    } catch {
      res.json({
        status: "failed",
        message: "something went wrong",
        reason: "check your network connection",
      });
    }
  }
});

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json("plesase enter email or password");
  } else {
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      res.status(401).json("user already exists");
    } else {
      try {
        User.create({
          email: email,
          password: password,
        });
        res.status(201).json({
          status: "Success",
          message: `${email} is created successfully`,
        });
      } catch (err) {
        res.status(401).json(err);
      }
    }
  }
});

app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser || findUser.password !== password) {
    res.status(401).send("email or password is wrong");
  } else {
    const getid = findUser._id;
    try {
      const generate_jwt = jwt.sign({ _id: getid }, process.env.JWT_SECRET);
      res.status(201).json({
        token: generate_jwt,
      });
    } catch (e) {
      res.json(e);
    }
  }
});

app.listen(process.env.PORT, () => {
  Connection();
  console.log(`the server is running on port ${process.env.PORT}`);
});
