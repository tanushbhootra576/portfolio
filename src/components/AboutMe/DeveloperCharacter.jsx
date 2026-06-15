import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeveloperCharacter = () => {
    const charRef = useRef(null);

    useEffect(() => {
        const char = charRef.current;
        if (!char) return;

        let st;

        const updateAnimation = () => {
            if (st) st.kill();

            const parent = char.parentElement;
            const rect = parent.getBoundingClientRect();
            
            // Calculate exactly where the parent card is in the document
            const distanceToTop = rect.top + window.scrollY;
            
            // We want Mario to visually start near the top-right of the hero section
            const startY = -distanceToTop + (window.innerHeight * 0.15); // 15vh from top
            const startX = window.innerWidth * 0.3; // Offset to the right

            // The scroll position where the card reaches the center of the screen
            const endScroll = distanceToTop - (window.innerHeight * 0.5);

            // Animate from Hero section to the Card
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: 0, // Starts exactly when scroll is at 0
                    end: Math.max(endScroll, 100), // Ends when the card is in the middle of screen
                    scrub: 1.5, // Smooth syncing with scroll
                    invalidateOnRefresh: true,
                }
            });

            tl.fromTo(char, 
                { 
                    y: startY, 
                    x: startX, 
                    scale: 2.2, 
                    rotation: 15,
                    filter: 'drop-shadow(0px 30px 40px rgba(0,0,0,0.8))'
                },
                { 
                    y: 0, 
                    x: 0, 
                    scale: 1, 
                    rotation: 0,
                    filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.4))',
                    ease: "power2.out"
                }
            );

            // Add further movement after resting (parallax out)
            const tlAfter = gsap.timeline({
                scrollTrigger: {
                    trigger: parent,
                    start: "center center", 
                    end: "bottom top", 
                    scrub: 1,
                }
            });

            tlAfter.to(char, {
                y: -50,
                rotation: -10,
                scale: 0.9,
                ease: "none"
            });

            st = tl.scrollTrigger;
        };

        // Delay to allow images and masonry grid to calculate height
        const timeout = setTimeout(updateAnimation, 1000);

        // Update on resize
        window.addEventListener('resize', updateAnimation);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updateAnimation);
            if (st) st.kill();
        };
    }, []);

    // Continuous floating animation
    useEffect(() => {
        const char = charRef.current;
        if (!char) return;
        const img = char.querySelector('img');
        
        const floatAnim = gsap.to(img, {
            y: -10,
            rotation: 2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => floatAnim.kill();
    }, []);

    return (
        <div 
            ref={charRef} 
            className="dev-character-wrapper"
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 20,
                pointerEvents: 'none'
            }}
        >
            <img 
                src="/imgs/mario.png" 
                alt="Super Mario" 
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transformOrigin: 'center center',
                    willChange: 'transform'
                }} 
            />
        </div>
    );
};

export default DeveloperCharacter;
