import React, { useEffect } from "react";
import { Card, Container, Pagination } from "../import";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorId } from "../store/post/postSlice";

const MyBlogs = () => {
    const { blogs } = useSelector((state) => state.blog);
    const { _id } = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthorId(_id));
    }, [_id]);

    return (
        <Container classes="flex flex-col my-auto mt-40">
            <h1 className="blog-section-title section-title">All Blogs</h1>
            <div
                className={`grid mt-5 mb-10 ${
                    blogs.length ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6" : ""
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
