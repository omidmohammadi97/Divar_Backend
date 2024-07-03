const autoBind = require("auto-bind");
const {optionModel} = require("./option.model")
const  {CategoryModel}  = require("./../category/category.model")
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
        this.#categoryModel= CategoryModel;
    }

    async create(optionDto){
        // console.log("optionDto",optionDto)
       const catgeory = await this.checkExistById(optionDto.category)
       optionDto.category = catgeory._id
       optionDto.key = slugify(optionDto.key , {trim : true , replacement : "_" , lower : true})
       await this.alreadyExistByCategoryAndKey(optionDto.category , optionDto.key)
       if(optionDto?.enum && typeof optionDto?.enum === "string"){
        optionDto.enum = optionDto.enum.split(",")
       }else if(!Array.isArray(optionDto.enum)) optionDto.enum = [];

       const option = await this.#model.create(optionDto)
       
    }

    async findById(id){
       
          const option = await this.#model.findById(id , { __v : 0});
         if(!option) throw new createError(404 , optionMessages.notFoundoption)
         return option
    }

    async findByCategoryId(id){
        return await this.#model.find({category : id} , { __v : 0}).populate([{path :"category" , select : {name : 1 , slug : 1}}]);;
    }
    async findByCategorySlug(slug){
        const options = await this.#model.aggregate([
            {
                $lookup : {
                    from : "categories" , //collection name in db
                    localField : "category", //local field that is in option model
                    foreignField : "_id", //field that is in category model and related in option model
                    as : "category" // alias
                }
            },
            {
                $unwind : "$category" // change category output from array to object
            },
            {
                $addFields : {
                    categorySlug : "$category.slug",
                    categoryName : "$category.name",
                    categoryIcon : "$category.icon",
                }
            }
            ,{
                $project : {
                    category :0 ,
                    __v : 0
                } 
            },{
                $match : {
                    categorySlug : slug
                }
            }
           
        ])
        return options
        //276
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
        return await this.#model.find({} , { __v : 0} , {sort : {_id : -1}}).populate([{path :"category" , select : {name : -1 , slug : 1}}]);
         
    }
}
module.exports = new optionService()