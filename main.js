const express = require("express")
const dotenv = require("dotenv")

async function main(){
    const app = express()
    const path = require("path");
    dotenv.config();
    const NodeEnv = process.env.NodeEnv;
    dotenv.config({
        path : path.join(__dirname , `.env.${NodeEnv}` ) 
    });
    app.listen(NodeEnv , ()=>{
        console.log("Server is listeing on port" + NodeEnv)
    })

}
main();