import React, { memo, useState } from "react";

const Input = ({
    type = "text",
    classes = "",
    required = true,
    value = "",
    placeholder = "",
    id = "",
    handleChange = () => {},
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex my-3">
            <input
                type={type !== "password" ? type : showPassword ? "text" : type}
                className={`outline-none border p-3 w-full ${classes} ${
                    type === "password" ? "rounded-s-md border-e-0" : "rounded-md"
                }`}
                value={value}
                id={id}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
                required={required}
            />
            {type !== "password" ? null : (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="rounded-e-lg border px-2">
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
        </div>
    );
};

export default memo(Input);
