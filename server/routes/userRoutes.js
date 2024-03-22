const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const { isLoggedIn, isPermitted } = require("../middlewares/authMiddleware");

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/profile", isLoggedIn, userController.profile);

userRouter.patch("/password", isLoggedIn, userController.updatePassword);

userRouter.post("/password/forgot", userController.forgotPassword);

userRouter.post("/password/reset", userController.resetPassword);

userRouter.post("/blogs", isLoggedIn, userController.addBlog);

userRouter.patch("/blogs/:blogId", isLoggedIn, isPermitted, userController.changeBlogStatus);

userRouter.put("/blogs/:blogId", isLoggedIn, userController.updateBlog);

userRouter.delete("/blogs/:blogId", isLoggedIn, userController.deleteBlog);

module.exports = { userRouter };
