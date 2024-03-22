import React, { memo } from "react";
import { Link } from "react-router-dom";

const Card = ({ blog, classes = "", to = "" }) => {
    return (
        // Here to is made as a prop because this card will be used from various pages.
        <Link to={to}>
            <div className={`bg-[#c2c2c2] rounded-lg shadow-md ${classes}`}>
                <img src={`${blog.image}`} alt={blog.title} className="rounded-xl p-2 mx-auto" />
                <div className="rounded-b-lg p-2">
                    <p className="blog-title">{blog.title}</p>
                    <hr className="border-2 border-[#1a1a1a]" />
                    <div className="my-1">
                        <p className="text-sm">
                            Published by {blog.userName}
                            {blog.byAdmin && (
                                <span>
                                    &nbsp;-&nbsp;<b>Admin</b>
                                </span>
                            )}
                        </p>
                        <p className="text-base">{blog.content.substring(0, 100)}...</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default memo(Card);
