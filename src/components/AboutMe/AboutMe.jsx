
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AboutMe.css';
import ScrambledText from './ScrambledText';
import PixelTransition from './PixelTransition';
const tabs = ['About Me', 'Education', 'Interests'];
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const AboutMe = () => {
    const [activeTab, setActiveTab] = useState('About Me');
    const [showPopup, setShowPopup] = useState(false);

    const content = {
        'About Me': (
            <>
                <h3 className="tab-title">Hi, I'm a Creator & Engineer</h3>
                <p>
                    Hi, I’m Tanush Bhootra—a passionate tech enthusiast and B.Tech student specializing in Artificial Intelligence and Robotics.
                    I thrive on building innovative solutions at the intersection of code and creativity. My interests span coding, editing, and  developing projects that harness the power of AI and automation to solve real-world problems.
                    Driven by curiosity and a love for technology, I enjoy exploring new tools, frameworks, and ideas. Whether I’m collaborating on a team project or independently developing a new feature, I bring dedication, adaptability, and a growth mindset to every challenge.
                </p>
            </>
        ),
        'Education': (
            <>
                <h3 className="tab-title">My Education Journey</h3>
                <ul>
                    <li><strong>Class 10:</strong> MSS Public School , Kishangarh(2022)</li>
                    <li><strong>Class 12:</strong> Sanskar Public School , Parbatsar (2024)</li>
                    <li><strong>B.Tech:</strong> VIT Chennai, CSE (AI & Robotics), 2024–2028</li>
                </ul>
            </>
        ),
        'Interests': (
            <>
                <h3 className="tab-title">What Drives Me</h3>
                <p>
                    I'm passionate about photography, robotics, and AI. I document life around campus through visuals and
                    also work on personal tech projects, participate in hackathons, and write about my journey.<br />
                    <br />
                    <button className="lenscape-btn" onClick={() => setShowPopup(true)}>
                        🚀 Visit Lenscape
                    </button>
                </p>
            </>
        )
    };
    const titleRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { y: -50, opacity: 0, scale: 0.5 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: 'bounce.out',
                duration: 1.2,
                scrollTrigger: {
                    trigger: ".try1",
                    start: "top 0%",
                    end: "bottom 70%",
                    pin: true,

                }
            }
        );
    }, []);

    return (
        <>

            <div className='try1'>

                <PixelTransition
                    firstContent={
                        <img
                            src="/imgs/tb.jpg"
                            alt="Tanush Bhootra"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    }
                    secondContent={
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                            }}
                        >
                            <p style={{ fontWeight: 900, fontSize: "2.5rem", color: "#ffffff" }}>Hello there🫡!</p>
                        </div>
                    }
                    gridSize={12}
                    pixelColor='#ffffff'
                    animationStepDuration={0.4}
                    className="custom-pixel-card"
                />




                <section className="about-section">
                    <h2 className="section-title" ref={titleRef} animate={{ y: [30, -10, 0], opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 120 }}
                    >About</h2>


                    <div className="tab-buttons">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                {content[activeTab]}
                            </motion.div>
                        </AnimatePresence>
                    </div>



                </section>

            </div>
            <div className='scrtxt'>
                <ScrambledText
                    className="scrambled-text-demo"
                    radius={50}
                    duration={1}
                    speed={0.2}
                    scrambleChars={"!@#$%^&*()_+-=<>?"}
                >
                    <span>
                        <span>Let’s connect and build something extraordinary together!</span>
                    </span>
                </ScrambledText> <br /><br />
            </div>
            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h3>📸 Lenscape</h3>
                        <p>Coming Soon! A visual journal of everything I capture in and outside of college.</p>
                        <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}

        </>
    );
};

export default AboutMe;