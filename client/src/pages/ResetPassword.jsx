import React, { useState } from "react";
import { Button, Container, Input } from "../import";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "../api/auth";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    if (!token) return navigate("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await authService.resetPassword({ confirmPassword, newPassword, token });
        if (data) navigate("/login");
        else navigate("/");
    };

    return (
        <div className="min-h-screen flex">
            <Container classes="flex flex-col my-auto">
                <div className="shadow-xl mx-auto rounded-lg max-w-xl w-full bg-white py-5 px-5">
                    <h1 className="section-title">Reset Password</h1>
                    <form onSubmit={handleSubmit} className="sm:px-5">
                        <Input
                            value={newPassword}
                            handleChange={setNewPassword}
                            placeholder="New Password"
                            type="password"
                            id="new-password"
                            required={true}
                        />
                        <Input
                            value={confirmPassword}
                            handleChange={setConfirmPassword}
                            placeholder="Confirm Password"
                            id="new-confirm-password"
                            type="password"
                            required={true}
                        />
                        <div className="flex flex-col ">
                            <Button
                                type="submit"
                                classes="bg-green-600 px-6 py-2 hover:bg-green-400 mx-10 text-white font-medium"
                            />
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default ResetPassword;
