import React, { useEffect, useRef } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children }) => (
    <div className="scroll-stack-card">{children}</div>
);

const ScrollStack = ({ children, stackPosition = '15%' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = Array.from(container.querySelectorAll('.scroll-stack-card'));
        if (cards.length === 0) return;

        let cardTops = [];
        let animationFrame = null;

        const targets = cards.map(() => ({ y: 0, scale: 1, opacity: 1, stacked: false }));
        const current = cards.map(() => ({ y: 0, scale: 1, opacity: 1 }));

        const measureCardTops = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const containerTop = container.getBoundingClientRect().top + scrollY;
            cardTops = cards.map((card) => containerTop + card.offsetTop);
        };

        const computeTargets = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const vh = window.innerHeight;
            const stackThreshold = (parseFloat(stackPosition) / 100) * vh;

            if (cardTops.length !== cards.length) {
                measureCardTops();
            }

            cards.forEach((_, i) => {
                const naturalTop = cardTops[i];
                const offset = naturalTop - scrollY - stackThreshold;

                if (offset <= 0) {
                    const depth = Math.abs(offset) / vh;
                    const staggerProgress = Math.min(1, depth / 0.08);
                    const stagger = i * 15 * staggerProgress;

                    const scale = Math.max(0.86, 1 - (i * 0.045) - (depth * 0.02));
                    const translateY = offset + stagger;
                    const opacity = Math.max(0.4, 1 - (depth * 0.6));

                    targets[i].y = translateY;
                    targets[i].scale = scale;
                    targets[i].opacity = opacity;
                    targets[i].stacked = true;
                } else {
                    targets[i].y = 0;
                    targets[i].scale = 1;
                    targets[i].opacity = 1;
                    targets[i].stacked = false;
                }
            });
        };

        const animate = () => {
            let keepRunning = false;

            cards.forEach((card, i) => {
                // Lerp motion to remove jitter in both upward and downward scroll.
                current[i].y += (targets[i].y - current[i].y) * 0.22;
                current[i].scale += (targets[i].scale - current[i].scale) * 0.18;
                current[i].opacity += (targets[i].opacity - current[i].opacity) * 0.18;

                card.style.transform = `translate3d(0, ${current[i].y.toFixed(3)}px, 0) scale(${current[i].scale.toFixed(4)})`;
                card.style.opacity = String(current[i].opacity);
                card.style.zIndex = String(i + 1);
                card.classList.toggle('is-stacked', targets[i].stacked);

                if (
                    Math.abs(targets[i].y - current[i].y) > 0.15 ||
                    Math.abs(targets[i].scale - current[i].scale) > 0.001 ||
                    Math.abs(targets[i].opacity - current[i].opacity) > 0.002
                ) {
                    keepRunning = true;
                }
            });

            if (keepRunning) {
                animationFrame = window.requestAnimationFrame(animate);
            } else {
                animationFrame = null;
            }
        };

        const scheduleAnimation = () => {
            computeTargets();
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(animate);
            }
        };

        const handleScroll = () => {
            scheduleAnimation();
        };

        const handleResize = () => {
            measureCardTops();
            scheduleAnimation();
        };

        const resizeObserver =
            typeof ResizeObserver !== 'undefined'
                ? new ResizeObserver(() => {
                    measureCardTops();
                    scheduleAnimation();
                })
                : null;

        if (resizeObserver) {
            resizeObserver.observe(container);
            cards.forEach((card) => resizeObserver.observe(card));
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        measureCardTops();
        scheduleAnimation();

        return () => {
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, [stackPosition]);

    return (
        <div ref={containerRef} className="scroll-stack-scroller" style={{ '--stack-top': stackPosition }}>
            {children}
        </div>
    );
};

export default ScrollStack;