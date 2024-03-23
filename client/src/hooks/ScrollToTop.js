import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAuthorId, setPageNumber } from "../store/post/postSlice";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const { pageNumber } = useSelector((state) => state.blog);
    const { userData } = useSelector((state) => state.auth);
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
        console.log(pathname);
        if (pathname.includes("my-blogs")) dispatch(setAuthorId(userData._id));
        else dispatch(setAuthorId(null));
    }, [pathname]);
};

export default ScrollToTop;
