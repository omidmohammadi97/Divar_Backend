const {postModel} = require("./post.model")
const createError  = require('http-errors')
const {optionModel} = require("../option/option.model");
const { postMessages } = require("./post.messages")
const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const { HttpStatusCode } = require("axios");
const { CategoryModel } = require("../category/category.model");
class postSerivce {
    #optionModel
    #model
    #categoryModel
    constructor(){
     autoBind(this);
     this.#model = postModel;
     this.#optionModel = optionModel;
     this.#categoryModel = CategoryModel;

    }

    async getCategorytOptions(categoryId){
       return await this.#optionModel.find({category : categoryId})
    }
    async create(dto){
        return await this.#model.create(dto)
     }

     async findMyPosts(userId){
        console.log(userId)
        if(userId && isValidObjectId(userId)) return await this.#model.find({userId});
        throw new HttpStatusCode.BadRequest(postMessages.badRequest)

     }
     async remove(postId){
        console.log(postId)
         if(!postId || !isValidObjectId(postId))  throw new HttpStatusCode.badRequest(postMessages.badRequest)
         const post = await this.#model.findById({_id : postId})
         if(!post) throw new HttpStatusCode.NotFound(postMessages.notFoundPost)
         await this.#model.deleteOne({_id : postId});
       

     }
     async findAll (options) {
      let {category, search} = options;
      const query = {};
      if (category) {
          const result = await this.#categoryModel.findOne({slug: category});
          let categories = await this.#categoryModel.find({parents: result._id}, {_id: 1});
          categories = categories.map(item => item._id);
          if (result) {
              query['category'] = {
                  $in: [result._id, ...categories]
              };
          } else {
              return [];
          }
      }
      if (search) {
          search = new RegExp(search, "ig");
          query['$or'] = [
              {title: search},
              {description: search},
          ];
      }
      const posts = await this.#model.find(query, {}, {sort: {_id: -1}});
      return posts;
     }


     async checkExist(id){
      if(!id || !isValidObjectId(id))  throw new HttpStatusCode.badRequest(postMessages.badRequest);
      const [post] = await this.#model.aggregate([
        {
            $match : {_id : new Types.ObjectId(id)}
        },
        {
            $lookup : {
                from : "users",
                localField : "userId",
                foreignField:"_id",
                as : "user"
            }
        },
        {
            $unwind :{
                path : "$user",
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $addFields : {
                userMobile : "$user.mobile"
            }
        },
        {
            $project:
            {
                user : 0
            }
        }
      ])
      if(!post) throw new HttpStatusCode.NotFound(postMessages.notFoundPost)
      return post
     }
     async find(userId){
        const post = await this.#model.find({userId})
        if(!post) throw new HttpStatusCode.NotFound(postMessages.notFoundPost)
        return post
     }
  
}
module.exports = new postSerivce()