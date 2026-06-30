import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const shouldSkipSmoothScroll =
            window.matchMedia('(max-width: 768px)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (shouldSkipSmoothScroll) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 0.9,
            smoothWheel: true,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop(value) {
                if (arguments.length) {
                    lenis.scrollTo(value, { immediate: true });
                }
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.documentElement.style.transform
                ? "transform"
                : "fixed",
        });

        const onRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", onRefresh);
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
