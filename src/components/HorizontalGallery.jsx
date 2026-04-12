import React, { useEffect, useRef } from "react";
import "./HorizontalGallery.css";

// Two-row scroll-driven horizontal gallery
const HorizontalGallery = ({ items = [] }) => {
  const rowARef = useRef(null);
  const rowBRef = useRef(null);
  const rafRef = useRef(null);
  const progressRef = useRef(0);

  // split items roughly in two rows
  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);

  const updateTransforms = () => {
    const doc = document.documentElement;
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    progressRef.current = progress;

    const apply = (track, direction = 1, speed = 1) => {
      if (!track) return;
      const trackEl = track;
      const container = trackEl.parentElement;
      const maxShift = Math.max(trackEl.scrollWidth - container.clientWidth, 0);
      const shift = maxShift * progress * speed * direction;
      trackEl.style.transform = `translate3d(${-shift}px,0,0)`;
    };

    apply(rowARef.current, 1, 1.0); // leftward
    apply(rowBRef.current, -1, 0.85); // rightward (opposite)
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        updateTransforms();
        ticking = false;
      });
    };

    const onResize = () => {
      // recompute transforms on resize to keep maxShift accurate
      updateTransforms();
    };

    // initial set
    updateTransforms();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  const handleClick = (url) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="hg-wrapper hg-scroll-driven">
      <div className="hg-row">
        <div className="hg-track-row" ref={rowARef} aria-hidden="false">
          {rowA.map((item) => (
            <button
              key={item.id}
              type="button"
              className="hg-item"
              onClick={() => handleClick(item.url)}
            >
              <div className="hg-image-wrap">
                <img src={item.img} alt="Gallery item" loading="lazy" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="hg-row hg-row-reverse">
        <div className="hg-track-row" ref={rowBRef} aria-hidden="false">
          {rowB.map((item) => (
            <button
              key={item.id}
              type="button"
              className="hg-item"
              onClick={() => handleClick(item.url)}
            >
              <div className="hg-image-wrap">
                <img src={item.img} alt="Gallery item" loading="lazy" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalGallery;
