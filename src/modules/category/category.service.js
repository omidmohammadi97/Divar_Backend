const autoBind = require("auto-bind");
const {CategoryModel} = require("./category.model")
const { categoryMessages } = require("./category.messages");

class categoryService {
    #model
    constructor(){
        autoBind(this)
        this.#model = CategoryModel;
    }

    async create(category){
        const category = this.#model.findOne({name : category.name})
        if(!category){
            const newCategory = await this.#model.create(categoryDTO)
            // {
            //     name : category.name,
            //     slug : category.slug,
            //     icon : category.icon,
            //     parent : category.parent,
            //     parents : category.parents
            // }
        }else {
            return categoryMessages.categoryExist;
        }
    }
    
}
module.exports = new categoryService()