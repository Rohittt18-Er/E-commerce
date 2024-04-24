const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "abcdefghigklmnopqrst";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,

  },
  token: {
    type: String,
  },
  otp: {
    type: String,
  },
});


// Match user entered password to hashed password in database
registerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// encrypt password using bcrypt
registerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  if (!this.isDirectModified('confirmPassword')) {
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt)

})


const RegisterData = mongoose.model("RegisterData", registerSchema);
module.exports = RegisterData;
