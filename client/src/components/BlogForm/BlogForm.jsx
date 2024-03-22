import React, { memo, useEffect, useState } from "react";
import { Button, Input } from "../../import";
import { blogService } from "../../api/blogs";
import { useNavigate } from "react-router-dom";
import { setBlogs } from "../../store/post/postSlice";
import { useDispatch } from "react-redux";

const BlogForm = ({ blog }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [imagePresent, setImagePresent] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", file);
        let result = undefined;
        if (blog) {
            result = await blogService.updateBlog(blog._id, formData);
        } else {
            result = await blogService.addBlog(formData);
        }

        if (result) {
            const data = await blogService.getBlogs();
            if (data.blogs) dispatch(setBlogs(data));
            navigate("/");
        }
    };

    const handleTextAreaChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setImagePresent(true);
        }
    }, [blog]);

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <Input
                value={title}
                handleChange={setTitle}
                placeholder="Blog Title"
                type="text"
                id="blog-title"
                required={true}
            />
            <textarea
                value={content}
                rows={"auto"}
                className="w-full p-3 max-h-56 min-h-56 resize-none rounded-lg outline-none"
                placeholder="Blog Content"
                id="blog-content"
                onChange={handleTextAreaChange}></textarea>
            {imagePresent ? (
                <img src={blog.image} className="my-4 rounded-lg drop-shadow-lg" />
            ) : null}
            <div className="flex flex-col">
                {imagePresent ? (
                    <button
                        type="button"
                        className="my-2 px-6 py-2 bg-yellow-300 mx-auto rounded-lg"
                        onClick={() => setImagePresent(false)}>
                        Change Image
                    </button>
                ) : (
                    <input
                        type="file"
                        className="bg-white outline-none p-3 w-full rounded-lg my-3"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                )}
                <Button
                    type="submit"
                    classes="mx-auto px-6 py-2 bg-green-600 text-white hover:bg-green-400 hover:text-black font-medium"
                    text={blog ? "Update Blog" : "Add Blog"}
                />
            </div>
        </form>
    );
};

export default memo(BlogForm);
