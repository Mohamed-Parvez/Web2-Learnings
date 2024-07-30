import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema(
  {
    postName: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model("posts", PostsSchema);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", UserSchema);
