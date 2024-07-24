const multer  = require('multer');
const fs = require("fs");
const path = require("path");
const { HttpStatusCode } = require('axios');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Destination function called");
        const uploadPath = path.join(process.cwd(), "public", "upload");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const whiteList = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (whiteList.includes(file.mimetype)) {
            const format = path.extname(file.originalname);
            const fileName = new Date().getTime().toString() + format;
            console.log("FILE NAME" , fileName)
            cb(null, fileName);
        } else {
            cb(HttpStatusCode.BadRequest("Format of pictures are not allowed!"));
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1000 * 1000 // 3MB file size limit
    }
});
module.exports = {
    upload
}