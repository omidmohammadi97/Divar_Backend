const express = require("express")
const dotenv = require("dotenv")
const db = require("./src/config/mongoose.config")
const swaggerConfig = require("./src/config/swagger.config")
async function main(){
    const app = express()
    const path = require("path");
    dotenv.config();
    db.dbConnection();
    swaggerConfig(app)
    const NodeEnv = process.env.NodeEnv;
    dotenv.config({
        path : path.join(__dirname , `.env.${NodeEnv}` ) 
    });
    const PORT = process.env.PORT
        app.listen(PORT , ()=>{
        console.log("Server is listeing on port" + PORT)
    })

}
main();