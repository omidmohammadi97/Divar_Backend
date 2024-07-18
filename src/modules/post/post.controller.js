const postService = require("./post.service");
const autobind = require("auto-bind")
const {postMessages} = require("./post.messages");
const { CategoryModel } = require("../category/category.model");
const createError = require("http-errors");
class postController {
    #service
    constructor(){
       autobind(this);
       this.#service = postService
    }    

    
    async createPostPage(req , res ,next){
        try {
            console.log(" req.params", req.query)
            let {slug} = req.query;
            let showBack = false;
            let match = {parent : null}
            let options;
            console.log("slug",slug)
            if(slug){
                slug = slug.trim();
                const category = await CategoryModel.findOne({slug});
                if(!category) throw new createError(404 , postMessages.notFoundPost);
                options = await this.#service.getCategorytOptions(category._id)
                if(options.length == 0) options = null;
                showBack = true;
                match = {
                    parent : category._id
                }
            }
            const categories = await CategoryModel.aggregate([{
                $match : match
            }])
           res.render("./pages/pannel/create-post" , {
            categories,
            options,
            showBack 
           })
        } catch (error) {
            next(error)
        }
    }

    async create(req , res ,next){
        try {
            const {title , content , category , province , city , district , coordinate , images} = req.body
            await this.#service.create({title , content , category , province , city , district , coordinate , images});
            return res.status(HttpCodes.CREATED).json({
                message : postMessages.createPost
            })
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new postController()