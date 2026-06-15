import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollRevealText.css';

gsap.registerPlugin(ScrollTrigger);

export const ScrollRevealText = ({ text }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const words = containerRef.current.querySelectorAll('.reveal-word');
        
        // Use GSAP for buttery smooth, zero-lag scroll scrubbing instead of React re-renders
        const tween = gsap.fromTo(
            words,
            {
                opacity: 0.15,
                y: 15,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.05, // Slight stagger so words light up sequentially
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Animation starts when top of container is 85% down the screen
                    end: "center 40%", // Finishes when the center of the container is 40% down
                    scrub: 1, // 1 second of smoothing to completely eliminate scroll lag/jank
                }
            }
        );

        return () => {
            if (tween.scrollTrigger) tween.scrollTrigger.kill();
            tween.kill();
        };
    }, []);

    // Split text into words
    const wordsArray = text.split(" ");

    return (
        <section ref={containerRef} className="scroll-reveal-container">
            <div className="scroll-reveal-inner">
                {wordsArray.map((word, i) => (
                    <span key={i} className="reveal-word-wrapper">
                        <span className="reveal-word">{word}</span>
                    </span>
                ))}
            </div>
        </section>
    );
};

export default ScrollRevealText;
