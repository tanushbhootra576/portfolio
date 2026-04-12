import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export const useLocomotiveScroll = () => {
  const scrollRef = useRef(null);
  const locomotiveScrollInstance = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Initialize Locomotive Scroll
    locomotiveScrollInstance.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    // Update GSAP ScrollTrigger when Locomotive Scroll updates
    const handleScroll = () => {
      if (window.gsap && window.gsap.ticker) {
        window.gsap.ticker.wake();
      }
    };

    locomotiveScrollInstance.current.on("scroll", handleScroll);

    return () => {
      if (locomotiveScrollInstance.current) {
        locomotiveScrollInstance.current.destroy();
      }
    };
  }, []);

  return { scrollRef, locomotiveScrollInstance };
};

export default useLocomotiveScroll;
