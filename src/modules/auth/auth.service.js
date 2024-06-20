const autobind = require("auto-bind")
const {userModel} = require("../user/user.model")
const createError  = require('http-errors')
const { authMessages } = require("./auth.messages")
const {randomInt} = require("crypto")
class authService {
    #model
    constructor(){
        autobind(this)
        this.#model = userModel
    }
    async sendOTP(mobile){
        
            console.log("mobile",mobile)
        //    const user = await this.checkExistUser(mobile);
           const user = await this.#model.findOne({mobile})
        //    console.log("user",user)
           const now = new Date().getTime();
           const otp = {
            code : randomInt(10000 , 99999),
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
            throw new createError(400 , authMessages.OTPIsNotExpired)
           }
        //    console.log(otp)
           user.otp =otp;
           await user.save();
           return user;
           
       
    }
    async checkOTP(mobile , code){
       
            const user = await this.checkExistUser(mobile);

            if(user?.otp?.expiresIn < Date().getTime) throw new createError(401 , authMessages.otpExpired);

            if(user?.otp?.code !== code) throw new createError(401 ,authMessages.otpIsIncorrect)

            if(!user.verifedMobile){
                user.verifedMobile = true;
                await user.save()
            }
            
       
    }

    async checkExistUser(mobile){
        const user = await this.#model.findOne({mobile})
        if(!user) throw new createError.NotFound(404 ,authMessages.notFoundUser )
        return user; 
    }

}
module.exports = new authService()