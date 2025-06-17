import { useInView, motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from 'gsap';


import './Timeline.css';
const TimelineItem = ({ item }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: false, amount: 0.3 }); // Correct usage

    useEffect(() => {
        if (isInView) {
            controls.start({ opacity: 1, y: 0 });
        } else {
            controls.start({ opacity: 0, y: 50 });
        }
    }, [isInView, controls]);




    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="timeline-item"
        >
            <div className="timeline-dot" />
            <div className="timeline-content">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-subtitle">
                    {item.organization} — {item.date}
                </p>
                <p className="timeline-description">{item.description}</p>
            </div>
        </motion.div>
    );
};
const Timeline = () => {
    const timelineItems = [
        {
            title: "Participated in SYNTHETIX 3.0 – Overnight Hackathon",
            organization: "HumanoidX Club VITC",
            date: "April 1 & April 2, 2025",
            description:
                "Developed an Rover-Control dashboard using React, integratingfor real-time data visualization with the team .",
        },
        {
            title: "Web Developer",
            organization: "BIONARY CLUB",
            date: "2024 - Present",
            description:
                "Joined the club as a web development team member.",
        },
        {
            title: "Inter School Web-Development Runner-Up",
            organization: "School",
            date: "2021",
            description:
                "Secured second place in an inter-school competition for designing a webpage on 'Advancement in Robotics'.",
        },
    ];
    return (



        <>


            <motion.h2
                id="ctimeline"
                className="timeline-title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                Experience Timeline
            </motion.h2>
            <div className="timeline-container">








                <div className="timeline">
                    {timelineItems.map((item, index) => (
                        <TimelineItem key={index} item={item} />
                    ))}
                </div>
            </div >
        </>
    );
};
export default Timeline;
