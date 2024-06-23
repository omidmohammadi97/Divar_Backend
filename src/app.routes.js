const { Router } = require("express");
const {AuthRouter} = require("./modules/auth/auth.routes");
const {userRouter} = require("./modules/user/user.routes");

const mainRouter = Router();
mainRouter.use("/auth" , AuthRouter);
mainRouter.use("/user" , userRouter);

module.exports =  mainRouter;
