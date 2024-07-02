const postService = require("./post.service");
const autobind = require("auto-bind")
const {postMessages} = require("./post.messages")
class postController {
    #service
    constructor(){
       autobind(this);
       this.#service = postService
    }    

}
module.exports = new postController()