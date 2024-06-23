const userService = require("./user.service");
const autobind = require("auto-bind")
const {userMessages} = require("./user.messages")
class userController {
    #service
    constructor(){
       autobind(this);
       this.#service = userService
    }
    async f_getInfo(req , res ,next){
        try {
            const user = req.user;
            return res.json(user)
            
        } catch (error) {
            next(error)
        }
    }

    

}
module.exports = new userController()