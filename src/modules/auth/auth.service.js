const autobind = require("auto-bind")
const userModel = require("../user/user.model")
const createError  = require('http-errors')
const { authMessages } = require("./auth.messages")
const {randomInt} = require("crypto")
class authService {
    #model
    constructor(){
        autobind(this)
        this.#model = userModel
    }
    async sendOTP( mobile){
        try {
        //    const user = await this.checkExistUser(mobile);
           const user = await this.#model.findOne({mobile})
           const now = new Date().getTime();
           const otp = {
            otp : randomInt(10000 , 99999),
            expiresIn : now + (1000*60 *2)
           }
           if(!user){
            const newUser = await this.#model.create({
                mobile , 
                otp
            })
            return newUser;
           }
           if(user.otp && user.otp.expiresIn > now){
            throw new createError.badRequest(400 , authMessages.OTPIsNotExpired)
           }
           user.otp =otp;
           await user.save();
           return user;
           
        } catch (error) {
            next(error);
        }
    }
    async checkOTP( mobile , code){
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async checkExistUser(mobile){
        const user = await this.#model.findOne({mobile})
        if(!user) throw new createError.NotFound(404 ,authMessages.notFoundUser )
        return user; 
    }

}
module.exports = new authService()