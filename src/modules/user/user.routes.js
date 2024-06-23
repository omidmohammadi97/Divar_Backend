const {Router} = require("express");
const userController = require("./user.controller");
const Authorization = require("../../common/guard/authorization.guard")
const router = Router();
router.get("/getInfo", Authorization , userController.f_getInfo)

module.exports = {
    userRouter : router
}
