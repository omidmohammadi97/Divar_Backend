const {Router} = require("express");
const postController = require("./post.controller");
const {upload} = require("../../common/utils/multer")
const router = Router();

router.get("/create" , postController.createPostPage)
router.post("/create" ,upload.array('images', 10),(req, res, next) => {
   console.info("LABEL" , req.body)
   next();
} ,postController.create)

module.exports = {
   postRouter : router
}
