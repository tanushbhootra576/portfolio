import React, { useRef, useEffect, useState } from 'react';
import './Projects3DSection.css';
import TextPressure from '../CustomCompo/TextPressure';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { safeHref } from '../../utils/url';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Portfolio Website",
        description: "A personal portfolio built with React.js featuring animated transitions, responsive design, a dynamic skills section and more.",
        tech: ["React", "CSS3", "Framer Motion", "GSAP"],
        image: "/imgs/portfolio.webp",
        link: "",
        github: "https://github.com/tanushbhootra576/portfolio"
    },
    {
        title: "LenScape",
        description: "A portfolio for landscape through my mobile lens ;).",
        tech: ["HTML5", "CSS3", "JavaScript", "Framer Motion", "GSAP"],
        image: "/imgs/LenScape.webp",
        link: "https://lenscape-i692.onrender.com/",
        github: "https://github.com/tanushbhootra576/lenscape.git"
    },
    {
        title: "CampusConnect",
        description: "A social media platform for college students to connect, share, and collaborate on campus events and activities.",
        tech: ["NEXT JS", "TypeScript", "CSS3", "MongoDB"],
        image: "/imgs/CampusConnect.webp",
        link: "https://studentverse-amber.vercel.app/",
        github: "https://github.com/tanushbhootra576/camp.git"
    },
    {
        title: "JurisAI",
        description: "I and my friends Nirvik and Rakshith teamed up and made a chatbot that answers questions regarding cyber laws.",
        tech: ["React", "CSS3", "MongoDB"],
        image: "/imgs/JurisAI.webp",
        link: "https://jurisai-ochre.vercel.app/",
        github: "https://github.com/tanushbhootra576/JurisAI.git"
    },
    {
        title: "GridSaga",
        description: "A captivating grid-based puzzle game with procedural level generation and strategic gameplay.",
        tech: ["Next.js", "TypeScript", "Three.js", "CSS3"],
        image: "/imgs/GridSaga.webp",
        link: "https://grid-saga.vercel.app/",
        github: "https://github.com/tanushbhootra576/GridSaga.git"
    },
    {
        title: "SKY-SCANr",
        description: "A real-time weather app with OpenWeatherMap API, plus food & music recommendations.",
        tech: ["React", "CSS3", "Node.js", "API"],
        image: "/imgs/WeatherApp.webp",
        link: "https://skyscaner.vercel.app/",
        github: "https://github.com/tanushbhootra576/SKY-SCANr.git"
    }
];

const ProjectCard = ({ project, index, isDesktop }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!isDesktop) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="project-card-3d"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d", height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="project-image-wrap">
                    <img src={project.image} alt={project.title} className="project-image" />
                </div>
                <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tech">
                        {project.tech.map((tech, i) => (
                            <span className="tech-badge" key={i}>{tech}</span>
                        ))}
                    </div>
                    <div className="project-links" style={{ transform: "translateZ(60px)", position: 'relative', zIndex: 1000 }}>
                        {safeHref(project.link, { allowRelative: false }) && (
                            <a href={safeHref(project.link, { allowRelative: false })} target="_blank" rel="noopener noreferrer" className="project-link">
                                Live Demo
                            </a>
                        )}
                        {safeHref(project.github, { allowRelative: false }) && (
                            <a href={safeHref(project.github, { allowRelative: false })} target="_blank" rel="noopener noreferrer" className="project-link">
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects3DSection = () => {
    const sectionRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsDesktop(window.innerWidth > 768 && !isTouchDevice);
        };

        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(section, {
                opacity: 0,
                scale: 0.95,
            }, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });

            gsap.fromTo(".project-grid", {
                opacity: 0,
                y: 40,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".project-grid",
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });

        }, sectionRef);

        // Fallback: force visible if ScrollTrigger doesn't fire
        const fallback = setTimeout(() => {
            if (section && parseFloat(getComputedStyle(section).opacity) < 0.1) {
                gsap.to(section, { opacity: 1, scale: 1, duration: 0.4 });
            }
            const grid = section.querySelector('.project-grid');
            if (grid && parseFloat(getComputedStyle(grid).opacity) < 0.1) {
                gsap.to(grid, { opacity: 1, y: 0, duration: 0.4 });
            }
        }, 1500);

        try { ScrollTrigger.refresh(); } catch (e) { }

        const imgs = section.querySelectorAll('img');
        const listeners = [];
        imgs.forEach((img) => {
            const fn = () => { try { ScrollTrigger.refresh(); } catch (e) { } };
            img.addEventListener('load', fn);
            listeners.push({ img, fn });
        });

        return () => {
            clearTimeout(fallback);
            ctx.revert();
            listeners.forEach(({ img, fn }) => img.removeEventListener('load', fn));
        };
    }, []);

    return (
        <section
            className="projects-section"
            id="projects"
            ref={sectionRef}
        >
            <div className="projects-container">
                <div className="projects-header">
                    <div className="projects-title-wrapper">
                        <div style={{ position: 'relative', height: 'clamp(60px, 12vw, 120px)' }}>
                            <TextPressure
                                text="Featured Projects"
                                flex
                                alpha={false}
                                stroke={false}
                                width
                                weight
                                italic
                                textColor="#ffffff"
                                strokeColor="#5227FF"
                                minFontSize={1}
                            />
                        </div>
                    </div>

                </div>

                <div className="project-grid">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            isDesktop={isDesktop}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects3DSection;
