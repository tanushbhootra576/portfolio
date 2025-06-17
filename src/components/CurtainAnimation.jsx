import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CurtainOnScroll = ({ children, triggerId = 'curtain-trigger' }) => {
    const curtainRef = useRef();

    useLayoutEffect(() => {
        gsap.set(curtainRef.current, { y: 0, backgroundColor: '#000000' });

        gsap.to(curtainRef.current, {
            y: '-100%',
            backgroundColor: "#111",
            duration: 1.8,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: `#${triggerId}`,
                start: 'top 80%',
                end: 'top 30%',
                scrub: true,
            },
        });
    }, [triggerId]);

    return (
        <div id={triggerId} style={{ position: 'relative', overflow: 'hidden' }}>
            <div
                ref={curtainRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#000000',
                    zIndex: 10,
                    pointerEvents: 'none',
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};

export default CurtainOnScroll;
