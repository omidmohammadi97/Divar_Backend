const autoBind = require("auto-bind");
const {optionModel} = require("./option.model")
const { optionMessages } = require("./option.messages");
const { isValidObjectId, set, Types } = require("mongoose");
const createError  = require('http-errors');
const { CONFLICT } = require("http-status-codes");
const { default: slugify } = require("slugify");

class optionService {
    #model
    constructor(){
        autoBind(this)
        this.#model = optionModel;
    }

    async create(optionDto){
       
    }
    async checkExistById(id){
        const category =await this.#model.findById(id)
        if(!category){
            throw new createError(404 , categoryMessages.notFoundCategory)
        }
        return category

    }
   
    
    async find(){
    }
}
module.exports = new optionService()