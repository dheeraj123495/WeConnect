const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (!token) {
      return res.status(401).json({
        success: "failure",
        message: "No token provided",
      });
    }
    try {
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = payload;
    } catch (err) {
      return res.status(401).json({
        success: "failure",
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      token: req.header("Authorization") || req.body.token,
      success: "failure",
      message: "Something went wrong, while verifying token",
    });
  }
};
