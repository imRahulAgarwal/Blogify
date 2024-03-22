const { Blog } = require("../models/blogModel");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { validateLoginObject } = require("../utils/validateLoginObject");
const { validateRegisterObject } = require("../utils/validateRegisterObject");
const Joi = require("joi");
const { sendForgotPasswordMail } = require("../utils/sendForgotPasswordMail");
const { validateBlogObject } = require("../utils/validateBlogObject");
const { validateObjectId } = require("../utils/validateObjectId");
const { error } = require("console");
const { JWT_SECRET, SERVER_DOMAIN } = process.env;

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid image type. Only JPG and PNG images are allowed."));
    }
};
const limits = { fileSize: 1024 * 1024 * 3 };
const upload = multer({ storage: multer.memoryStorage(), limits, fileFilter });

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const result = await validateRegisterObject({ name, email, password });
        if (result.error) return next(new ErrorHandler(result.error.message, 422));

        await User.create(result.value)
            .then(() => res.status(201).json({ message: "User registered successfully." }))
            .catch((error) => next(new ErrorHandler(error.message, error.code)));
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await validateLoginObject({ email, password });
        if (result.error) {
            return next(new ErrorHandler(result.error.message, 422));
        }
        const userExists = await User.findOne({ email });
        if (!userExists) return next(new ErrorHandler("User not found.", 404));

        const isValidPassword = await bcrypt.compare(password, userExists.password);
        if (!isValidPassword) return next(new ErrorHandler("Incorrect password", 401));

        const token = jwt.sign({ userId: userExists.id, isAdmin: userExists.isAdmin }, JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            message: "Logged in",
            user: {
                _id: userExists.id,
                name: userExists.name,
                email: userExists.email,
                isAdmin: userExists.isAdmin,
            },
            token,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const profile = async (req, res, next) => {
    try {
        const { _id, name, email, isAdmin } = req.user;
        return res
            .status(200)
            .json({ message: "User profile", user: { _id, name, email, isAdmin } });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const { _id, password } = req.user;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword)
            return next(new ErrorHandler("Passwords do not match.", 400));
        const verifyPassword = await bcrypt.compare(oldPassword, password);
        if (!verifyPassword) return next(new ErrorHandler("Invalid password", 400));

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateResult = await User.updateOne({ _id }, { $set: { password: hashedPassword } });

        if (!updateResult.modifiedCount)
            return next(new ErrorHandler("Password not updated.", 304));

        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const validationResult = await Joi.string().email().required().validate(email);
        if (validationResult.error) {
            return next(new ErrorHandler(validationResult.error, 422));
        }

        const user = await User.findOne({ email });
        if (!user) return next(new ErrorHandler("User not found.", 404));

        const token = await jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "10m" });
        await User.updateOne({ email: user.email }, { $set: { resetPasswordToken: token } });

        const result = await sendForgotPasswordMail({ name: user.name, email: user.email, token });
        if (result) return next(new ErrorHandler(result.message, result.statusCode));
        return res.status(200).json({ message: "Mail has been sent to your provided e-mail id." });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;
        if (!token) return next(new ErrorHandler("Token not provided", 400));

        if (newPassword !== confirmPassword)
            return next(new ErrorHandler("Passwords does not match.", 400));

        const tokenPayload = await jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: tokenPayload.userId, resetPasswordToken: token });
        if (!user) return next(new ErrorHandler("User not found.", 404));

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateResult = await User.updateOne(
            { _id: user.id },
            { $set: { password: hashedPassword } }
        );
        if (!updateResult.modifiedCount)
            return next(new ErrorHandler("Password not updated.", 304));

        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const addBlog = async (req, res, next) => {
    try {
        upload.single("image")(req, res, async (error) => {
            // If file extension is different or the file size is greater.
            if (error) return next(new ErrorHandler(error.message, error.code ? error.code : 415));

            // If image is not provided
            if (!req.file) return next(new ErrorHandler("Image not provided.", 400));

            const { title, content } = req.body;
            const result = await validateBlogObject({ title, content });
            if (result.error) return next(new ErrorHandler(result.error.message, 422));

            const user = req.user;
            const newBlog = new Blog({
                title,
                content,
                userId: user.id,
                userName: user.name,
                byAdmin: user.isAdmin ? true : false,
                status: user.isAdmin ? "Approved" : "Pending",
            });
            const blogFolder = `assets/blogs/${newBlog.id}`;

            if (!fs.existsSync(blogFolder)) fs.mkdirSync(blogFolder, { recursive: true });

            const imageBuffer = req.file.buffer;
            const imagePath = `${blogFolder}/${req.file.originalname}`;

            fs.writeFileSync(imagePath, imageBuffer);
            newBlog.set("image", imagePath);

            await newBlog.save();
            return res.status(201).json({ message: "Blog created" });
        });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const changeBlogStatus = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const { status } = req.body;

        if (status !== "Approved" && status !== "Pending")
            return next(new ErrorHandler("Invalid status input", 422));

        const updateResult = await Blog.findOneAndUpdate({ _id: blogId }, { $set: { status } });

        if (!updateResult) return next(new ErrorHandler("Blog not found", 404));

        return res.status(200).json({ message: `Blog ${status}.` });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const updateBlog = async (req, res, next) => {
    try {
        upload.single("image")(req, res, async (error) => {
            if (error) return next(new ErrorHandler(error.message, error.code ? error.code : 415));

            const { blogId } = req.params;
            const idResult = await validateObjectId(blogId);
            if (idResult.error) return next(new ErrorHandler(idResult.error.message, 422));

            const { title, content } = req.body;
            const blogResult = await validateBlogObject({ title, content });
            if (blogResult.error) return next(new ErrorHandler(blogResult.error, 422));

            const query = { _id: blogId };
            const user = req.user;

            if (!user.isAdmin) query.userId = user._id;

            const blogExists = await Blog.findOne(query);

            if (!blogExists) return next(new ErrorHandler("Blog not found", 404));

            const blogFolder = `assets/blogs/${blogExists.id}`;

            if (!fs.existsSync(blogFolder)) fs.mkdirSync(blogFolder, { recursive: true });

            let imagePath = blogExists.image.split(`${SERVER_DOMAIN}/`)[1];
            if (req.file) {
                fs.unlinkSync(imagePath);
                const imageBuffer = req.file.buffer;
                imagePath = `${blogFolder}/${req.file.originalname}`;
                fs.writeFileSync(imagePath, imageBuffer);
            }

            const updateResult = await Blog.updateOne(
                { _id: blogId, userId: req.user.id },
                { $set: { title, content, image: imagePath } }
            );

            if (!updateResult.modifiedCount) return next(new ErrorHandler("No changes made", 304));

            return res.status(200).json({ message: "Blog updated successfully." });
        });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const query = { _id: blogId };

        const user = req.user;
        if (!user.isAdmin) query.userId = user._id;

        const blog = await Blog.findOneAndDelete(query);
        if (!blog) return next(new ErrorHandler("Blog not found.", 404));

        if (fs.existsSync(`assets/blogs/${blog.id}`))
            fs.rmSync(`assets/blogs/${blog.id}`, { recursive: true });

        return res.status(200).json({ message: "Blog deleted." });
    } catch (error) {
        return next(new ErrorHandler(error.message));
    }
};

module.exports = {
    register,
    login,
    profile,
    updatePassword,
    forgotPassword,
    resetPassword,
    addBlog,
    changeBlogStatus,
    updateBlog,
    deleteBlog,
};
