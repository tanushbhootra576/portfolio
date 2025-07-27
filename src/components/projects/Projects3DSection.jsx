import React, { useRef, useEffect, useState } from 'react';
import './Projects3DSection.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Interactive Portfolio Website",
        description: "A personal portfolio built with React.js featuring animated transitions, responsive design, a dynamic skills section and more.",
        tech: ["React", "CSS3", "Framer Motion", "GSAP",],
        image: "/imgs/portfolio.png",
        link: "",
        github: "https://github.com/tanushbhootra576/portfolio"
    },
    {
        title: "Coming Soon",
        description: "",
        tech: ["React", "CSS3"],
        image: "Coming Soon",
        link: "https://github.com/tanushbhootra576",
        github: "https://github.com/tanushbhootra576"
    },
    {
        title: "LenScape",
        description: "A portforlio for landscape through my mobile lens ;).",
        tech: ["HTML5", "CSS3", "JavaScript", "farmer-motion", "GSAP"],
        image: "/imgs/LenScape.png",
        link: "https://lenscape-i692.onrender.com/",
        github: "https://github.com/tanushbhootra576/lenscape.git"
    },
    {
        title: "SKY-SCANr",
        description: "A real-time weather app with OpenWeatherMap API, plus food & music recommendations.",
        tech: ["React", "CSS3", "Node.js", "API"],
        image: "/imgs/WeatherApp.png",
        link: "https://skyscaner.vercel.app/",
        github: "https://github.com/tanushbhootra576/SKY-SCANr.git"
    },
    {
        title: "JurisAI",
        description: "I and my friends Nirvik and Rakshith teamed up and made a chatbot that answers questions regarding cyber laws.",
        tech: ["React", "CSS3", "MongoDB"],
        image: "/imgs/JurisAI.png",
        link: "https://jurisai-ochre.vercel.app/",
        github: "https://github.com/tanushbhootra576/JurisAI.git"
    },
    {
        title: "TIC-TAC-TOE",
        description: "A simple fun game project based on React.",
        tech: ["NEXT.JS", "CSS3"],
        image: "/imgs/tictactoe.png",
        link: "https://game-orcin-rho.vercel.app/",
        github: "https://github.com/tanushbhootra576/game.git"
    }
];


const ProjectCard = ({ project, isDesktop }) => {
    const cardRef = useRef(null);
    const shineRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!isDesktop) return;

        const card = cardRef.current;
        const shine = shineRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.setProperty('--rotateX', `${rotateX}deg`);
        card.style.setProperty('--rotateY', `${rotateY}deg`);

        shine.style.left = `${x}px`;
        shine.style.top = `${y}px`;
        shine.style.opacity = 1;
    };

    const handleMouseLeave = () => {
        if (!isDesktop) return;

        const card = cardRef.current;
        const shine = shineRef.current;

        card.style.setProperty('--rotateX', `0deg`);
        card.style.setProperty('--rotateY', `0deg`);
        shine.style.opacity = 0;
    };

    return (
        <div
            className="project-card-3d"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="project-shine" ref={shineRef}></div>
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
                <div className="project-links">
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                            Live Demo
                        </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

const Projects3DSection = () => {
    const sectionRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // Detect device type
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
        if (!isDesktop) return;

        gsap.from("#projectstxt", {
            x: -1500,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#projectstxt",
                start: "top 90%",
                end: "top 10%",
                scrub: true,
                //  markers: true,
                // pin: true,

            }
        });
    }, [isDesktop]);

    return (
        <section className="projects-section" ref={sectionRef}>
            <h2 className="projects-title" id="projectstxt">Projects</h2>
            <div className="projects-grid">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} isDesktop={isDesktop} />
                ))}
            </div>
        </section>
    );
};

export default Projects3DSection;
