import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer-based lazy loading
 * Returns ref, isVisible state, and Image object
 */
export const useLazyLoad = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [imageData, setImageData] = useState({ width: 0, height: 0 });
    const rootMargin = options.rootMargin ?? '50px';
    const threshold = options.threshold ?? 0.01;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            observer.disconnect();
        };
    }, [rootMargin, threshold]);

    return { ref, isVisible, imageData, setImageData };
};
