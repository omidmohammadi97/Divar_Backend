const {Router} = require("express");
const authController = require("./auth.controller");
const router = Router();
router.post("/sendOtp" , authController.sendOTP)
router.post("/checkOtp" , authController.checkOTP)

module.exports = {
    authRoutes : router
}
