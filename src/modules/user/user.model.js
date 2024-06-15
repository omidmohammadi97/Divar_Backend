const { Schema } = require("mongoose");

const OTPSchema = new Schema({
   code : {type : String ,  required : false , default : undefined},
   expiresIn : {type : Number ,  required : false , default : 0}
})
const userSchema = new Schema({
    fullName : {type : String , required : false , default : undefined},
    mobile : {type :String , required : true , unique : true },
    verifedMobile : {type : Boolean , default : false , required : true},
    opt : {type :  OTPSchema }
}, {timestamps :true})
module.exports = userSchema;