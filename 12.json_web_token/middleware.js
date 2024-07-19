import jwt from "jsonwebtoken";

const Authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }
  try {
    const decodedToken = jwt.verify(token, "secretkeyappearshere");
    next();
  } catch {
    res.json("you have no access rights");
  }
};

export default Authenticate;
