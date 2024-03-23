const { Blog } = require("../models/blogModel");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { validateObjectId } = require("../utils/validateObjectId");
const pageLimit = 12;

const listBlogs = async (req, res, next) => {
    try {
        const user = req.user;
        const { page, userid } = req.query;

        const query = {};

        // If userid is provided the below code will trigger. For user self blogs
        if (userid) {
            query.userId = userid;
        }

        // If user is not admin the below code will trigger.
        if ((!user || !user.isAdmin) && !userid) query.status = "Approved";

        const blogs = await Blog.find(query)
            .lean()
            .skip(((page ? page : 1) - 1) * pageLimit)
            .limit(pageLimit);

        if (!blogs.length) return next(new ErrorHandler("Blogs not found", 404));

        const totalPages = Math.ceil((await Blog.find(query).countDocuments()) / pageLimit);
        return res.status(200).json({ blogs, totalPages });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const listSpecificBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const { userid } = req.query;
        const idResult = await validateObjectId(blogId);
        if (idResult.error) return next(new ErrorHandler(idResult.error.message, 422));

        const loggedInUser = req.user;
        const query = { _id: blogId };

        if (userid) {
            query.userId = userid;
        }

        if ((!loggedInUser || !loggedInUser.isAdmin) && !userid) query.status = "Approved";

        const blog = await Blog.findOne(query);
        if (!blog) return next(new ErrorHandler("Blog not found", 404));

        return res.status(200).json({ blog });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

module.exports = {
    listBlogs,
    listSpecificBlog,
};
