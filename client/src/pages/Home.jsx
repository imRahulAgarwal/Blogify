import React from "react";
import { Card, Container } from "../import";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
    const blogs = useSelector((state) => state.blog.blogs);
    return (
        <>
            <section className="min-h-screen flex home-section">
                <div className="mx-auto my-auto">
                    <h1 className="website-name font-bold">Blogify</h1>
                    <h2 className="website-tagline my-2">
                        Craft Your Narrative: Explore, Express, Engage with Blogify!
                    </h2>
                    <div className="text-center">
                        <Link to={"/blogs"}>
                            <button className="explore-btn px-6 py-2 my-3 shadow-xl">
                                Let's Explore
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            <Container classes="py-10">
                <h1 className="section-title">Trending Blogs</h1>
                <div
                    className={`grid my-10 ${
                        blogs && blogs.length
                            ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
                            : ""
                    }`}>
                    {blogs && blogs.length ? (
                        blogs.map((blog) => (
                            <Card blog={blog} key={blog._id} to={`blogs/${blog._id}`} />
                        ))
                    ) : (
                        <h1 className="not-found max-sm:text-2xl text-3xl">Blogs not listed yet</h1>
                    )}
                </div>
                <div className="text-center">
                    <Link to={"/blogs"}>
                        <button className="explore-btn px-6 py-2 my-3 shadow-xl">
                            Let's Explore
                        </button>
                    </Link>
                </div>
            </Container>
        </>
    );
};

export default Home;
