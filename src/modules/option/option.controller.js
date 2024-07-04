const autoBind = require("auto-bind");
const optionService = require("./option.service");
const { optionMessages } = require("./option.messages");
const HttpCodes = require("http-status-codes")
class optionController {
    #service
    constructor(){
        autoBind(this)
        this.#service =optionService;
    }
    

    async create(req , res ,next){
        try {
            const {title , key , category , guid , type , enum : list } = req.body;
            await this.#service.create({title , key , category , guid , type ,  enum : list })
            return res.status(HttpCodes.CREATED).json({
                message : optionMessages.createoption
            })
        } catch (error) {
            next(error);

        }
    }
    async findById(req , res ,next){
        try {
            const {Id} = req.params
            const option = await this.#service.findById(Id)
            return res.status(HttpCodes.OK).json(option)
    
        } catch (error) {
            next(error);

        }
    }
    async deleteById(req , res ,next){
        try {
            const {Id} = req.params
            await this.#service.deleteById(Id)
            return res.status(HttpCodes.OK).json({
                message : optionMessages.removeOption
            })
    
        } catch (error) {
            next(error);

        }
    }
    async findByCategoryId(req , res ,next){
        try {
            const {categoryId} = req.params
            const optionByCategoryId = await this.#service.findByCategoryId(categoryId)
            return res.status(HttpCodes.OK).json(optionByCategoryId)
        } catch (error) {
            next(error);

        }
    }
    async findByCategorySlug(req , res ,next){
        try {
            const {slug} = req.params
            const optionByCategorySlug = await this.#service.findByCategorySlug(slug)
            return res.status(HttpCodes.OK).json(optionByCategorySlug)
        } catch (error) {
            next(error);

        }
    }
    async find(req , res ,next){
        try {
            const options = await this.#service.find()
            return res.status(HttpCodes.OK).json(options)
    
        } catch (error) {
            next(error);

        }
    }
    
}

module.exports = new optionController();