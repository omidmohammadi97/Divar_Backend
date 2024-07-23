const multer  = require('multer');
const fs = require("fs");
const path = require("path");
const { HttpStatusCode } = require('axios');
const storage = multer.diskStorage({
    destination : function(req , file ,cb){ 
        fs.mkdirSync(path.join(process.cwd() , "public" , "public") , {recursive : true});
        cb(null , "public/upload")
    },
    filename : function(req , file , cb){
        
        const whiteList = ["image/png" , "image/jpg" , "image/jpeg" , "image/webp"];
        if(whiteList.includes(file.mimetype)){
            let format = path.extname(file.orginalname);
            let fileName = new Date().getTime().toString() + format;
            cb(null , fileName);
        }else{
            cb(new HttpStatusCode.BadRequest("format of pictures are not allowed!"))
        }
    } 
})
const upload = multer({
    storage,
    limits : {
        fileSize : 3 * 1000 * 1000
    }
});

module.exports = {
    upload
}