import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import './App.css'
import SmoothScroll from './components/SmoothScroll'
import { useLazyLoad } from './hooks/useLazyLoad'
import Navbar from './components/Navbar/Navbar'
import { LandingCmp1 } from './components/Landing/LandingCmp1'

const SmoothCursor = lazy(() =>
  import('./components/CustomCursor/SmoothCursor').then((mod) => ({ default: mod.SmoothCursor }))
);
const Compo = lazy(() => import('./components/RotatingText/Compo'));
const Certification = lazy(() => import('./components/Certification/Certification'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const WorldMapGrid = lazy(() => import('./components/WorldMapGrid'));
const Aurora = lazy(() => import('./components/Footer/Aurora'));
const Projects3DSection = lazy(() => import('./components/projects/Projects3DSection'));
const ScrollVelocity = lazy(() => import('./components/CustomCompo/ScrollVelocity'));
const MasonryOptimized = lazy(() => import('./components/MasonryOptimized'));
const AboutMe = lazy(() => import('./components/AboutMe/AboutMe'));
const Timeline = lazy(() => import('./components/timeline/TimeLine'));
const TheNewSkill = lazy(() => import('./components/Skills/TheNewSkill'));
const OpenSource = lazy(() => import('./components/OpenSource/OpenSource'));

const Spacer = ({ size = 48 }) => <div style={{ height: size }} />;

const LazySection = ({ children, minHeight = 280 }) => {
  const options = useMemo(() => ({ rootMargin: '300px', threshold: 0.01 }), []);
  const { ref, isVisible } = useLazyLoad(options);

  return (
    <div ref={ref} style={{ minHeight }}>
      {isVisible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
};

const DeferredMasonry = ({ items }) => {
  const { ref, isVisible } = useLazyLoad({ rootMargin: '200px', threshold: 0.01 });

  return (
    <div ref={ref} style={{ minHeight: 420 }}>
      {isVisible ? (
        <Suspense fallback={null}>
          <MasonryOptimized
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover
          />
        </Suspense>
      ) : null}
    </div>
  );
};

/**
 * Production portfolio images with lazy loading
 * Images are now loaded on-demand using Intersection Observer
 * No preloading = faster initial page load
 */
const items = [
  { id: '1', img: '/portfolio/2025-09-21_18-04-07_221.webp', url: '#', height: 400 },
  { id: '2', img: '/portfolio/2026-02-04_09-47-40_013.webp', url: '#', height: 350 },
  { id: '3', img: '/portfolio/IMG_20250131_182800.webp', url: '#', height: 500 },
  { id: '4', img: '/portfolio/IMG_20250201_183156.webp', url: '#', height: 300 },
  { id: '5', img: '/portfolio/IMG_20250221_213626.webp', url: '#', height: 450 },
  { id: '6', img: '/portfolio/IMG_20250228_183006.webp', url: '#', height: 400 },
  { id: '7', img: '/portfolio/IMG_20250321_183542.webp', url: '#', height: 350 },
  { id: '8', img: '/portfolio/IMG_20250429_184740.webp', url: '#', height: 500 },
  { id: '9', img: '/portfolio/IMG_20250528_060459.webp', url: '#', height: 300 },
  { id: '10', img: '/portfolio/IMG_20250615_191730.webp', url: '#', height: 450 },
  { id: '11', img: '/portfolio/IMG_20250615_191831.webp', url: '#', height: 400 },
  { id: '12', img: '/portfolio/IMG_20251031_180738.webp', url: '#', height: 350 },
  { id: '13', img: '/portfolio/IMG_20251209_162046.webp', url: '#', height: 500 },
  { id: '14', img: '/portfolio/IMG_20251220_175354_557.webp', url: '#', height: 300 },
  { id: '15', img: '/portfolio/IMG_20251223_175436_786.webp', url: '#', height: 450 },
  { id: '16', img: '/portfolio/IMG_20260104_180400.webp', url: '#', height: 400 },
  { id: '17', img: '/portfolio/IMG_20260117_145341.webp', url: '#', height: 350 },
  { id: '18', img: '/portfolio/IMG_20260203_173827.webp', url: '#', height: 500 },
  { id: '19', img: '/portfolio/IMG_20260212_181148.webp', url: '#', height: 300 },
  { id: '20', img: '/portfolio/Screenshot_2026-02-01-19-36-43-603_com.miui.gallery.webp', url: '#', height: 450 },
];

/**
 * Shuffle array utility
 * Memoize this in production if shuffling on every render
 */
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const App = () => {
  const [deferEnhancements, setDeferEnhancements] = useState(false);
  const shuffledItems = useMemo(() => shuffleArray(items), []);

  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const cancelIdleCallback = window.cancelIdleCallback || clearTimeout;
    const id = idleCallback(() => setDeferEnhancements(true));

    return () => cancelIdleCallback(id);
  }, []);

  const masonryItems = useMemo(
    () => shuffledItems.slice(0, deferEnhancements ? shuffledItems.length : 8),
    [shuffledItems, deferEnhancements]
  );

  return (
    <SmoothScroll>
      {deferEnhancements ? (
        <Suspense fallback={null}>
          <SmoothCursor />
        </Suspense>
      ) : null}
      <Navbar />
      <main id="main-content">
        {deferEnhancements ? (
          <Suspense fallback={null}>
            <Compo />
          </Suspense>
        ) : null}
        {/* <Spacer size={48} /> */}
        <LandingCmp1 />
        {/* <Spacer size={48} /> */}


        <DeferredMasonry items={masonryItems} />
        <Spacer size={300} />

        <section id="about">
          <LazySection minHeight={500}>
            <AboutMe />
          </LazySection>
        </section>

        <section id="skills">
          <LazySection minHeight={450}>
            <TheNewSkill />
          </LazySection>
        </section>

        <LazySection minHeight={420}>
          <Certification />
        </LazySection>
        {/* <Spacer size={48} /> */}

        <section id="projects">
          <LazySection minHeight={520}>
            <Projects3DSection />
          </LazySection>
        </section>

        <section id='opensource'>
          <LazySection minHeight={420}>
            <OpenSource />
          </LazySection>
        </section>
        <Spacer size={48} />
        <LazySection minHeight={120}>
          <ScrollVelocity
            texts={["Engineer by Degree, Developer by Passion |", "From Code to Creation |", "Turning ideas into code |", "Building the future |", "Innovating through code |"]}
            velocity={150}
          // className="custom-scroll-text"
          />
        </LazySection>

        <section id="experience">
          <LazySection minHeight={500}>
            <Timeline />
          </LazySection>
        </section>

        <LazySection minHeight={420}>
          <WorldMapGrid />
        </LazySection>
        <Spacer size={48} />
        <section id="contact">
          <LazySection minHeight={320}>
            <Footer />
          </LazySection>
        </section>
        {deferEnhancements ? (
          <Suspense fallback={null}>
            <Aurora
              colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
              blend={0.5}
              amplitude={1.0}
              speed={1}
            />
          </Suspense>
        ) : null}
      </main>
    </SmoothScroll>
  )
}

export default App;


