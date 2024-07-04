// const { type } = require("express/lib/response");
const { Schema, Types  , model} = require("mongoose");

const optionSchema = new Schema({
    title : {type : String, required : true},
    key : {type :String , required : true},
    type : {type : String , enum : ["number" , "string" , "array" , "boolean"]},
    enum : {type : Array , default : []},
    guid : {type : String , required : false},
    required : {type : Boolean , required : false , default : false},
    category : {type : Types.ObjectId , ref : "category" , required : true} 
});
const optionModel = model("option" , optionSchema)
module.exports ={optionModel}