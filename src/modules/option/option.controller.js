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
          
        } catch (error) {
            next(error);

        }
    }
    async findById(req , res ,next){
        try {
    
        } catch (error) {
            next(error);

        }
    }
    async findByCategoryId(req , res ,next){
        try {
    
        } catch (error) {
            next(error);

        }
    }
    async find(req , res ,next){
        try {
    
        } catch (error) {
            next(error);

        }
    }
    
}

module.exports = new optionController();