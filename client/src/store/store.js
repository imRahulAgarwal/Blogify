import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import postSlice from "./post/postSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        blog: postSlice,
    },
});

export default store;
