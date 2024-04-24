const express = require("express");
const csvDataUpload = require("../controllers/csvUpload");
const multer = require("multer");
const storage = require("../config/cloudinary");

const upload = multer({ storage: storage });

const uploadCsvRoutes = express.Router();

uploadCsvRoutes.post("/csvUpload", upload.single("csv"), csvDataUpload);

module.exports = uploadCsvRoutes;
