const authService = require("./auth.service");
const autobind = require("auto-bind")
const {authMessages} = require("./auth.messages");
const cookieNames = require("../../common/constant/cookie.enum");
class authController {
     #service
    constructor(){
        autobind(this)
        this.#service = authService
    }

    async sendOTP( req , res , next){
        try {
            const { mobile} = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message : authMessages.sendOTPSuccessfully
            })
        } catch (error) {
            next(error);
        }
    }
    async checkOTP( req , res , next){
        try {
            const { mobile , code} = req.body;
            const token = await this.#service.checkOTP(mobile , code);
            return res.cookie(cookieNames.AccessToken , token ,{httpOnly:true , secure : process.env.NodeEnv == "dev" ? false : true})
            .status(200).json({
                message : authMessages.loginSuccefully,
                token
            })
          
        } catch (error) {
            next(error);
        }
    }
    async logOut( req , res , next){
        try {
           return res.clearCookie(cookieNames.AccessToken).status(200).json({
            message : authMessages.logOutSuccefully
           });
          
        } catch (error) {
            next(error);
        }
    }


}
module.exports = new authController()