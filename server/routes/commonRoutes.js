const commonRouter = require("express").Router();
const commonController = require("../controllers/commonController");
const { checkUserLoggedIn } = require("../middlewares/authMiddleware");

commonRouter.get("/blogs", checkUserLoggedIn, commonController.listBlogs);

commonRouter.get("/blogs/:blogId", checkUserLoggedIn, commonController.listSpecificBlog);

module.exports = { commonRouter };
