const express = require("express")
const dotenv = require("dotenv")
const expressEjsLayouts = require("express-ejs-layouts")
const mainRouter = require("./src/app.routes")
const db = require("./src/config/mongoose.config")
const swaggerConfig = require("./src/config/swagger.config")
const notFoundHandler = require("./src/common/exception/notFound.handler")
const AllExceptionHandler = require("./src/common/exception/all-exp.handler")
const cookieParser = require("cookie-parser")
const moment = require("jalali-moment")
const methodOverride = require("method-override")
async function main(){
    const app = express()
    const path = require("path");
    dotenv.config();
    db.dbConnection();
    app.use(express.json({ type: 'application/json', charset: 'utf-8' }));
    app.use(express.urlencoded({extended : true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    swaggerConfig(app)
    const NodeEnv = process.env.NodeEnv;
    dotenv.config({
        path : path.join(__dirname , `.env.${NodeEnv}` ) 
    });
    app.use(express.static("public"))
    app.use(expressEjsLayouts)
    app.use(methodOverride('_method'));
    app.set("view engine" , "ejs")
    app.set("layout extractScripts" , true)
    app.set("layout extractStyles" , true)
    app.set("layout" , "./layouts/pannel/main.ejs")
    app.use(mainRouter)
    app.locals.moment = moment
    notFoundHandler(app);
    AllExceptionHandler(app);
    const PORT = process.env.PORT
        app.listen(PORT , ()=>{
        console.log("Server is listeing on port" + PORT)
    })

}
main();