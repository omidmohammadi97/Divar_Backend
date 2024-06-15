const swaggerjsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
function SwaggerConfig(app){
    const swaggerDocs = swaggerjsDoc({
        swaggerDefinition : {
            info : {
                title : "divar-backend",
                description : "backend development with express js",
                version : "1.0.0"
            },
        },
        apis : []
    });
    const swagger = swaggerUi.setup(swaggerDocs)
    app.use("/apis" , swaggerUi.serve , swagger)
}


 module.exports = SwaggerConfig;