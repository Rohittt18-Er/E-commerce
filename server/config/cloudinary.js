require("dotenv").config();
const multer = require("multer");
const { imageUpdate } = require("../controllers/imageUpload");
imageUpdate;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:/NodeJs/excelTask");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = storage;
