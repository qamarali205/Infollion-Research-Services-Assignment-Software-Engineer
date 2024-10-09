require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.SECRETKEY;

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    

    req.user = { 
      ...decoded,       
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    res.status(401).json({ message: "Token is not valid", error: err.message });
  }
};

module.exports = authMiddleware;
