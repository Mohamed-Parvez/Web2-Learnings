import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";
import { Posts, User } from "../db/schema.js";
config();

const AuthMiddleware = async (req, res, next) => {
  const Token = req.headers.authorization;
  const stoken = req.cookies["next-auth.session-token"];
  if (stoken) {
    try {
      const decoded = await decode({
        token: stoken,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const user_data = await User.find({ email: decoded.email });
      const data = user_data[0];
      req._id = data._id.toString();
      next();
    } catch {
      res.json("token verification failed");
    }
  } else {
    try {
      const verifyToken = jwt.verify(Token, process.env.JWT_SECRET);
      req._id = verifyToken._id;
      next();
    } catch {
      res.json("token verification failed");
    }
  }
};

export default AuthMiddleware;
