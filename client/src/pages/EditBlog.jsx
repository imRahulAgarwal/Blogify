import React, { useEffect, useState } from "react";
import { BlogForm, Container } from "../import";
import { blogService } from "../api/blogs";
import { useParams } from "react-router-dom";

const EditBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        blogService.getBlog(blogId).then((data) => {
            if (data.blog) setBlog(data.blog);
        });
    }, []);

    return (
        <Container classes="mt-32">
            <div>
                <h1 className="text-4xl text-center">Update Blog</h1>
                <BlogForm blog={blog} />
            </div>
        </Container>
    );
};

export default EditBlog;
