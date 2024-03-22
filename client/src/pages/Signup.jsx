import React, { useState } from "react";
import { Button, Container, Input } from "../import";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/auth";
import { login } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user } = await authService.register({ name, email, password });
        if (user) {
            dispatch(login(user));
            navigate("/");
        } else {
            setName("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen flex">
            <Container classes="mx-auto my-auto">
                <div className="shadow-xl mx-auto rounded-lg max-w-xl w-full bg-white py-5">
                    <h1 className="section-title">Create an account</h1>
                    <form onSubmit={handleSubmit} className="sm:px-10 px-5">
                        <Input
                            value={name}
                            handleChange={setName}
                            placeholder="Your Name"
                            id="user-name"
                        />
                        <Input
                            value={email}
                            id="user-email"
                            handleChange={setEmail}
                            placeholder="Your E-Mail"
                            type="email"
                        />
                        <Input
                            value={password}
                            handleChange={setPassword}
                            placeholder="Your Password"
                            id="user-password"
                            type="password"
                        />
                        <div className="flex flex-col">
                            <Button
                                type="submit"
                                classes="bg-green-600 px-6 py-2 hover:bg-green-400 mx-10 text-white font-medium"
                            />
                            <Link
                                to="/login"
                                className="text-center mt-4 text-blue-500 underline underline-offset-4 hover:text-blue-700">
                                Login to your account
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Signup;
