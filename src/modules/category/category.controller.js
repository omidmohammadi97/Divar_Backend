const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const { categoryMessages } = require("./category.messages");
const HttpCodes = require("http-status-codes")
class categoryController {
    #service
    constructor(){
        autoBind(this)
        this.#service =categoryService;
    }
    

    async create(req , res ,next){
        try {
            const {name , slug , icon , parent} = req.body;
            await this.#service.create({name , slug , icon , parent});
            return res.status(HttpCodes.CREATED).json({
                message : categoryMessages.createCategory
            })
        } catch (error) {
            next(error);

        }
    }
    async find(req , res ,next){
        try {
            const categories = await this.#service.finaAll();
            return res.status(HttpCodes.OK).json(categories)
        } catch (error) {
            next(error);

        }
    }
    async remove(req , res ,next){
        try {
            const {id} = req.params;
            await this.#service.remove(id);
            return res.status(HttpCodes.OK).json({
                message : categoryMessages.deleteCategory
            })
        } catch (error) {
            next(error);

        }
    }
}

module.exports = new categoryController();