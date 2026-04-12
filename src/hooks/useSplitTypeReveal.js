import { useLayoutEffect } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSplitTypeReveal(
  ref,
  {
    enabled = true,
    types = "lines, words, chars",
    start = "top 80%",
    duration = 0.65,
    ease = "circ.in",
    stagger = 0.12,
    rotationZ = 10,
    y = "110%",
  } = {},
) {
  useLayoutEffect(() => {
    const el = ref?.current;
    if (!el || !enabled) return;

    const split = new SplitType(el, {
      types,
      tagName: "span",
    });

    const lines = el.querySelectorAll(".line");

    const tween = gsap.from(lines, {
      y,
      opacity: 1,
      rotationZ,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split.revert();
    };
  }, [ref, enabled, types, start, duration, ease, stagger, rotationZ, y]);
}
