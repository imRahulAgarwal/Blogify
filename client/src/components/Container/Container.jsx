import React, { memo } from "react";

const Container = ({ children, classes = "" }) => {
    return <div className={`container lg:px-40 md:px-20 px-10 mx-auto ${classes}`}>{children}</div>;
};

export default memo(Container);
