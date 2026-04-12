import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ScrollSplitText = ({
  text,
  className = "",
  style,
  fullWidth = true,
  start = "top 50%",
  end = "bottom 50%",
  scrub = true,
  stagger = 0.05,
  duration = 1,
  ease = "power2.out",
  from = { opacity: 0, x: 80 },
  flow = false,
  flowMode = "settle",
  flowStartX,
  flowEndX,
  pin = false,
  pinSpacing = true,
  pinEnd,
  float = false,
  floatAmplitude = 10,
  floatDuration = 2.2,
  randomStagger = false,
}) => {
  const textRef = useRef(null);
  const wrapperRef = useRef(null);
  const splitInstanceRef = useRef(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const triggerEl = wrapperRef.current || el;

    const ctx = gsap.context(() => {
      splitInstanceRef.current = new SplitText(el, { type: "chars" });
      const chars = splitInstanceRef.current.chars;

      const scrollTriggerEnd = pin ? (pinEnd ?? end) : end;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start,
          end: scrollTriggerEnd,
          scrub,
          pin: pin ? triggerEl : false,
          pinSpacing,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(chars, { display: "inline-block", ...from });
      const staggerVal = randomStagger
        ? { each: stagger, from: "random" }
        : stagger;
      tl.to(
        chars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          stagger: staggerVal,
          duration,
          ease,
        },
        0,
      );

      if (flow) {
        const computeFromX = () =>
          typeof flowStartX === "function"
            ? flowStartX()
            : (flowStartX ?? window.innerWidth);

        const computeToX = () => {
          if (typeof flowEndX === "function") return flowEndX();
          if (flowEndX != null) return flowEndX;
          if (flowMode === "marquee") {
            const width = el.getBoundingClientRect().width;
            return -width;
          }
          return 0;
        };

        tl.fromTo(
          el,
          { x: () => computeFromX() },
          { x: () => computeToX(), ease: "none" },
          0,
        );
      }

      if (float) {
        gsap.to(el, {
          y: floatAmplitude,
          duration: floatDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, triggerEl);

    return () => {
      ctx.revert();
      splitInstanceRef.current?.revert();
      splitInstanceRef.current = null;
    };
  }, [
    start,
    end,
    scrub,
    stagger,
    duration,
    ease,
    from,
    flow,
    flowMode,
    flowStartX,
    flowEndX,
    pin,
    pinSpacing,
    pinEnd,
    float,
    floatAmplitude,
    floatDuration,
    randomStagger,
  ]);

  if (flow) {
    return (
      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          overflow: "hidden",
          ...(fullWidth ? { display: "block" } : null),
        }}
      >
        <span
          ref={textRef}
          className={className}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            willChange: "transform",
            ...style,
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <span
      ref={textRef}
      className={className}
      style={{
        ...(fullWidth ? { display: "block", width: "100%" } : null),
        ...style,
      }}
    >
      {text}
    </span>
  );
};

export default ScrollSplitText;
