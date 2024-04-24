require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    console.log("db connected successfull");
  } catch (error) {
    console.log("connection failed");
  }
};
dbConnect();
module.exports = dbConnect;
