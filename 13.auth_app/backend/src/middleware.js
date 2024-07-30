import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  const Token = req.headers.authorization;
  if (!Token) {
    res.json("token not found");
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
