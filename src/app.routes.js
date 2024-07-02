const { Router } = require("express");
const {AuthRouter} = require("./modules/auth/auth.routes");
const {userRouter} = require("./modules/user/user.routes");
const {categoryRouter} = require("./modules/category/category.routes");
const {optionRoutes} = require("./modules/option/option.routes");
const {postRouter} = require("./modules/post/post.routes");

const mainRouter = Router();
mainRouter.use("/auth" , AuthRouter);
mainRouter.use("/user" , userRouter);
mainRouter.use("/category" , categoryRouter);
mainRouter.use("/post" , postRouter);
mainRouter.use("/option" , optionRoutes);

module.exports =  mainRouter;
