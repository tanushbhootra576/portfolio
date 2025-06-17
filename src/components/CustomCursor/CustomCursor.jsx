import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css'; 

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [showCursor, setShowCursor] = useState(false);

    useEffect(() => {
       
        const shouldShowCursor = window.innerWidth > 768 && !('ontouchstart' in window);
        setShowCursor(shouldShowCursor);

        if (!shouldShowCursor) return;

        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        document.addEventListener('mousemove', moveCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    if (!showCursor) return null;

    return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
