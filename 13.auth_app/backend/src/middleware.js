import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  const getToken = req.headers.authorization;
  const splitToken = getToken.split(" ");
  const Token = splitToken[1];
  if (!Token) {
    res.json("token not found");
  } else {
    try {
      const verifyToken = jwt.verify(Token, process.env.JWT_SECRET);
      console.log(verifyToken);
      req._id = verifyToken._id;
      next();
    } catch {
      res.json("token verification failed");
    }
  }
};

export default AuthMiddleware;
