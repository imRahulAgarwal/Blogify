import React, { useEffect, useState } from "react";
import { Container } from "../import";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogService } from "../api/blogs";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../store/post/postSlice";
import { ScaleLoader } from "react-spinners";

const Blog = () => {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const { userData, status } = useSelector((state) => state.auth);
    const { blogId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteButtonClick = async () => {
        const confirmation = confirm("Do you want to delete the blog?");
        if (!confirmation) return;

        const result = await blogService.deleteBlog(blogId);
        if (result) {
            const blogData = await blogService.getBlogs();
            if (blogData.blogs) dispatch(setBlogs(blogData));
            navigate("/");
        }
    };

    const handleCheckboxClick = async () => {
        const newStatus = blog.status !== "Approved" ? "Approved" : "Pending";
        const confirmation = confirm(`Do you want to change the blog status to ${newStatus}?`);
        if (!confirmation) return;

        const result = await blogService.changeBlogStatus(blogId, newStatus);
        if (result) {
            const data = await blogService.getBlog(blogId);
            if (data.blog) setBlog(data.blog);

            const blogData = await blogService.getBlogs();
            if (blogData.blogs) dispatch(setBlogs(blogData));
        }
    };

    useEffect(() => {
        blogService.getBlog(blogId).then((data) => {
            if (data.blog) {
                setBlog(data.blog);
                setTimeout(() => setLoading(false), 1000);
            } else {
                blogService.getBlogs().then((blogData) => {
                    if (blogData.blogs) dispatch(setBlogs(blogData));
                    navigate("/");
                });
            }
        });
    }, []);

    return (
        <div className="min-h-screen flex">
            <Container classes="my-auto flex flex-col">
                {loading ? (
                    <ScaleLoader className="mx-auto my-auto" color="#000" />
                ) : (
                    <div className="w-full sm:px-10 px-5 py-8 bg-white rounded-lg mt-40 mb-20">
                        <img
                            src={blog.image}
                            className="rounded-lg drop-shadow-xl w-full"
                            alt={blog.title}
                        />
                        <div className="mt-6 text-center">
                            <p className="blog-title md:text-5xl sm:text-4xl text-3xl">
                                {blog.title}
                            </p>
                            <div className="my-2">
                                <p className="blog-published-by">Published by {blog.userName}</p>
                                <p className="blog-published-at">
                                    {moment(blog.createdAt)
                                        .tz("Asia/Kolkata")
                                        .format("DD MMMM, YYYY hh:mm A")}
                                </p>
                            </div>
                        </div>
                        <div className="text-justify">
                            <p>{blog.content}</p>
                        </div>
                        {status && (userData._id === blog.userId || userData.isAdmin) ? (
                            <div className="flex mt-8 mb-5">
                                <div className="mx-auto flex sm:flex-row flex-col ">
                                    <Link
                                        to={`/edit-blog/${blog._id}`}
                                        className="bg-yellow-400 cta-blog-btn max-sm:mt-2">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={handleDeleteButtonClick}
                                        className="bg-red-700 text-white cta-blog-btn max-sm:mt-2">
                                        Delete
                                    </button>
                                    {userData.isAdmin ? (
                                        <label className="inline-flex cursor-pointer my-auto mx-3  max-sm:mt-2">
                                            <input
                                                type="checkbox"
                                                checked={blog.status === "Approved" ? true : false}
                                                className="sr-only peer"
                                                onChange={handleCheckboxClick}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium">
                                                {blog.status}
                                            </span>
                                        </label>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Blog;
