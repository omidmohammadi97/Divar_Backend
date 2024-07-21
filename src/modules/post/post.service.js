const {postModel} = require("./post.model")
const createError  = require('http-errors')
const {optionModel} = require("../option/option.model");
const { postMessages } = require("./post.messages")
const autoBind = require("auto-bind")
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
  
}
module.exports = new postSerivce()