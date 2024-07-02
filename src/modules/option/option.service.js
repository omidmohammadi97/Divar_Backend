const autoBind = require("auto-bind");
const {optionModel} = require("./option.model")
const {categoryModel} = require("./../category/category.model")
const { optionMessages } = require("./option.messages");
const HttpCodes = require("http-status-codes")
const createError  = require('http-errors');
const { default: slugify } = require("slugify");

class optionService {
    #model
    #categoryModel
    constructor(){
        autoBind(this)
        this.#model = optionModel;
        this.#categoryModel = categoryModel;
    }

    async create(optionDto){
       const catgeory = await this.checkExistById(optionDto.category)
       optionDto.category = catgeory._id
       optionDto.key = slugify(optionDto.key , {trim : true , replacement : "_" , lower : true})
       await this.alreadyExistByCategoryAndKey(optionDto.category , optionDto.key)
       if(optionDto?.enum && typeof optionDto?.enum === "string"){
        optionDto.enum = optionDto.enum.split(",")
       }else if(!Array.isArray(optionDto.enum)) optionDto.enum = [];

       const option = await this.#model.create(optionDto)
       
    }
    async checkExistById(id){
        const category = await this.#categoryModel.findById(id);
        if(!category) throw new createError(404 , optionMessages.notFoundoption)
        return category
    }
    async alreadyExistByCategoryAndKey(category , key){
        const isExist = await this.#model.findOne({category , key});
        if(isExist) throw new createError(HttpCodes.CONFLICT , optionMessages.optionExist)
        return null
    } 
   
    
    async find(){
    }
}
module.exports = new optionService()