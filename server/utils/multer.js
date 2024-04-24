"use strict";

const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../client/app/public/images/products"));
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 20000000,
    },
});


module.exports = upload;
