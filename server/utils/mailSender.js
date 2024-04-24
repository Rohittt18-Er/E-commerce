const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transPorter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transPorter.sendMail({
      from: "www.Rohit.me -Rohit Yadav",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;
