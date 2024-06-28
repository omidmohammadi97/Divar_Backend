const { Router } = require("express");
const {AuthRouter} = require("./modules/auth/auth.routes");
const {userRouter} = require("./modules/user/user.routes");
const {categoryRouter} = require("./modules/category/category.routes");

const mainRouter = Router();
mainRouter.use("/auth" , AuthRouter);
mainRouter.use("/user" , userRouter);
mainRouter.use("/category" , categoryRouter);
mainRouter.use("/post" , postRouter);

module.exports =  mainRouter;
