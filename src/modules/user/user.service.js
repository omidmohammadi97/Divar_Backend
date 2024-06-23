const {userModel} = require("./user.model")
const createError  = require('http-errors')
const { userMessages } = require("./user.messages")
const autoBind = require("auto-bind")
class userSerivce {
    #model
    constructor(){
     autoBind(this);
     this.#model = userModel;
    }


  
}
module.exports = new userSerivce()