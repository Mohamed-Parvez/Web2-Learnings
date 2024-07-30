import mongoose from "mongoose";
import { config } from "dotenv";
config();

const Connection = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db connected successfully");
  });
};

export default Connection;
