const express = require("express");

const {
  registerCtrl,
  userOtpSend,
  loginUser,
  updatePassword,
  logOutCtrl,
  addEmail,
  createTask,
  viewTask,
  viewSingleTask,
  viewEmail
} = require("../controllers/registerCtrl");
const protect = require("../middleware/authMiddleware");
const registerRoutes = express.Router();

registerRoutes.post("/register", registerCtrl);
registerRoutes.post("/send-otp", userOtpSend);
registerRoutes.post("/logOut", logOutCtrl);
registerRoutes.post("/login", loginUser);
registerRoutes.put("/update-password", updatePassword);
registerRoutes.post("/addemail", addEmail);
registerRoutes.post("/createtask", createTask);
registerRoutes.get("/viewtask", viewTask);
registerRoutes.get("/viewsingletask/:id", viewSingleTask);
registerRoutes.get("/viewemail", viewEmail);

module.exports = registerRoutes;
