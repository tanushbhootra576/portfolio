import React, { useRef, useEffect, useState } from 'react';
import './SkillsProgress.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skillsData = [
    {
        category: "Frontend Development",
        skills: [
            { name: "HTML5", percent: 95, icon: "🌐" },
            { name: "CSS3", percent: 89, icon: "🎨" },
            { name: "JavaScript", percent: 85, icon: "⚡" },
            { name: "React.js", percent: 80, icon: "⚛️" },
            { name: "Tailwind CSS", percent: 60, icon: "🌈" }
        ]
    },
    {
        category: "Backend Development",
        skills: [
            { name: "Node.js", percent: 30, icon: "🟩" },
            { name: "Express.js", percent: 49, icon: "🚂" },
         
        ]
    },
    {
        category: "Programming & Problem Solving",
        skills: [
            { name: "Python", percent: 52, icon: "🐍" },
            { name: "C", percent: 58, icon: "🔵" },
            { name: "C++", percent: 60, icon: "💻" },
            { name: "DSA", percent: 10, icon: "🗂️" }
        ]
    },
    {
        category: "DevOps & Deployment",
        skills: [
            { name: "Git & GitHub", percent: 65, icon: "🔗" },
            { name: "Vercel", percent: 68, icon: "⚙️" },
          
            { name: "Render", percent: 60, icon: "📎" }
        ]
    },
    {
        category: "Content Editing & Technical Writing",
        skills: [
            { name: "Markdown", percent: 88, icon: "✍️" },
            { name: "Grammarly", percent: 80, icon: "📝" },
            { name: "MS Tools", percent: 80, icon: "🪼" }
        ]
    },
    {
        category: "Collaboration & Tools",
        skills: [
            { name: "VS Code", percent: 90, icon: "🧑‍💻" },
            { name: "Canva", percent: 78, icon: "📋" },
          
        ]
    },
    {
        category: "Other Skills",
        skills: [
            { name: "JSON", percent: 85, icon: "📦" },
            { name: "NPM", percent: 78, icon: "📦" }
        ]
    }
];

const SkillsProgress = () => {
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
        if (!isDesktop) return;

        const skiltxt = document.getElementById("skiltxt");
        if (!skiltxt) return;

        gsap.from("#skiltxt .letter", {
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
                trigger: "#skillls",
                start: "top 8%",
                pin: true,
                toggleActions: "play none none reverse"
            }
        });

    }, [isDesktop]);

    useEffect(() => {
        const bars = sectionRef.current?.querySelectorAll('.progress-bar-fill') || [];

        bars.forEach((bar) => (bar.style.width = '0'));

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-progress');
                    bar.style.width = targetWidth;
                    obs.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        bars.forEach((bar) => observer.observe(bar));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="skills-progress-section" ref={sectionRef} id="skillls">
            <h2 className="skills-title" id="skiltxt">
                {isDesktop
                    ? "Skill Set".split("").map((char, index) => (
                        <span key={index} className="letter">{char}</span>
                    ))
                    : "Skill Set"}
            </h2>

            <div className="skills-categories">
                {skillsData.map((cat) => (
                    <div className="skills-category" key={cat.category}>
                        <h3 className="category-title">{cat.category}</h3>
                        {cat.skills.map((skill) => (
                            <div className="skill-row" key={skill.name}>
                                <span className="skill-icon">{skill.icon}</span>
                                <span className="skill-name">{skill.name}</span>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        data-progress={`${skill.percent}%`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsProgress;

