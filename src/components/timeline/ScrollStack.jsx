import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

gsap.registerPlugin(ScrollTrigger);

export const ScrollStackItem = ({ children, index = 0 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Native GSAP ScrollTrigger for the subtle push-back effect 
        // This replaces the laggy manual requestAnimationFrame loop
        const tween = gsap.to(card, {
            scale: 0.92,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                // The animation starts scaling the card down just as it hits the sticky point
                start: "top 15%", 
                end: "bottom top",
                scrub: 1, // 1 second smoothing completely eliminates jitter
            }
        });

        return () => {
            if (tween.scrollTrigger) tween.scrollTrigger.kill();
            tween.kill();
        };
    }, []);

    return (
        <div 
            ref={cardRef} 
            className="scroll-stack-card" 
            // The browser's native CSS position: sticky handles the exact stacking instantly
            // We give each card a slight downward offset so they look perfectly stacked like a deck
            style={{ 
                top: `calc(15vh + ${index * 15}px)`, 
                zIndex: index 
            }}
        >
            {children}
        </div>
    );
};

const ScrollStack = ({ children }) => {
    return (
        <div className="scroll-stack-scroller">
            {children}
        </div>
    );
};

export default ScrollStack;