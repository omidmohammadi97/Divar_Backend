const autoBind = require("auto-bind");
const {CategoryModel} = require("./category.model")
const { categoryMessages } = require("./category.messages");
const { isValidObjectId, set, Types } = require("mongoose");
const createError  = require('http-errors');
const { CONFLICT } = require("http-status-codes");
const { default: slugify } = require("slugify");

class categoryService {
    #model
    constructor(){
        autoBind(this)
        this.#model = CategoryModel;
    }

    async create(categoryDto){
        if(categoryDto?.parent && isValidObjectId(categoryDto.parent)){
            const existCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existCategory._id
            categoryDto.parents = [
                ... new Set(([existCategory._id.toSring()].concat(
                    existCategory.parents.map(id => id.toSring())
                )).map(id => new Types.ObjectId(id)))
            ]
        }
        if(categoryDto?.slug){
            console.log("categoryDto",categoryDto)
            categoryDto.slug = slugify(categoryDto.slug)
            console.log("categoryDto.slug",categoryDto.slug)

            await this.alreadyExistBySlug(categoryDto.slug)
        }else{
            categoryDto.slug = slugify(categoryDto.name)
        }
   
    }
    async checkExistById(id){
        const category =await this.#model.findById(id)
        if(!category){
            throw new createError(404 , categoryMessages.notFoundCategory)
        }

    }
    async checkExistBySlug(slug){
        const category = await this.#model.findOne({slug})
        if(!category){
            throw new createError(404 , categoryMessages.notFoundCategory)
        }
        return category
    }
    async alreadyExistBySlug(slug){
        const category = await  this.#model.findOne({slug})
        // console.log("category" , category)
        if(category){
            throw new createError(409 , categoryMessages.categoryExist)
        }
        return null
    }
    
}
module.exports = new categoryService()