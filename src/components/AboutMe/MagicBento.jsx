import React, { useRef, useEffect } from 'react';
import HyperText from './HyperText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MagicBento.css';
import Contributions from '../Skills/Contributions';
import GithubGraph from './GithubGraph';
gsap.registerPlugin(ScrollTrigger);

const BentoCard = ({ children, className, tiltAmount = 5 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Skip tilt on touch devices
        const isTouchDevice =
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        if (isTouchDevice) return;

        const onMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -tiltAmount;
            const rotateY = ((x - centerX) / centerX) * tiltAmount;

            gsap.to(card, {
                rotateX, rotateY,
                duration: 0.4, ease: 'power2.out', transformPerspective: 1000,
            });
        };

        const onMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0, rotateY: 0,
                duration: 0.7, ease: 'elastic.out(1, 0.5)',
            });
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
        return () => {
            card.removeEventListener('mousemove', onMouseMove);
            card.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [tiltAmount]);

    return (
        <div ref={cardRef} className={`bento-card ${className}`}>
            <div className="card-content">{children}</div>
        </div>
    );
};

const MagicBento = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll('.bento-card');

        // Set initial hidden state via GSAP (not CSS) so ScrollTrigger controls it
        gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

        // Small delay to let Lenis/ScrollTrigger scroller proxy initialise
        const timer = setTimeout(() => {
            gsap.to(cards, {
                opacity: 1, y: 0, scale: 1,
                stagger: 0.05, duration: 0.6, ease: 'power2.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                }
            });

            // Fallback: if ScrollTrigger never fires (already in view), force visible
            const fallback = setTimeout(() => {
                cards.forEach(card => {
                    if (parseFloat(getComputedStyle(card).opacity) < 0.1) {
                        gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.4 });
                    }
                });
            }, 1500);

            // Refresh ScrollTrigger after images/layout settle
            const refresh = () => {
                try { ScrollTrigger.refresh(); } catch { /* ignore */ }
            };
            refresh();
            const imgs = gridRef.current?.querySelectorAll('img') || [];
            const listeners = [];
            imgs.forEach((img) => {
                const fn = () => refresh();
                img.addEventListener('load', fn);
                listeners.push({ img, fn });
            });

            return () => {
                clearTimeout(fallback);
                listeners.forEach(({ img, fn }) => img.removeEventListener('load', fn));
            };
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bento-wrapper">
            <div className="bento-grid" ref={gridRef}>

                {/* --- LEFT COLUMN --- */}

                {/* 1. Profile (Tall) */}
                <BentoCard className="card-profile">
                    <img
                        src="/imgs/123.webp" // MAKE SURE THIS PATH IS CORRECT
                        alt="Profile"
                        className="profile-img-full"
                    />
                </BentoCard>

                {/* 2. Photography (Square, Bottom Left) */}
                <BentoCard className="card-photo">
                    <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Y2p5czRjZWxkYzJ2YWZ2cmR2dWY0dHBjMTBvdWFrandrYjM3MHhhNiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/l1IY5CmYbirEsXWPm/giphy.gif" className="full-bg-img" alt="Camera" />
                    <div className="overlay-text">
                        <span>;)</span>
                    </div>
                </BentoCard>

                {/* --- MIDDLE & RIGHT COLUMNS --- */}

                {/* 3. Name Header (Wide, Top Center) */}
                <BentoCard className="card-name">
                    <div className="name-container">
                        <span className="subtitle">HELLO, I AM</span>
                        <HyperText text="TANUSH" className="hyper-text-title" />
                        <span className="subtitle-bottom">FULL STACK DEVELOPER</span>
                    </div>
                </BentoCard>

                {/* 4. Status (Small, Top Right) */}
                <BentoCard className="card-status-resume">
                    <div className="status-header">
                        <div className="status-indicator">
                            <span className="pulse-dot"></span>
                            <span className="status-text">Available to Work</span>
                        </div>
                        <span className="location-text">Chennai, IN</span>
                    </div>
                    <div className="resume-body">
                        <p>Specialized in building robust web apps & design systems.</p>
                        <div className="button-group">
                            <a href="https://drive.google.com/file/d/10awXph6ePWViWAvDAxVteWAZ7t00yTy0/view?usp=sharing" className="bento-btn primary">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                Resume
                            </a>
                            <a href="#contact" className="bento-btn secondary">Contact</a>
                        </div>
                    </div>
                </BentoCard>

                {/* 5. Academic Journey (The Fixed Card) */}
                {/* <BentoCard className="card-academic">
                    <span className="card-label">ACADEMIC JOURNEY</span>
                    <div className="timeline-wrapper">
                    
                        <div className="timeline-item">
                            <div className="timeline-dot active"></div>
                            <div className="timeline-content">
                                <h4>B.Tech CSE</h4>
                                <p>VIT Chennai • 2024-2028</p>
                                <span className="badge">CGPA: 8.9</span>
                            </div>
                        </div>
                   
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h4>Senior Secondary</h4>
                                <p>Sanskar Public School</p>
                                <span className="badge">PCM Stream</span>
                            </div>
                        </div>
                    
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h4>High School</h4>
                                <p>MSS Public School</p>
                            </div>
                        </div>
                    </div>
                </BentoCard> */}



                <BentoCard className="card-academic">
                    <span className="card-label">ACADEMIC JOURNEY</span>
                    <div className="academic-list">
                        {/* B.Tech CSE AI - Robotics */}
                        <div className="academic-item">
                            <h4 className="academic-title">B.Tech CSE</h4>
                            <h4 className="academic-title">AI - Robotics</h4>
                            <p className="academic-meta">VIT Chennai &bull; 2024-2028</p>
                            <span className="academic-badge academic-badge-accent">CGPA: 8.66</span>
                            <p className="academic-desc">
                                Building a strong base in computer science while focusing on intelligent systems,
                                robotics, and practical product development.
                            </p>
                            <div className="academic-tags">
                                <span className="academic-tag">AI Systems</span>
                                <span className="academic-tag">Robotics</span>
                                <span className="academic-tag">Full Stack</span>
                            </div>
                        </div>
                        {/* Senior Secondary */}
                        <div className="academic-item">
                            <h4 className="academic-title">Senior Secondary</h4>
                            <p className="academic-meta">Sanskar Public School</p>
                            <span className="academic-badge">PCM Stream</span>
                            <p className="academic-desc">
                                Strengthened core analytical thinking through Physics, Chemistry, and Mathematics
                                with a steady academic performance.
                            </p>
                            <div className="academic-tags">
                                <span className="academic-tag">PCM</span>
                                <span className="academic-tag">Analytical Thinking</span>
                            </div>
                        </div>
                        {/* High School */}
                        <div className="academic-item">
                            <h4 className="academic-title">High School</h4>
                            <p className="academic-meta academic-meta-last">MSS Public School</p>
                            <p className="academic-desc academic-desc-last">
                                The foundation stage where curiosity, discipline, and problem-solving habits began to
                                take shape.
                            </p>
                            <div className="academic-tags">
                                <span className="academic-tag">Foundation</span>
                                <span className="academic-tag">Discipline</span>
                            </div>
                        </div>
                    </div>
                    <div className="academic-note">
                        Currently focused on learning, building, and applying technology to real-world problems.
                    </div>
                </BentoCard>

                {/* 6. Tech Arsenal (Wide, Middle Right) */}
                <BentoCard className="card-expertise">
                    <span className="card-label">TECH ARSENAL</span>
                    <div className="skills-grid">
                        <div className="skill-group">
                            <span className="skill-title">FRONTEND</span>
                            <div className="pills-row">
                                <span className="pill">React</span>
                                <span className="pill">Next.js</span>
                                <span className="pill">TypeScript</span>
                                <span className="pill">Tailwind</span>
                                <span className="pill">Vite</span>
                                <span className="pill">Framer Motion</span>
                            </div>
                        </div>
                        <div className="skill-group">
                            <span className="skill-title">FULLSTACK & SYSTEMS</span>
                            <div className="pills-row">
                                <span className="pill">Node.js</span>
                                <span className="pill">Express</span>
                                <span className="pill">PostgreSQL</span>
                                <span className="pill">MongoDB</span>
                                <span className="pill">Rust</span>
                                <span className="pill">Docker</span>
                            </div>
                        </div>
                        <div className="skill-group">
                            <span className="skill-title">CREATIVE FRONTEND</span>
                            <div className="pills-row">
                                <span className="pill">GSAP</span>
                                <span className="pill">Three.js</span>
                                <span className="pill">Framer</span>
                                <span className="pill">R3F</span>
                                <span className="pill">WebGL</span>
                            </div>
                        </div>
                        <div className="skill-group">
                            <span className="skill-title">TOOLING</span>
                            <div className="pills-row">
                                <span className="pill">GitHub</span>
                                <span className="pill">Postman</span>
                                <span className="pill">Vercel</span>
                                <span className="pill">CI/CD</span>
                            </div>
                        </div>
                        <div className="arsenal-note-block">
                            <span className="skill-title">SIGNATURE STRENGTHS</span>
                            <div className="arsenal-note-row">
                                <span className="arsenal-note-pill">Performance-first UI</span>
                                <span className="arsenal-note-pill">Animation systems thinking</span>
                                <span className="arsenal-note-pill">API clarity & DX</span>
                                <span className="arsenal-note-pill">Rapid prototyping to production</span>
                            </div>
                        </div>
                        <div className="arsenal-build-mode">
                            <span className="skill-title">CURRENT BUILD MODE</span>
                            <p>
                                Building immersive web interfaces that balance <strong>motion</strong>, <strong>maintainability</strong>, and <strong>Lighthouse performance</strong>.
                            </p>
                        </div>
                    </div>
                </BentoCard>

                {/* 7. Current Focus (Wide, Bottom Right) */}
                {/* <BentoCard className="card-vision">
                    <span className="card-label">CURRENT FOCUS</span>
                    <div className="vision-content">
                        <h3>Building Scalable Systems</h3>
                        <p>Exploring the intersection of high-performance backend architecture and immersive frontend interaction.</p>
                        <div className="vision-tags">
                            <span>#OpenSource</span>
                            <span>#WebAssembly</span>
                        </div>
                    </div>
                    
                </BentoCard> */}

                <BentoCard className="card-coding">
                    <GithubGraph />
                </BentoCard>

            </div>
        </div>
    );
};

export default MagicBento;