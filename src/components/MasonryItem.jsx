import React, { memo, useCallback } from 'react';
import LazyImage from './LazyImage';

/**
 * MasonryItem Component
 *
 * Features:
 * - Memoized to prevent unnecessary re-renders
 * - Applies animations only on first render
 * - Uses LazyImage for optimal image loading
 * - Handles click interactions
 *
 * Props:
 * - item: { id, img, url, height }
 * - position: { x, y, w, h }
 * - animate: boolean
 * - animationProps: { opacity, x, y, scale, etc. }
 * - onAnimationComplete: callback
 */
const MasonryItem = memo(
    ({
        item,
        position,
        animate = true,
        animationStyle = {},
        onClick = () => {},
        blurToFocus = false,
    }) => {
        const handleClick = useCallback(() => {
            onClick(item);
        }, [item, onClick]);

        const itemStyle = {
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${position.w}px`,
            height: `${position.h}px`,
            willChange: animate ? 'transform, opacity' : 'auto',
            ...animationStyle,
        };

        return (
            <div
                className={`item-wrapper ${blurToFocus ? 'blur-to-focus' : ''}`}
                style={itemStyle}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                aria-label={`Portfolio item ${item.id}`}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick();
                    }
                }}
            >
                <LazyImage
                    src={item.img}
                    alt={`Portfolio image ${item.id}`}
                    className="item-img"
                    aspectRatio={`${position.w}/${position.h}`}
                    useResponsive={true}
                    placeholderColor="#1a1a1a"
                />
            </div>
        );
    }
);

MasonryItem.displayName = 'MasonryItem';

export default MasonryItem;
