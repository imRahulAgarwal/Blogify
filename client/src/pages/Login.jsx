import React, { useState } from "react";
import { Button, Container, Input } from "../import";
import { Link } from "react-router-dom";
import { authService } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/auth/authSlice";
import { setBlogs } from "../store/post/postSlice";
import { blogService } from "../api/blogs";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user } = await authService.login({ email, password });
        if (user) {
            dispatch(login(user));
            const data = await blogService.getBlogs();
            if (data.blogs) dispatch(setBlogs(data));
        } else {
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen flex">
            <Container classes="flex flex-col my-auto">
                <div className="shadow-xl mx-auto rounded-lg max-w-xl w-full bg-white py-5">
                    <h1 className="section-title">Login</h1>
                    <form onSubmit={handleSubmit} className="sm:px-10 px-5">
                        <Input
                            value={email}
                            handleChange={setEmail}
                            placeholder="Your E-Mail"
                            type="email"
                            id="user-email"
                            required={true}
                        />
                        <Input
                            value={password}
                            handleChange={setPassword}
                            placeholder="Your Password"
                            type="password"
                            id="user-password"
                            required={true}
                        />
                        <div className="flex">
                            <Link
                                to="/forgot-password"
                                className="ml-auto underline underline-offset-2 text-blue-600">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="flex flex-col ">
                            <Button
                                type="submit"
                                classes="bg-green-600 px-6 py-2 hover:bg-green-400 mx-10 text-white font-medium"
                            />
                            <Link
                                to="/signup"
                                className="text-center mt-4 text-blue-500 underline underline-offset-4 hover:text-blue-700">
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;
