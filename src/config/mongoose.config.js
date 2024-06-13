const { default : mongoose} = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const dbConnection = async ()=>{
    dotenv.config()
    const NodeEnv = process.env.NodeEnv;

    dotenv.config({
        path : path.join(__dirname , `../../.env.${NodeEnv}` ) 
        })
        
        console.log("TETST" , process.env.DBURL)
    mongoose.connect(process.env.DBURL).then(() =>{
        console.log("Connection established!");
    }).catch(error =>{
        console.log(error?.message ?? "Failed to connect to DB")
    })
    
}
module.exports = {
    dbConnection  
}