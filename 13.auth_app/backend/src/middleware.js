import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

config();

const AuthMiddleware = async (req, res, next) => {
  const Token = req.headers.authorization;
  const stoken = req.cookies["next-auth.session-token"];
  if (Token) {
    try {
      const verifyToken = jwt.verify(Token, process.env.JWT_SECRET);
      req._id = verifyToken._id;
      next();
    } catch {
      res.json("token verification failed");
    }
  } else {
    try {
      const decoded = await decode({
        token: stoken,
        secret: process.env.NEXTAUTH_SECRET,
      });
      console.log(decoded);
      req.email = decoded.email;
      next();
    } catch {
      res.json("token verification failed");
    }
  }
};

export default AuthMiddleware;
