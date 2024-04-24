// authMiddleware.js

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const RegisterData = require("../model/registerModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = await RegisterData.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = {protect};