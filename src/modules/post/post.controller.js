const postService = require("./post.service");
const autobind = require("auto-bind")
const {postMessages} = require("./post.messages");
const { CategoryModel } = require("../category/category.model");
const createError = require("http-errors");
const { Types } = require("mongoose");
const HttpCodes = require("http-status-codes")

class postController {
    #service
    constructor(){
       autobind(this);
       this.#service = postService
    }    

    
    async createPostPage(req , res ,next){
        try {
            let {slug} = req.query;
            let showBack = false;
            let match = {parent : null}
            let options , category
            if(slug){
                slug = slug.trim();
                category = await CategoryModel.findOne({slug});
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
            category : category?._id,
            options,
            showBack 
           })
        } catch (error) {
            next(error)
        }
    }

    async create(req , res ,next){
        try {
            console.log("hhhhh")
            console.log(req.body)
            const { title_post:  title  ,description :  content , category , lat , lng} = req.body
            delete req.body['title_post']
            delete req.body['description']
            delete req.body['category']
            delete req.body['lat']
            delete req.body['lng']
            const options = req.body;
            console.log(options)

            await this.#service.create({title , content  , category : new Types.ObjectId(category) , coordinate : [lat , lng] , images : [] , options});
            return res.status(HttpCodes.CREATED).json({
                message : postMessages.createPost
            })
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new postController()