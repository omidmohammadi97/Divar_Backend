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
mainRouter.get("/" , (req,res)=>{
    res.locals.layout = "./layouts/website/main.ejs"
    res.render("./pages/home/index.ejs")
});
mainRouter.get("/pannel" , (req,res)=>{
    res.render("./pages/pannel/dashboard.ejs")
});
mainRouter.get("/auth/login" , (req,res)=>{
    res.locals.layout = "./layouts/auth/main.ejs"
    res.render("./pages/auth/login.ejs")
});

module.exports =  mainRouter;
