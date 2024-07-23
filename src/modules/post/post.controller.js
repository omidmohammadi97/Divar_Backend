const postService = require("./post.service");
const autobind = require("auto-bind")
const {postMessages} = require("./post.messages");
const { CategoryModel } = require("../category/category.model");
const createError = require("http-errors");
const { Types } = require("mongoose");
const HttpCodes = require("http-status-codes");
const { removeObjectProperties } = require("../../common/utils/functions");
const { getAddressDetails } = require("../../common/utils/http");

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
            const { title_post:  title  ,description :  content , category , lat , lng , amount} = req.body;
            const {address , province , district , city} = await getAddressDetails(lat , lng)
            // const result = await axios.get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}` , 
            //     {headers : {
            //         "x-api-key" : process.env.MAP_IR_APIKEY
            //     }
            // }).then(res => res.data);
            const options = await removeObjectProperties(req.body , ['title_post' , 'description' , 'category', 'lat' , 'lng' , 'amount' ,'images']);
            console.log(options)

            await this.#service.create({title , content  ,amount ,category : new Types.ObjectId(category) , coordinate : [lat , lng] , images : [] , 
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

}
module.exports = new postController()