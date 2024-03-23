import React, { useState } from "react";
import { Button, Container, Input } from "../import";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/auth";
import { ScaleLoader } from "react-spinners";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        const data = await authService.forgotPassword({ email });
        if (data) navigate("/");
        else setEmail("");
    };

    return (
        <div className="min-h-screen flex">
            <Container classes="flex flex-col my-auto">
                {loader ? (
                    <ScaleLoader />
                ) : (
                    <div className="shadow-xl mx-auto rounded-lg max-w-xl w-full bg-white py-5 px-5">
                        <h1 className="section-title">Forgot Password</h1>
                        <h2 className="text-center tex-sm">
                            Send a mail containing password reset link.
                        </h2>
                        <form onSubmit={handleSubmit} className="sm:px-5">
                            <Input
                                value={email}
                                handleChange={setEmail}
                                placeholder="Your E-Mail"
                                id="email-address"
                                type="email"
                                required={true}
                            />
                            <div className="flex flex-col ">
                                <Button
                                    type="submit"
                                    classes="bg-green-600 px-6 py-2 hover:bg-green-400 mx-10 text-white font-medium"
                                />
                                <Link
                                    to="/login"
                                    className="text-center mt-4 text-blue-500 underline underline-offset-4 hover:text-blue-700">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default ForgotPassword;
