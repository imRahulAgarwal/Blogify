import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    totalPages: 1,
    pageNumber: 1,
    authorId: null,
};

const postSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload.blogs;
            state.totalPages = action.payload.totalPages;
        },
        increasePageNumber: (state) => {
            if (state.pageNumber < state.totalPages) {
                state.pageNumber += 1;
            }
        },
        decreasePageNumber: (state) => {
            if (state.pageNumber > 1) {
                state.pageNumber -= 1;
            }
        },
        setPageNumber: (state) => {
            state.pageNumber = 1;
        },
        setAuthorId: (state, action) => {
            state.authorId = action.payload;
        },
    },
});

export const { setBlogs, increasePageNumber, decreasePageNumber, setPageNumber, setAuthorId } =
    postSlice.actions;

export default postSlice.reducer;
