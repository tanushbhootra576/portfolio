"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DomeGallery from "./DomeGallery";
import "./TheNewSkill.css";
// import Contributions from "./Contributions";
export default function TheNewSkill() {
    const rootRef = useRef(null);
    const imagesRef = useRef([]);
    const [activeSkillIndex, setActiveSkillIndex] = useState(0);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let observer;

        const ctx = gsap.context(() => {
            const texts = rootRef.current?.querySelectorAll(".tns-service-item[data-skill-index]") || [];

            // Setup: Hide all images except the first one initially
            gsap.set(imagesRef.current, { zIndex: 0, opacity: 0 });
            gsap.set(imagesRef.current[0], { zIndex: 1, opacity: 1 });

            texts.forEach((text, i) => {
                // Reliable active-section tracking for globe/icon highlighting.
                ScrollTrigger.create({
                    trigger: text,
                    start: "top 55%",
                    end: "bottom 45%",
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveSkillIndex(i);
                        }
                    },
                    onEnter: () => setActiveSkillIndex(i),
                    onEnterBack: () => setActiveSkillIndex(i),
                });

                // Create a timeline for each text section
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: text,
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.8,
                        onEnter: () => {
                            setActiveSkillIndex(i);
                            switchImage(i);
                        },
                        onEnterBack: () => {
                            setActiveSkillIndex(i);
                            switchImage(i);
                        },
                    },
                });

                // Add a "liquid" wave when scrolling through the section
                tl.to("#liquid-filter feDisplacementMap", {
                    attr: { scale: 100 }, // High distortion
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                });
            });

            // Fallback active tracking for environments where ScrollTrigger callbacks
            // may be delayed (smooth scroll wrappers, mobile browsers, etc.).
            if (typeof IntersectionObserver !== "undefined") {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!entry.isIntersecting) return;
                            const idx = Number(entry.target.getAttribute("data-skill-index"));
                            if (Number.isFinite(idx)) {
                                setActiveSkillIndex(idx);
                            }
                        });
                    },
                    {
                        root: null,
                        rootMargin: "-35% 0px -35% 0px",
                        threshold: [0.2, 0.35, 0.5, 0.65],
                    }
                );

                texts.forEach((text) => observer.observe(text));
            }

            // Ensure trigger positions are accurate after initial layout settles.
            requestAnimationFrame(() => ScrollTrigger.refresh());
        }, rootRef);

        // Helper: Handles the crossfade and distortion reset
        function switchImage(index) {
            if (!imagesRef.current[index]) return;

            // 1. Distort the transition
            gsap.to("#liquid-filter feDisplacementMap", {
                attr: { scale: 50 },
                duration: 0.3,
                onComplete: () => {
                    gsap.to("#liquid-filter feDisplacementMap", {
                        attr: { scale: 0 }, // Settle back to normal
                        duration: 0.3,
                    });
                },
            });

            // 2. Crossfade Images
            imagesRef.current.forEach((img, i) => {
                if (i === index) {
                    gsap.to(img, { zIndex: 2, opacity: 1, duration: 0.5 });
                } else {
                    gsap.to(img, { zIndex: 1, opacity: 0, duration: 0.5 });
                }
            });
        }

        return () => {
            if (observer) observer.disconnect();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={rootRef} className="tns-root">
            {/* SVG FILTER: The magic lightweight liquid effect */}
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
                <filter id="liquid-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.02" // Controls texture of liquid
                        numOctaves="3"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="0" // Start at 0 distortion
                    />
                </filter>
            </svg>

            <div className="tns-layout">
                {/* LEFT: Text Content */}
                {/* LEFT SIDE: SCROLL CONTENT */}
                <div className="tns-left">

                    {/* 1. ABOUT ME SECTION */}
                    <div style={{ padding: "clamp(20px, 4vw, 40px) 0" }}>
                        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: "0.75rem", marginTop: "0" }}>
                            About Me
                        </h1>
                        <p style={{ ...styles.text, marginBottom: "0.75rem" }}>
                            I'm a Full Stack Developer and B.Tech CSE student at <strong>VIT Chennai</strong>.
                            I specialize in building high-performance, animated web applications that bridge the gap
                            between creative design and robust engineering.
                        </p>
                        <p style={{ ...styles.text, marginBottom: "0.5rem" }}>
                            Currently, I'm focused on <strong>interactive web Designs</strong> and scalable
                            full-stack architectures. I love solving complex UI challenges using tools like
                            GSAP, Three.js, and TypeScript.
                        </p>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", opacity: 0.85, lineHeight: "1.6" }}>
                            <li>Building production-ready apps with <strong>Next.js & TypeScript</strong></li>
                            <li>Crafting immersive animations with <strong>GSAP & Framer Motion</strong></li>
                            <li>PW Student Ambassador & Web Dev @ <strong>CodeChef VIT and Bionary Club</strong></li>
                        </ul>
                    </div>

                    {/* 2. PROFILE CARD (Keep your existing one, it's good, just slight tweaks) */}
                    <div style={{ padding: "28px 0" }}>
                        <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 16px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ width: 'clamp(44px, 8vw, 60px)', height: 'clamp(44px, 8vw, 60px)', borderRadius: '50%', background: '#333', overflow: 'hidden', flexShrink: 0 }}>
                                {/* Placeholder for your avatar */}
                                <img src="https://github.com/tanushbhootra576.png" alt="Tanush" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>Tanush Bhootra</h3>
                                <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', opacity: 0.7 }}>Full Stack Developer • VIT Chennai '28</div>
                                <div style={{ fontSize: 'clamp(0.75rem, 1.3vw, 0.85rem)', opacity: 0.5, marginTop: 4, wordBreak: 'break-all' }}>
                                    <a href="https://github.com/tanushbhootra576" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>github.com/tanushbhootra576</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. DETAILED SKILL SECTIONS (Scroll Triggers) */}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                        <div
                            className={`tns-service-item ${activeSkillIndex === 0 ? "is-active" : ""}`}
                            data-skill-index="0"
                            style={getServiceItemStyle(activeSkillIndex === 0)}
                        >
                            <h2 style={getHeadingStyle(activeSkillIndex === 0)}>Creative Frontend</h2>
                            <p style={getTextStyle(activeSkillIndex === 0)}>
                                I don't just build pages; I build experiences. Specializing in <strong>React, GSAP, and Three.js</strong> to create fluid, award-winning type interfaces (like this portfolio!).
                            </p>
                        </div>

                        <div
                            className={`tns-service-item ${activeSkillIndex === 1 ? "is-active" : ""}`}
                            data-skill-index="1"
                            style={getServiceItemStyle(activeSkillIndex === 1)}
                        >
                            <h2 style={getHeadingStyle(activeSkillIndex === 1)}>Full Stack Systems</h2>
                            <p style={getTextStyle(activeSkillIndex === 1)}>
                                Leveraging <strong>Node.js, Express, and PostgreSQL</strong> to build scalable backend systems. I focus on clean API design, authentication, and database optimization and many more.
                            </p>
                        </div>
                    </div>

                    <div
                        className={`tns-service-item ${activeSkillIndex === 2 ? "is-active" : ""}`}
                        data-skill-index="2"
                        style={getServiceItemStyle(activeSkillIndex === 2)}
                    >
                        <h2 style={getHeadingStyle(activeSkillIndex === 2)}>Open Source</h2>
                        <p style={getTextStyle(activeSkillIndex === 2)}>
                            Active contributor to the developer community. I build practical tools and reusable components with a focus on <strong>Developer Experience (DX)</strong>, performance, and maintainable code.
                        </p>
                        <p style={{ ...getTextStyle(activeSkillIndex === 2), marginTop: "0.65rem" }}>
                            I regularly contribute through issue triage, bug fixes, refactors, and documentation updates that make projects easier to adopt and maintain for teams at different skill levels.
                        </p>
                        <ul style={{ ...getTextStyle(activeSkillIndex === 2), marginTop: "0.7rem", paddingLeft: "1.2rem", lineHeight: 1.6 }}>
                            <li>Improve performance and accessibility in real-world UI components.</li>
                            <li>Ship reusable patterns that reduce implementation time for common features.</li>
                            <li>Write clear PR notes so maintainers can review and merge faster.</li>
                        </ul>
                    </div>

                    {/* 4. KEY PROJECTS (Updated with your Real Projects) */}
                    <div
                        className={`tns-service-item ${activeSkillIndex === 3 ? "is-active" : ""}`}
                        data-skill-index="3"
                        style={getServiceItemStyle(activeSkillIndex === 3)}
                    >
                        <h2 style={getHeadingStyle(activeSkillIndex === 3)}>Featured Work</h2>
                    

<div style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: 'clamp(16px, 2.5vw, 24px)', 
    marginTop: 'clamp(16px, 2.5vw, 24px)' 
}}>

    {/* Project 1: VoxMotion */}
    <div style={{ 
        flex: '1 1 280px',
        minWidth: 0,
        background: 'rgba(255, 255, 255, 0.03)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(16px, 3vw, 24px)', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: 600, letterSpacing: '-0.02em' }}>
                VoxMotion
            </h4>
            <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", opacity: 0.8, lineHeight: '1.5', marginBottom: "16px" }}>
                An autonomous rescue scout robot prototype featuring a triple-redundant control system with real-time tactical remote controls, voice commands, and automated mapping.
            </p>
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.5, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            C++ • Robotics Engineering • Hardware Control
        </div>
    </div>

    {/* Project 2: use-web-kit */}
    <div style={{ 
        flex: '1 1 280px',
        minWidth: 0,
        background: 'rgba(255, 255, 255, 0.03)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(16px, 3vw, 24px)', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: 600, letterSpacing: '-0.02em' }}>
                use-web-kit
            </h4>
            <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", opacity: 0.8, lineHeight: '1.5', marginBottom: "16px" }}>
                A zero-dependency React 19 performance toolkit designed to optimize DOM node lifecycles, manage worker pools efficiently, and prevent browser memory leaks.
            </p>
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.5, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            TypeScript • React 19 • Performance Optimization
        </div>
    </div>

    {/* Project 3: CollegeConnect */}
    <div style={{ 
        flex: '1 1 280px',
        minWidth: 0,
        background: 'rgba(255, 255, 255, 0.03)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(16px, 3vw, 24px)', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: 600, letterSpacing: '-0.02em' }}>
                CollegeConnect
            </h4>
            <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", opacity: 0.8, lineHeight: '1.5', marginBottom: "16px" }}>
                A comprehensive academic management platform featuring an integrated file drive and automated web-scraping utilities for streamlined portal sync.
            </p>
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.5, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            MongoDB • Express • React • Node.js • Puppeteer
        </div>
    </div>

    {/* Project 4: Epistemic */}
    <div style={{ 
        flex: '1 1 280px',
        minWidth: 0,
        background: 'rgba(255, 255, 255, 0.03)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(16px, 3vw, 24px)', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "clamp(1.1rem, 2vw, 1.3rem)", fontWeight: 600, letterSpacing: '-0.02em' }}>
                Epistemic
            </h4>
            <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", opacity: 0.8, lineHeight: '1.5', marginBottom: "16px" }}>
                A modern platform engineered to optimize digital resource discovery and enhance direct peer collaboration across campus environments.
            </p>
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.5, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            Next.js • TypeScript • Tailwind CSS
        </div>
    </div>

</div>
                    </div>

                    {/* 5. CONTACT */}
                    <div
                        className={`tns-service-item ${activeSkillIndex === 4 ? "is-active" : ""}`}
                        data-skill-index="4"
                        style={getServiceItemStyle(activeSkillIndex === 4)}
                    >
                        <h2 style={getHeadingStyle(activeSkillIndex === 4)}>Let's Connect</h2>
                        <p style={getTextStyle(activeSkillIndex === 4)}>
                            I'm currently looking for <strong>Internship opportunities</strong> where I can contribute to challenging engineering problems.
                        </p>
                        <div style={{ marginTop: 'clamp(1rem, 3vw, 2rem)', display: 'flex', gap: 'clamp(10px, 2vw, 20px)', flexWrap: 'wrap' }}>
                            <a href="mailto:tanush.bhootra@vitstudent.ac.in" style={{
                                padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)',
                                background: 'white',
                                color: 'black',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                                minHeight: '44px',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}>
                                Email Me
                            </a>
                            <a href="https://linkedin.com/in/tanushbhootra576" target="_blank" style={{
                                padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '30px',
                                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                                minHeight: '44px',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}>
                                LinkedIn
                            </a>
                        </div>
                    </div>


                </div>

                {/* RIGHT: Sticky Image Stack */}
                <div className="tns-rightSticky">
                    <div className="tns-imageContainer">
                        {/* We apply the filter to the container or images 
                        {[
                            "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
                            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                        ].map((src, i) => (
                            <img
                                key={i}
                                ref={(el) => (imagesRef.current[i] = el)}
                                src={src}
                                alt={`Skill ${i}`}
                                style={{
                                    ...styles.img,
                                    // Apply the SVG filter ID here
                                    filter: "url(#liquid-filter)",
                                }}
                            />
                        ))}   */}


                        <DomeGallery activeSkillIndex={activeSkillIndex} />

                    </div>
                </div>
            </div>

        </section>
    );
}

const getServiceItemStyle = (isActive) => ({
    ...styles.serviceItem,
    flex: '1 1 280px',
    minWidth: 0,
    opacity: isActive ? 1 : 0.62,
    transform: `scale(${isActive ? 1 : 0.965})`,
    filter: isActive ? "blur(0px)" : "blur(0.2px)",
    transition: "transform 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease, filter 320ms ease",
    transformOrigin: "left center",
});

const getHeadingStyle = (isActive) => ({
    ...styles.heading,
    fontWeight: isActive ? 800 : 650,
    letterSpacing: isActive ? "0.01em" : "0em",
    fontSize: isActive ? "clamp(2.2rem, 4.4vw, 3.25rem)" : "clamp(1.85rem, 3.6vw, 2.7rem)",
    transition: "font-size 380ms cubic-bezier(0.22, 1, 0.36, 1), font-weight 280ms ease, letter-spacing 280ms ease",
});

const getTextStyle = (isActive) => ({
    ...styles.text,
    opacity: isActive ? 0.96 : 0.68,
    fontSize: isActive ? "clamp(1.06rem, 2.2vw, 1.34rem)" : "clamp(0.96rem, 2vw, 1.16rem)",
    transition: "font-size 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease",
});

const styles = {
    serviceItem: {
        minHeight: "52vh",
        padding: "clamp(1.25rem, 3vw, 2.25rem) 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    heading: {
        fontSize: "clamp(2rem, 4vw, 3rem)",
        marginBottom: "1rem",
        fontWeight: "bold",
    },
    text: {
        fontSize: "clamp(1rem, 2.1vw, 1.25rem)",
        opacity: 0.7,
        lineHeight: 1.6,
    },
    img: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    projectGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginTop: '12px'
    },
    projectCard: {
        background: 'rgba(255,255,255,0.03)',
        padding: '12px',
        borderRadius: '10px',
        minHeight: '72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    smallText: {
        fontSize: '0.9rem',
        opacity: 0.85,
        marginTop: '6px'
    },
    contactButton: {
        display: 'inline-block',
        marginTop: '12px',
        background: '#1f8fff',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '8px',
        textDecoration: 'none'
    }
};