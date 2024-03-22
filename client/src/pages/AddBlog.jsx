import React from "react";
import { BlogForm, Container } from "../import";

const AddBlog = () => {
    return (
        <Container classes="mt-32">
            <div>
                <h1 className="text-4xl text-center">Add Blog</h1>
                <BlogForm />
            </div>
        </Container>
    );
};

export default AddBlog;
