import React, { useEffect, useState } from "react";
import { Footer, Header } from "./import";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "./api/auth";
import { setBlogs } from "./store/post/postSlice";
import { login, logout } from "./store/auth/authSlice";
import { blogService } from "./api/blogs";
import ScrollToTop from "./hooks/ScrollToTop";
import { ScaleLoader } from "react-spinners";

const App = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);
    const { pageNumber, authorId } = useSelector((state) => state.blog);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        authService.profile().then(({ user }) => {
            if (user) {
                dispatch(login(user));
            } else {
                dispatch(logout());
            }
            setLoader(true);
        });
    }, []);

    useEffect(() => {
        blogService.getBlogs(pageNumber, authorId).then((data) => {
            if (data.blogs) dispatch(setBlogs(data));
            else dispatch(setBlogs([]));
        });
    }, [pageNumber, authorId, userData]);

    return (
        <div className="flex flex-col min-h-screen relative">
            {!loader ? (
                <ScaleLoader className="mx-auto my-auto" />
            ) : (
                <>
                    {window.location.pathname.includes("reset-password") ? null : <Header />}
                    <Outlet />
                    <Footer />
                    <ScrollToTop />
                </>
            )}
        </div>
    );
};

export default App;
