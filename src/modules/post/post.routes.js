const {Router} = require("express");
const postController = require("./post.controller");
const {upload} = require("../../common/utils/multer")
const router = Router();

router.get("/create" , postController.createPostPage)
router.post("/create" ,upload.array('images', 10),postController.create)
router.get("/my" ,postController.find)

module.exports = {
   postRouter : router
}
