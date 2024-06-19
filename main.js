const express = require("express")
const dotenv = require("dotenv")
const mainRouter = require("./src/app.routes")
const db = require("./src/config/mongoose.config")
const swaggerConfig = require("./src/config/swagger.config")
const notFoundHandler = require("./src/common/exception/notFound.handler")
const AllExceptionHandler = require("./src/common/exception/all-exp.handler")
async function main(){
    const app = express()
    const path = require("path");
    dotenv.config();
    db.dbConnection();
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))
    swaggerConfig(app)
    const NodeEnv = process.env.NodeEnv;
    dotenv.config({
        path : path.join(__dirname , `.env.${NodeEnv}` ) 
    });
    
    app.use(mainRouter)
    notFoundHandler(app);
    AllExceptionHandler(app);
    const PORT = process.env.PORT
        app.listen(PORT , ()=>{
        console.log("Server is listeing on port" + PORT)
    })

}
main();