const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();
router.post("/createOption" , optionController.create)
router.get("/Bycategory/:categoryId" , optionController.findById)
router.get("/:Id" , optionController.findByCategoryId)
router.get("/" , optionController.find)

module.exports = {
    optionRoutes : router
}