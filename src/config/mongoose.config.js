const { defult : mongoose} = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const DBURL = process.env.MONGODBURL;
dotenv.config({
    path : path.join("../../",__dirname , `.env.${DBURL}` ) 
})

mongoose.connect(process.env.DBURL).then(() =>{
    console.log("Connection established!");
}).catch(error =>{
    console.log(error?.message ?? "Failed to connect to DB")
})
