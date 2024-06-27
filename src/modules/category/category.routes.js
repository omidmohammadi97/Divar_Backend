const {Router} = require("express");
const categoryController = require("./category.controller");
const router = Router();
// router.post("/createCategory" , categoryController.createCategory)
// router.get("/getCategories"  , categoryController.getCategories)

module.exports = {
    categoryRouter : router
}
