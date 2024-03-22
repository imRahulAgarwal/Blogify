import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Blogs from "./pages/Blogs.jsx";
import Profile from "./pages/Profile.jsx";
import Blog from "./pages/Blog.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import AuthLayout from "./AuthLayout.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { ToastContainer } from "react-toastify";
import MyBlogs from "./pages/MyBlogs.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route
                path="login"
                element={
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="signup"
                element={
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                }
            />
            <Route path="blogs" element={<Blogs />} />
            <Route
                path="profile"
                element={
                    <AuthLayout>
                        <Profile />
                    </AuthLayout>
                }
            />
            <Route path="blogs/:blogId" element={<Blog />} />
            <Route
                path="add-blog"
                element={
                    <AuthLayout>
                        <AddBlog />
                    </AuthLayout>
                }
            />
            <Route
                path="edit-blog/:blogId"
                element={
                    <AuthLayout>
                        <EditBlog />
                    </AuthLayout>
                }
            />
            <Route
                path="forgot-password"
                element={
                    <AuthLayout authentication={false}>
                        <ForgotPassword />
                    </AuthLayout>
                }
            />
            <Route
                path="reset-password/:token"
                element={
                    <AuthLayout authentication={false}>
                        <ResetPassword />
                    </AuthLayout>
                }
            />
            <Route
                path="my-blogs"
                element={
                    <AuthLayout>
                        <MyBlogs />
                    </AuthLayout>
                }
            />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
);
