import React from "react";
import { useSelector } from "react-redux";
import { Card, Container, Pagination } from "../import";

const Blogs = () => {
    const blogs = useSelector((state) => state.blog.blogs);

    return (
        <div className="min-h-screen flex">
            <Container classes="flex flex-col my-auto">
                <div className="mt-40">
                    <h1 className="blog-section-title section-title">All Blogs</h1>
                    <div
                        className={`grid mt-5 mb-10 ${
                            blogs.length ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6" : ""
                        }`}>
                        {blogs && blogs.length ? (
                            blogs.map((blog) => <Card blog={blog} key={blog._id} to={blog._id} />)
                        ) : (
                            <h1 className="not-found max-sm:text-2xl text-3xl">
                                Blogs not listed yet
                            </h1>
                        )}
                    </div>
                    {blogs && blogs.length ? <Pagination /> : null}
                </div>
            </Container>
        </div>
    );
};

export default Blogs;
