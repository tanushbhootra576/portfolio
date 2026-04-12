import { useMemo } from 'react';

/**
 * Generates responsive image srcSet and sizes based on viewport
 * Optimizes for different device pixel ratios and screen widths
 */
export const useResponsiveImage = (basePath, imageId) => {
    return useMemo(() => {
        const isPortfolioWebp = basePath?.startsWith('/portfolio/') && basePath?.endsWith('.webp');

        // Use pre-generated files like: image-480w.webp, image-800w.webp, image-1200w.webp
        let srcSet = basePath;
        if (isPortfolioWebp) {
            const baseNoExt = basePath.slice(0, -5);
            srcSet = `
                ${baseNoExt}-480w.webp 480w,
                ${baseNoExt}-800w.webp 800w,
                ${baseNoExt}-1200w.webp 1200w,
                ${basePath} 1600w
            `.trim();
        }

        const sizes = `
            (max-width: 480px) 100vw,
            (max-width: 768px) 50vw,
            (max-width: 1200px) 33vw,
            25vw
        `.trim();

        return { srcSet, sizes };
    }, [basePath, imageId]);
};

/**
 * Generates LQIP (Low Quality Image Placeholder) using a simple blur effect
 * In production, you'd use pre-generated tiny blurred versions
 */
export const generateLQIP = (src) => {
    // Canvas-based LQIP generation (simple version)
    // In production, use pre-generated LQIP images
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3C/svg%3E`;
};
