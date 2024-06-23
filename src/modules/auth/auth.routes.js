const {Router} = require("express");
const authController = require("./auth.controller");
const Authorization = require("../../common/guard/authorization.guard")

const router = Router();
router.post("/sendOtp" , authController.sendOTP)
router.post("/checkOtp" , authController.checkOTP)
router.get("/logOut" ,Authorization , authController.logOut)

module.exports = {
    AuthRouter : router
}
