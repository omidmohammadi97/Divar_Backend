// const { Schema  , model} = require("mongoose");
const {default : mongoose, Types} = require("mongoose");


const PostSchema = new mongoose.Schema({
    title : {type : String , required : true},
    content : {type :String , required : true },
    category : {type : Types.ObjectId , ref : "category" ,  required : true},
    province : {type :  String , required : true },
    city : {type :  String , required : true },
    district : {type :  String , required : true },
    coordinate : {type :  [Number] , required : true },
    images : {type :  [String] , required : true , default : [] }
}, {timestamps :true})

const postModel = mongoose.model("post" , PostSchema)
module.exports = {postModel};