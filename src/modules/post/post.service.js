const {postModel} = require("./post.model")
const createError  = require('http-errors')
const {optionModel} = require("../option/option.model");
const { postMessages } = require("./post.messages")
const autoBind = require("auto-bind");
const { isValidObjectId } = require("mongoose");
const { HttpStatusCode } = require("axios");
class postSerivce {
    #optionModel
    #model
    constructor(){
     autoBind(this);
     this.#model = postModel;
     this.#optionModel = optionModel;
    }

    async getCategorytOptions(categoryId){
       return await this.#optionModel.find({category : categoryId})
    }
    async create(dto){
        return await this.#model.create(dto)
     }

     async findMyPosts(userId){
        console.log(userId)
        if(userId && isValidObjectId(userId)) return await this.#model.find({userId});
        throw new HttpStatusCode.BadRequest(postMessages.badRequest)

     }
     async remove(postId){
        console.log(postId)
         if(!postId || !isValidObjectId(postId))  throw new HttpStatusCode.badRequest(postMessages.badRequest)
         const post = await this.#model.findById({_id : postId})
         if(!post) throw new HttpStatusCode.NotFound(postMessages.notFoundPost)
         await this.#model.deleteOne({_id : postId});
       

     }

     async find(userId){
        const post = await this.#model.find({userId})
        if(!post) throw new HttpStatusCode.NotFound(postMessages.notFoundPost)
        return post
     }
  
}
module.exports = new postSerivce()