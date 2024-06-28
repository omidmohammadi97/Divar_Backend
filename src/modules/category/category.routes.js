const {Router} = require("express");
const categoryController = require("./category.controller");
const router = Router();
 router.post("/createCategory" , categoryController.create)
 router.get("/"  , categoryController.find)

module.exports = {
    categoryRouter : router
}
