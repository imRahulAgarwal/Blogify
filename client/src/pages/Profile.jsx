import React, { useState } from "react";
import { Container, Input } from "../import";
import { useSelector } from "react-redux";
import { authService } from "../api/auth";
import { BarLoader } from "react-spinners";

const ProfileBlock = ({ data, label, pClasses = "" }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <p className={`text-gray-800 ${pClasses}`}>{data}</p>
        </div>
    );
};

const SectionTab = ({ activeTab, setActiveTab, tabName = "Profile", classes = "" }) => {
    return (
        <button
            className={`w-full py-2 px-4 rounded-md ${classes} ${
                activeTab ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab((prev) => !prev)}>
            {tabName}
        </button>
    );
};

const Profile = () => {
    const [showProfileTab, setShowProfileTab] = useState(true);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const { userData } = useSelector((state) => state.auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await authService.changePassword({
            oldPassword: currentPassword,
            newPassword,
            confirmPassword: confirmNewPassword,
        });
        if (data) {
            setShowProfileTab(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };
    return (
        <Container classes="flex flex-col mt-40 mb-20">
            {!userData ? (
                <BarLoader />
            ) : (
                <div className="w-full sm:px-10 px-5 py-8 bg-white rounded-lg">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-1/4 bg-gray-200">
                            <div className="p-4">
                                <SectionTab
                                    activeTab={showProfileTab}
                                    setActiveTab={setShowProfileTab}
                                    tabName="Profile"
                                />
                                <SectionTab
                                    activeTab={!showProfileTab}
                                    setActiveTab={setShowProfileTab}
                                    tabName="Change Password"
                                    classes="mt-2"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 bg-white p-4">
                            {showProfileTab && (
                                <div>
                                    <h1 className="text-xl font-bold mb-2">Profile Information</h1>
                                    <ProfileBlock data={userData.name} label="Name" />
                                    <ProfileBlock data={userData.email} label="Email" />
                                    <ProfileBlock
                                        data={userData.isAdmin ? "Admin" : "User"}
                                        label="Role"
                                    />
                                    <ProfileBlock
                                        data={userData.approvedBlogs}
                                        label="Blogs Approved"
                                        pClasses={"text-green-600 font-bold"}
                                    />

                                    <ProfileBlock
                                        data={userData.rejectedBlogs}
                                        label="Blogs Rejected"
                                        pClasses={"text-red-600 font-bold"}
                                    />
                                    <ProfileBlock
                                        data={userData.pendingBlogs}
                                        label="Blogs Pending"
                                        pClasses={"font-bold"}
                                    />
                                </div>
                            )}
                            {!showProfileTab && (
                                <div>
                                    <h1 className="text-xl font-bold mb-2">Change Password</h1>
                                    <form onSubmit={handleSubmit} className="flex flex-col">
                                        <Input
                                            type="password"
                                            value={currentPassword}
                                            handleChange={setCurrentPassword}
                                            placeholder="Current Password"
                                            required={true}
                                            id="current-password"
                                            classes="block text-gray-700 text-sm font-bold "
                                        />
                                        <Input
                                            type="password"
                                            value={newPassword}
                                            handleChange={setNewPassword}
                                            placeholder="New Password"
                                            id="new-password"
                                            required={true}
                                            classes="block text-gray-700 text-sm font-bold "
                                        />
                                        <Input
                                            type="password"
                                            value={confirmNewPassword}
                                            handleChange={setConfirmNewPassword}
                                            placeholder="Confirm New Password"
                                            id="new-confirm-password"
                                            required={true}
                                            classes="block text-gray-700 text-sm font-bold "
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-auto">
                                            Change Password
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Profile;
