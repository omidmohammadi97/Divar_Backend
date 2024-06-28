const {postModel} = require("./post.model")
const createError  = require('http-errors')
const { postMessages } = require("./post.messages")
const autoBind = require("auto-bind")
class postSerivce {
    #model
    constructor(){
     autoBind(this);
     this.#model = postModel;
    }


  
}
module.exports = new postSerivce()