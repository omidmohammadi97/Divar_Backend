const authService = require("./auth.service");
const autobind = require("auto-bind")
const authMessages = require("./auth.messages")
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
            return {
                message : authMessages.sendOTPSuccessfully
            }
        } catch (error) {
            next(error);
        }
    }
    async checkOTP( req , res , next){
        try {
            
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new authController()