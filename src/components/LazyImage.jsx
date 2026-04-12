import React, { useState, useCallback, memo } from 'react';
import { useLazyLoad } from '../hooks/useLazyLoad';
import { useResponsiveImage, generateLQIP } from '../hooks/useResponsiveImage';
import './LazyImage.css';

/**
 * Optimized LazyImage Component
 *
 * Features:
 * - Intersection Observer-based lazy loading
 * - Responsive image support (srcSet + sizes)
 * - Blur-up LQIP effect
 * - Prevents CLS (Cumulative Layout Shift)
 * - Accessible (alt text, proper semantics)
 * - Memoized to prevent unnecessary re-renders
 *
 * @param {string} src - Image source path
 * @param {string} alt - Accessibility alt text
 * @param {string} className - CSS class
 * @param {object} style - Inline styles
 * @param {function} onLoad - Callback when image loads
 * @param {boolean} useResponsive - Enable responsive images
 * @param {string} placeholderColor - LQIP placeholder color
 */
const LazyImage = memo(
    ({
        src,
        alt = 'Image',
        className = '',
        style = {},
        onLoad = () => {},
        useResponsive = false,
        placeholderColor = '#e0e0e0',
        aspectRatio = '16/9'
    }) => {
        const { ref, isVisible } = useLazyLoad();
        const [imageLoaded, setImageLoaded] = useState(false);
        const [imageError, setImageError] = useState(false);
        const { srcSet, sizes } = useResponsiveImage(src);

        const handleLoad = useCallback(() => {
            setImageLoaded(true);
            onLoad();
        }, [onLoad]);

        const handleError = useCallback(() => {
            setImageError(true);
            console.warn(`Image failed to load: ${src}`);
        }, [src]);

        return (
            <div
                ref={ref}
                className={`lazy-img-wrapper ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`}
                style={{
                    aspectRatio,
                    backgroundColor: placeholderColor,
                    position: 'relative',
                    overflow: 'hidden',
                    ...style
                }}
            >
                {/* Placeholder blur effect */}
                {!imageLoaded && !imageError && (
                    <div className="lazy-img-placeholder" style={{ backgroundColor: placeholderColor }} />
                )}

                {/* Main image - only renders if visible */}
                {isVisible && (
                    <>
                        <img
                            src={src}
                            srcSet={useResponsive ? srcSet : undefined}
                            sizes={useResponsive ? sizes : undefined}
                            alt={alt}
                            className={`lazy-img ${className}`}
                            onLoad={handleLoad}
                            onError={handleError}
                            loading="lazy"
                            decoding="async"
                        />
                    </>
                )}

                {/* Error fallback */}
                {imageError && (
                    <div className="lazy-img-error">
                        <span>Failed to load image</span>
                    </div>
                )}
            </div>
        );
    }
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
