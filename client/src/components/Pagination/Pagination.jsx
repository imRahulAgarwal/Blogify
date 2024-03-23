import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreasePageNumber, increasePageNumber } from "../../store/post/postSlice";

const Pagination = () => {
    const { pageNumber, totalPages } = useSelector((state) => state.blog);
    const dispatch = useDispatch();
    return (
        <div className="flex mx-auto my-5">
            <button
                onClick={() => dispatch(decreasePageNumber())}
                className="mx-2 bg-blue-300 hover:bg-blue-400 px-6 py-3 max-sm:px-4 max-sm:py-1 rounded-lg">
                Prev Page
            </button>
            <span className="mx-2 my-auto">
                {pageNumber}..{totalPages}
            </span>
            <button
                onClick={() => dispatch(increasePageNumber())}
                className="mx-2 bg-blue-300 hover:bg-blue-400 px-6 py-3 max-sm:px-4 max-sm:py-1 rounded-lg">
                Next Page
            </button>
        </div>
    );
};

export default Pagination;
