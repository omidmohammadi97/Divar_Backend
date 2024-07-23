// const { Schema  , model} = require("mongoose");
const {default : mongoose, Types} = require("mongoose");


const PostSchema = new mongoose.Schema({
    title : {type : String , required : true},
    content : {type :String , required : true},
    category : {type : Types.ObjectId , ref : "category" ,  required : false},
    province : {type :  String , required : false },
    city : {type :  String , required : false},
    address : {type :  String , required : false},
    district : {type :  String , required : false },
    coordinate : {type :  [Number] , required : false },
    options : {type : Object , default : {}},
    images : {type :  [String] , required : true , default : [] }
}, {timestamps :true})

const postModel = mongoose.model("post" , PostSchema)
module.exports = {postModel};