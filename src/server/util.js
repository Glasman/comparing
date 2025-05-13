import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "No token provided, not authorized" });
    return;
  }
  //bearer = "Bearer oiernveong"
  const [, token] = bearer.split(" ");
  //["Bearer", wocinwo], blank space in deconstruction signifies not using it
  if (!token) {
    res.status(401).send({ message: "No token provided, not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("req", req);
    next();
  } catch (error) {
    console.error(error.stack)
    res.status(401).send({ message: "error:", error });
  }
};
export default verifyToken;
