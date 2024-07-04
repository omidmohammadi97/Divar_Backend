const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();
router.post("/createOption" , optionController.create)
router.get("/Bycategory/:categoryId" , optionController.findByCategoryId)
router.get("/Bycategory-slug/:slug" , optionController.findByCategorySlug)
router.get("/:Id" , optionController.findById)
router.get("/" , optionController.find)
router.delete("/:Id" , optionController.deleteById)
router.put("/:Id" , optionController.update)

module.exports = {
    optionRoutes : router
}