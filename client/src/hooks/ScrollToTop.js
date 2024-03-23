import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAuthorId, setPageNumber } from "../store/post/postSlice";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const { pageNumber, authorId } = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    useEffect(() => {
        const scrollToTop = () => {
            const rootElement = document.documentElement;
            rootElement.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
        scrollToTop();
    }, [pathname, pageNumber]);

    useEffect(() => {
        dispatch(setPageNumber());

        if (pathname.includes("my-blogs")) dispatch(setAuthorId(authorId));
        else dispatch(setAuthorId(null));
    }, [pathname]);
};

export default ScrollToTop;
