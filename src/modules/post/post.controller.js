const postService = require("./post.service");
const autobind = require("auto-bind")
const {postMessages} = require("./post.messages");
const { CategoryModel } = require("../category/category.model");
const createError = require("http-errors");
const { Types } = require("mongoose");
const HttpCodes = require("http-status-codes");
const { removeObjectProperties } = require("../../common/utils/functions");
const { getAddressDetails } = require("../../common/utils/http");
const utf8 = require("utf8")

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
            const images = req?.files?.map(image => image?.path?.slice(38));
            console.log("images" , images)
            const { title_post:  title  ,description :  content , category , lat , lng , amount} = req.body;
            const {address , province , district , city} = await getAddressDetails(lat , lng)
            const options = await removeObjectProperties(req.body , ['title_post' , 'description' , 'category', 'lat' , 'lng' , 'amount' ,'images']);
            for (let key in options) {
                let value = options[key];
                delete options[key];
                key = utf8.decode(key);
                options[key] = value;

            }
            console.log(options)

            await this.#service.create({title , content  ,amount ,category : new Types.ObjectId(category) , coordinate : [lat , lng] , images  , 
                address ,
                province ,
                district ,
                city ,
                options

            });
            return res.status(HttpCodes.CREATED).json({
                message : postMessages.createPost
            })
        } catch (error) {
            next(error)
        }
    }
    async find(req , res ,next){
        try {
            const posts = await this.#service.find();
            console.log(posts)
            return res.render("./pages/pannel/post" , posts)
            
        } catch (error) {
            next(error)  
        }
    }

}
module.exports = new postController()