import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        { name: "Home", to: "/" },
        { name: "About Us", to: "/about-us" },
        { name: "Blogs", to: "/blogs" },
    ];

    const otherLinks = [
        { name: "Privacy Policy", to: "#" },
        { name: "Terms and Conditions", to: "#" },
        { name: "Contact Us", to: "#" },
    ];

    return (
        <footer className="bg-gray-800 text-white p-8">
            <div className="sm:mx-20">
                <div className="container mx-auto flex max-sm:flex-col">
                    <div className="flex-1">
                        <h2 className="footer-title">Blogify</h2>
                        <p className="footer-tagline">
                            Craft Your Narrative: Explore, Express, Engage with Blogify!.
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col sm:px-4 py-2 max-sm:mt-6">
                        <p className="underline underline-offset-8">Important Links</p>
                        {footerLinks.map((item) => (
                            <NavLink
                                key={nanoid()}
                                to={item.to}
                                className={({ isActive }) =>
                                    `mt-4 ${isActive ? "text-yellow-300" : ""}`
                                }>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col sm:px-4 py-2 max-sm:mt-6">
                        <p className="underline underline-offset-8">Other Links</p>
                        {otherLinks.map((item) => (
                            <NavLink to={item.to} className="mt-4" key={nanoid()}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
