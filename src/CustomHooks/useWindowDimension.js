import { useState, useEffect } from "react";
import { debounce } from "lodash";

export function useWindowDimension() {
    const [dimension, setDimension] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const debouncedResizeHandler = debounce(() => {
            setDimension([window.innerWidth, window.innerHeight]);
        }, 100);
        window.addEventListener("resize", debouncedResizeHandler);
        return () => {
            window.removeEventListener("resize", debouncedResizeHandler);
            setDimension([]);
        };
    }, []);

    return dimension;
}