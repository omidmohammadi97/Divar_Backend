const { HttpError } = require("http-errors");
const AuthorizationMessages = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../modules/user/user.model");

 const Authorization = async (req ,res ,next) =>{
    try {
       const token = req?.cookies?.access_token;
       if(!token) throw new HttpError(401 , AuthorizationMessages.Login)
       const data = jwt.verifay(token , process.end.JWT_SECRET_KEY)
       if(data?.id){
        //lean() mehtod removes useless mehtods from your user model
        const user = await userModel.findById(data.id , {accessToken : 0 , otp : 0}).lean()
        if(!user) throw new HttpError(404 , AuthorizationMessages.NotFoundAccount )
        req.user = user;
        return next()
       }
       throw new HttpError(401 , AuthorizationMessages.Invalidtoken)
    } catch (error) {
        next(error)
    }
 }
 module.exports = Authorization