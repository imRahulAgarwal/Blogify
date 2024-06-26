import React from "react";
import { Card, Container, Pagination } from "../import";
import { useSelector } from "react-redux";

const MyBlogs = () => {
    const { blogs } = useSelector((state) => state.blog);

    return (
        <Container classes="flex flex-col my-auto mt-40">
            <h1 className="blog-section-title section-title">All Blogs</h1>
            <div
                className={`grid mt-5 mb-10 ${
                    blogs && blogs.length
                        ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
                        : ""
                }`}>
                {blogs && blogs.length ? (
                    blogs.map((blog) => (
                        <Card blog={blog} key={blog._id} to={`/blogs/${blog._id}`} />
                    ))
                ) : (
                    <h1 className="not-found max-sm:text-2xl text-3xl">Blogs not listed yet</h1>
                )}
            </div>
            {blogs && blogs.length ? <Pagination /> : null}
        </Container>
    );
};

export default MyBlogs;
