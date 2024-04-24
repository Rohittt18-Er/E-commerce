const RegisterData = require("../model/registerModel");

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");



let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "hayley.flatley@ethereal.email",
    pass: "wwqc79gjpXhmsJZhjg",
  },
});

const registerCtrl = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({ error: "Please Enter All Input Data" });
      return;
    }

    const userFound = await RegisterData.findOne({ email: email });
    if (userFound) {
      res.status(400).json({ message: "User has already registered" });
      return;
    }

    const user = await RegisterData.create({
      name,
      email,
      password,
      confirmPassword,
    });
   
    if (user) {
      generateToken(res, user._id);
      res.status(200).json({
        data: user,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        message: "User registration failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userOtpSend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Enter your email" });
    return;
  }
  try {
    const emailFound = await RegisterData.findOne({ email: email });
    const OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(emailFound._id);
    if (emailFound) {
      const updateData = await RegisterData.findByIdAndUpdate(
        { _id: emailFound._id },
        { otp: OTP },
        { new: true }
      );
      await updateData.save();
      const currentDate = new Date();
      const data = {
        from: "KING KOHLI",
        to: `${email}`,
        subject: "password reset",
        html: `
        <h3>Hey  ,we received you have to reset your account password ,${currentDate} </h3>
        <h3> Please click on the link to reset your password </h3>\
        <a href=${process.env.CLIENT_URL}> click here </a>
        <h2>OTP :- ${OTP}</h2>
        `,
      };
      const info = await transporter.sendMail(data);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    res.json({
      status: "success",
      data: "otp has sent",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Enter all input fields" });
    return;
  }
  try {
    const userFound = await RegisterData.findOne({ email });
    if (userFound && (await userFound.matchPassword(password))) {
      console.log(userFound.id);
   const token=   generateToken(res, userFound.id);
   console.log(token);
      res.status(200).json({
        message: "login successful",
        data: userFound,
        token:token
      });
    } else {
      res.status(500).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({
      status: "login failed",
      message: error.message,
    });
  }
};



const updatePassword = async (req, res) => {
  const { otp, password, confirmPassword } = req.body;
  if (!otp || !password || !confirmPassword) {
    res
      .status(400)
      .json({ message: "Please provide OTP, password, and confirmPassword" });
    return;
  }
  try {
    const userFound = await RegisterData.findOne({ otp });
    if (!userFound) {
      res.json({ message: "User not found" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    userFound.password = hashedPassword;
    userFound.confirmPassword = hashedConfirmPassword;
    await userFound.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logOutCtrl = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const addEmail = async (req, res) => {
  try {
    const { email,userId } = req.body;
    const emailFound = await Email.findOne({ $and: [ {email:email},{userId:userId}] });

    if (emailFound) {
      return res.status(400).json({ message: "email already exists" });
    }

    const result = await Email.create({ email: email,userId:userId });
    return res.status(200).json({
      data: {
        email: result,
        message: "email created successfully",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description,createdBy } = req.body;
    const task = await Task.create({
      title,
      description,
      createdBy:createdBy
      
    });
    return res.status(200).json({
      
        task,
        message: "task created successfully",
      
    });
  } catch (error) {
    return res.status(500).json({
      message: "Task creation failed",
    });
  }
};

const viewTask =async(req,res)=>{
 
try{
  const result = await Task.find()
  res.status(200).json({
  
      result,
      message:"data fetched"

  })
}
catch(error){
res.status(400).json({
  data:{
    message:"failed to get task"
  }
})
}
}

const viewSingleTask=async(req,res)=>{

  try {
    const taskId = req.params.id
    const task = await Task.findById({_id:taskId})
    res.status(200).json({
      task,
      message:"task fetched "
    })
  } catch (error) {
    console.log(error);
  }
}

const viewEmail= async(req,res)=>{
  const {userId} = req.body
  try {
    const email = await Email.find({userId})
    res.status(200).json({
      email,
      message:"email fetched"
    })
  } catch (error) {
    res.status(400).json({
      message:"fetched failed"
    })
  }
}

module.exports = {
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
};
