import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { logout } from "../../store/auth/authSlice";
import { blogService } from "../../api/blogs";
import { setBlogs } from "../../store/post/postSlice";
import { toast } from "react-toastify";
import conf from "../../conf/conf";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const userAuthStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const navbarRef = useRef(null);
    const navigate = useNavigate();

    const navLinks = [
        {
            name: "Home",
            to: "/",
            show: true,
        },
        {
            name: "About Us",
            to: "/about-us",
            show: true,
        },
        {
            name: "Blogs",
            to: "/blogs",
            show: true,
        },
        {
            name: "Login",
            to: "/login",
            show: !userAuthStatus,
        },
        {
            name: "Sign Up",
            to: "/signup",
            show: !userAuthStatus,
        },
        {
            name: "Add Blog",
            to: "/add-blog",
            show: userAuthStatus,
        },
        {
            name: "Profile",
            to: "/profile",
            show: userAuthStatus,
        },
        {
            name: "My Blogs",
            to: "/my-blogs",
            show: userAuthStatus,
        },
    ];

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        toast.success("Logged Out", conf.toastOptions);
        dispatch(logout());
        blogService
            .getBlogs()
            .then(({ blogs }) => {
                if (blogs) dispatch(setBlogs(blogs));
            })
            .finally(() => navigate("/"));
    };

    useEffect(() => {
        window.addEventListener("scroll", isScrolled);
        document.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", isScrolled);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const isScrolled = () => {
        const scrolled = window.scrollY;
        const userScrolled = scrolled >= 50 ? true : false;
        setScroll(userScrolled);
    };

    const handleClickOutside = (e) => {
        if (!navbarRef.current || !navbarRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    return (
        <header
            className={`items-center justify-between flex-wrap px-6 py-4 md:py-6 ${
                scroll ? "sticky" : "absolute"
            }`}>
            <div className="flex items-center mx-2">
                <Link to="/" className="text-2xl font-semibold">
                    Blogify
                </Link>
            </div>
            <div className="block md:hidden">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                    className="px-3 py-2">
                    <svg
                        className="fill-current h-6 w-6"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div ref={navbarRef} className={`w-full md:flex md:w-auto ${isOpen ? "" : "hidden"}`}>
                {navLinks.map((item) =>
                    item.show ? (
                        <NavLink
                            key={nanoid()}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `mx-2 block text-center mt-4 md:mt-0 ${
                                    isActive ? "text-black" : "text-[#4d4d4d] hover:text-[#1a1a1a]"
                                }`
                            }>
                            {item.name}
                        </NavLink>
                    ) : null
                )}
                {userAuthStatus ? (
                    <Link
                        key={nanoid()}
                        onClick={handleClick}
                        className="mx-2 text-[#4d4d4d] hover:text-[#1a1a1a]">
                        {/* className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-4"> */}
                        Logout
                    </Link>
                ) : null}
            </div>
        </header>
    );
};

export default Header;
