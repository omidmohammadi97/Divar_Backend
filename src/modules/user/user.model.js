// const { Schema  , model} = require("mongoose");
const {default : mongoose} = require("mongoose");

const OTPSchema = new mongoose.Schema({
   code : {type : String ,  required : false , default : undefined},
   expiresIn : {type : Number ,  required : false , default : 0}
})
const userSchema = new mongoose.Schema({
    fullName : {type : String , required : false , default : undefined},
    mobile : {type :String , required : true , unique : true },
    accessToken : {type :String},
    verifedMobile : {type : Boolean , default : false , required : true},
    otp : {type :  OTPSchema }
}, {timestamps :true})

const userModel = mongoose.model("user" , userSchema)
module.exports = {userModel};