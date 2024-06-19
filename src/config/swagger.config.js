const swaggerjsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
function SwaggerConfig(app){
    // console.log("process.cwd()" , process.cwd() + "/src/modules/**/*.swagger.js")
    const swaggerDocs = swaggerjsDoc({
        swaggerDefinition : {
            openapi: "3.0.1",
            info : {
                title : "divar-backend",
                description : "backend development with express js",
                version : "1.0.0"
            },
        },
        apis : [process.cwd() + "/src/modules/**/*.swagger.js"]
    });
    const swagger = swaggerUi.setup(swaggerDocs)
    app.use("/apis" , swaggerUi.serve , swagger)
}


 module.exports = SwaggerConfig;