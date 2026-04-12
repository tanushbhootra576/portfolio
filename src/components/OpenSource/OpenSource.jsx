import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiPackage, FiDownload, FiTag, FiCode } from "react-icons/fi";
import { SiNpm } from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OpenSource.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────── */
const packages = [
    {
        name: "use-web-kit",
        label: "npm package",
        description:
            "A compact collection of zero-dependency, TypeScript-first React hooks for common browser concerns: idle task scheduling, cross-tab state sync, adaptive polling, network information, intersection observation, and page lifecycle. Each hook is SSR-safe, tree-shakeable, and designed for composition.",
        tech: ["TypeScript", "React 18+"],
        version: "v0.2.1",
        downloads: "277 / week",
        license: "MIT",
        github: "https://github.com/tanushbhootra576/use-web-kit",
        npm: "https://www.npmjs.com/package/use-web-kit",
        demo: "https://tanushbhootra576.github.io/use-web-kit/",
        status: "Actively maintained",
        snippet: `import { useNetworkStatus, useAdaptivePolling } from 'use-web-kit';

const { online } = useNetworkStatus();

useAdaptivePolling(fetchMetrics, {
  interval: 15_000,
  pauseOnBackground: true,
});`,
    },
    {
        name: "aetheris",
        label: "npm package",
        description:
            "A physics-native animation framework for React built on a zero-reconciliation architecture. Uses a centralized requestAnimationFrame ticker and a 4th-order Runge-Kutta integrator so motion properties — mass, tension, friction — produce organic 60fps+ movement without triggering React re-renders.",
        tech: ["TypeScript", "React", "RK4 Physics"],
        version: "v2.0.0",
        downloads: "76 / week",
        license: "MIT",
        github: "https://github.com/tanushbhootra576/aetheris",
        npm: "https://www.npmjs.com/package/aetheris",
        demo: "https://tanushbhootra576.github.io/aetheris/",
        status: "Developing",
        snippet: `import { MotionProvider, a } from 'aetheris';

<MotionProvider>
  <a.div
    animate={{ x: 200 }}
    config={{ mass: 1, tension: 170, friction: 26 }}
  />
</MotionProvider>`,
    },
    {
        name: "OpenMS-website",
        label: "open-source contribution",
        description:
            "Contributed UI/UX improvements to the OpenMS website by redesigning the mobile footer layout into a responsive multi-column grid. The update improved scanability, touch accessibility, and reduced excessive vertical scrolling on smaller screens.",
        tech: ["React", "CSS Grid", "Responsive UI/UX", "Open Source"],
        version: "PR #255",
        downloads: "Issue #254 closed",
        license: "MIT",
        github: "https://github.com/OpenMS/OpenMS-website/pull/255",
        primaryLabel: "Pull Request",

        secondaryLabel: "Issue",
        demo: "https://github.com/OpenMS/OpenMS-website",
        demoLabel: "Repository",
        status: "Merged contribution",
        snippet: `/* Mobile footer redesign */
.footer-links-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem 1rem;
    text-align: left;
}`,
    },
];

const AnimatedHeading = () => {
    const headingRef = useRef(null);
    const charsRef = useRef([]);
    const characters = useMemo(() => [..."OPEN SOURCE"], []);

    useEffect(() => {
        const heading = headingRef.current;
        const chars = charsRef.current.filter(Boolean);
        if (!heading || chars.length === 0) return;

        gsap.set(chars, {
            opacity: 0,
            y: 30,
            rotate: 45,
            scale: 0.5,
            transformOrigin: "50% 100%",
        });

        const tween = gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                end: "top 35%",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <div className="os-heading-wrap" ref={headingRef}>
            <h2 className="os-section-title os-title-stroke" aria-hidden="true">
                OPEN SOURCE
            </h2>

            <h2 className="os-section-title os-title-fill" aria-label="OPEN SOURCE">
                {characters.map((character, i) => (
                    <span
                        key={`${character}-${i}`}
                        ref={(node) => {
                            charsRef.current[i] = node;
                        }}
                        className="os-title-fill-char"
                    >
                        {character === " " ? "\u00A0" : character}
                    </span>
                ))}
            </h2>
        </div>
    );
};

/* ─── Single Card ─────────────────────────────────────────────────────── */
const PackageCard = ({ pkg, index }) => (
    <motion.article
        className="os-card"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
        <div className="os-card-header">
            <div className="os-name-row">
                <FiPackage className="os-pkg-icon" aria-hidden="true" />
                <h3 className="os-pkg-name">{pkg.name}</h3>
            </div>
            <span className="os-label">{pkg.label}</span>
        </div>

        <p className="os-description">{pkg.description}</p>

        <div className="os-tech-row">
            {pkg.tech.map((t) => (
                <span key={t} className="os-tech-badge">
                    {t}
                </span>
            ))}
        </div>

        <div className="os-meta-row">
            {pkg.version && (
                <span className="os-meta-item">
                    <FiTag aria-hidden="true" />
                    {pkg.version}
                </span>
            )}
            {pkg.downloads && (
                <span className="os-meta-item">
                    <FiDownload aria-hidden="true" />
                    {pkg.downloads}
                </span>
            )}
            {pkg.license && <span className="os-meta-item os-license">{pkg.license}</span>}
        </div>

        {pkg.snippet && (
            <div className="os-snippet-wrap">
                <div className="os-snippet-bar">
                    <FiCode size={13} aria-hidden="true" />
                    <span>Usage</span>
                </div>
                <pre className="os-snippet">
                    <code>{pkg.snippet}</code>
                </pre>
            </div>
        )}

        <div className="os-actions">
            {pkg.github && (
                <a
                    href={pkg.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="os-btn os-btn-primary"
                >
                    <FiGithub size={15} />
                    {pkg.primaryLabel || "GitHub"}
                </a>
            )}

            {pkg.npm && (
                <a
                    href={pkg.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="os-btn os-btn-secondary"
                >
                    <SiNpm size={15} />
                    {pkg.secondaryLabel || "npm"}
                </a>
            )}

            {pkg.demo && (
                <a
                    href={pkg.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="os-btn os-btn-ghost"
                >
                    {pkg.demoLabel || "Live demo"}
                </a>
            )}

            {pkg.status && (
                <span className="os-btn os-btn-ghost">{pkg.status}</span>
            )}
        </div>
    </motion.article>
);

/* ─── Section ─────────────────────────────────────────────────────────── */
const OpenSource = () => {
    return (
        <section className="os-section" id="opensource">
            <div className="os-container">
                <AnimatedHeading />
                <p className="os-subtitle">
                    A collection of npm packages and developer tools I maintain.
                </p>

                <div className="os-grid">
                    {packages.map((pkg, i) => (
                        <PackageCard key={pkg.name} pkg={pkg} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;

