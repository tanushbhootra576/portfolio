import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import MasonryItem from './MasonryItem';
import './Masonry.css';

/**
 * Optimized Masonry Component
 *
 * Key Performance Optimizations:
 * 1. ✅ Lazy grid calculation with useMemo
 * 2. ✅ Lazy image loading (no preload)
 * 3. ✅ Memoized MasonryItem components
 * 4. ✅ GSAP animations queued, not blocking
 * 5. ✅ Responsive images with srcSet
 * 6. ✅ Blur-up LQIP effect
 * 7. ✅ Prevent CLS with aspect ratios
 * 8. ✅ Accessible (aria labels, keyboard support)
 * 9. ✅ ResizeObserver for responsive grid
 *
 * @param {array} items - Image items array
 * @param {string} ease - GSAP easing function
 * @param {number} duration - Animation duration
 * @param {number} stagger - Stagger delay between items
 * @param {string} animateFrom - Animation direction
 * @param {boolean} scaleOnHover - Apply hover scale
 * @param {number} hoverScale - Hover scale factor
 * @param {boolean} blurToFocus - Blur-to-focus effect
 * @param {boolean} colorShiftOnHover - Color shift on hover
 */
const MasonryOptimized = memo(
    ({
        items,
        ease = 'power3.out',
        duration = 0.6,
        stagger = 0.05,
        animateFrom = 'bottom',
        scaleOnHover = true,
        hoverScale = 0.95,
        blurToFocus = true,
        colorShiftOnHover = false,
    }) => {
        const containerRef = useRef(null);
        const [containerWidth, setContainerWidth] = useState(0);
        const [columns, setColumns] = useState(4);
        const [isMobile, setIsMobile] = useState(false);
        const animatedItemsRef = useRef(new Set());

        // Responsive column count based on viewport
        useLayoutEffect(() => {
            const updateColumns = () => {
                const width = containerRef.current?.offsetWidth || 0;
                const isMobileView = width < 768;
                setIsMobile(isMobileView);

                let cols = 1;

                if (width >= 1500) cols = 5;
                else if (width >= 1000) cols = 4;
                else if (width >= 600) cols = 3;
                else if (width >= 400) cols = 2;
                else cols = 1;

                setColumns(cols);
                setContainerWidth(width);
            };

            const resizeObserver = new ResizeObserver(updateColumns);
            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }

            updateColumns();

            return () => resizeObserver.disconnect();
        }, []);

        // Filter items for mobile (load fewer images)
        const filteredItems = useMemo(() => {
            if (isMobile) {
                // Show only 8 items on mobile for better performance
                return items.slice(0, 8);
            }
            return items;
        }, [items, isMobile]);

        // Compute grid layout (memoized)
        const gridLayout = useMemo(() => {
            if (!containerWidth || !columns) return [];

            const colHeights = new Array(columns).fill(0);
            const columnWidth = containerWidth / columns;

            return filteredItems.map((item) => {
                const col = colHeights.indexOf(Math.min(...colHeights));
                const x = columnWidth * col;
                const itemHeight = (item.height / 400) * columnWidth; // Aspect ratio calculation

                const position = {
                    x: Math.round(x),
                    y: Math.round(colHeights[col]),
                    w: Math.round(columnWidth),
                    h: Math.round(itemHeight),
                };

                colHeights[col] += itemHeight + 12; // 12px gap

                return { ...item, position };
            });
        }, [filteredItems, containerWidth, columns]);

        // Calculate max height
        const maxHeight = useMemo(() => {
            if (!gridLayout.length) return 0;
            return Math.max(...gridLayout.map((item) => item.position.y + item.position.h));
        }, [gridLayout]);

        // Get initial animation position
        const getInitialPosition = useCallback(
            (item) => {
                let direction = animateFrom;
                if (animateFrom === 'random') {
                    const directions = ['top', 'bottom', 'left', 'right'];
                    direction = directions[Math.floor(Math.random() * directions.length)];
                }

                const pos = item.position;
                switch (direction) {
                    case 'top':
                        return { x: pos.x, y: -200 };
                    case 'bottom':
                        return { x: pos.x, y: window.innerHeight + 200 };
                    case 'left':
                        return { x: -200, y: pos.y };
                    case 'right':
                        return { x: window.innerWidth + 200, y: pos.y };
                    case 'center':
                        return {
                            x: containerWidth / 2 - pos.w / 2,
                            y: window.innerHeight / 2 - pos.h / 2,
                        };
                    default:
                        return { x: pos.x, y: pos.y + 100 };
                }
            },
            [animateFrom, containerWidth]
        );

        // Animate items on mount (only animate items not already animated)
        useEffect(() => {
            const itemElements = containerRef.current?.querySelectorAll('.item-wrapper') || [];

            const itemsToAnimate = Array.from(itemElements).filter((el) => {
                const index = Array.from(itemElements).indexOf(el);
                return index < gridLayout.length && !animatedItemsRef.current.has(index);
            });

            if (itemsToAnimate.length === 0) return;

            itemsToAnimate.forEach((el, idx) => {
                const itemIndex = Array.from(itemElements).indexOf(el);
                const item = gridLayout[itemIndex];
                if (!item) return;

                animatedItemsRef.current.add(itemIndex);

                const initialPos = getInitialPosition(item);

                gsap.fromTo(
                    el,
                    {
                        x: initialPos.x - item.position.x,
                        y: initialPos.y - item.position.y,
                        opacity: 0,
                        scale: 0.9,
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration,
                        delay: idx * stagger,
                        ease,
                    }
                );
            });
        }, [gridLayout, duration, stagger, ease, getInitialPosition]);

        // Hover effects
        useEffect(() => {
            const itemElements = containerRef.current?.querySelectorAll('.item-wrapper') || [];

            itemElements.forEach((el) => {
                const onHover = () => {
                    if (scaleOnHover) {
                        gsap.to(el, {
                            scale: hoverScale,
                            duration: 0.3,
                            overwrite: 'auto',
                        });
                    }
                    if (blurToFocus && el.querySelector('.lazy-img')) {
                        gsap.to(el.querySelector('.lazy-img'), {
                            filter: 'blur(0px)',
                            duration: 0.3,
                        });
                    }
                };

                const onHoverOut = () => {
                    if (scaleOnHover) {
                        gsap.to(el, {
                            scale: 1,
                            duration: 0.3,
                            overwrite: 'auto',
                        });
                    }
                    if (blurToFocus && el.querySelector('.lazy-img')) {
                        gsap.to(el.querySelector('.lazy-img'), {
                            filter: 'blur(0px)',
                            duration: 0.3,
                        });
                    }
                };

                el.addEventListener('mouseenter', onHover);
                el.addEventListener('mouseleave', onHoverOut);

                return () => {
                    el.removeEventListener('mouseenter', onHover);
                    el.removeEventListener('mouseleave', onHoverOut);
                };
            });
        }, [scaleOnHover, hoverScale, blurToFocus]);

        const handleItemClick = useCallback((item) => {
            if (item.url && item.url !== '#') {
                window.open(item.url, '_blank', 'noopener');
            }
        }, []);

        // On mobile, render horizontal scroll gallery
        if (isMobile) {
            return (
                <div className="hgal-wrapper" ref={containerRef}>
                    <div className="hgal-track" style={{ justifyContent: 'center' }}>
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="hgal-card"
                                onClick={() => handleItemClick(item)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.id}
                                    className="hgal-img"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // On desktop, render grid layout
        return (
            <div
                ref={containerRef}
                className="masonry-container"
                style={{ height: `${maxHeight}px` }}
            >
                <div className="masonry-list" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {gridLayout.map((item) => (
                        <MasonryItem
                            key={item.id}
                            item={item}
                            position={item.position}
                            animate={true}
                            blurToFocus={blurToFocus}
                            isMobile={isMobile}
                            onClick={handleItemClick}
                        />
                    ))}
                </div>
            </div>
        );
    }
);

MasonryOptimized.displayName = 'MasonryOptimized';

export default MasonryOptimized;
