import React, { memo } from "react";

const Button = ({ type = "button", text = "Submit", classes = "" }) => {
    return (
        <button type={type} className={`border rounded-lg my-2 ${classes}`}>
            {text}
        </button>
    );
};

export default memo(Button);
