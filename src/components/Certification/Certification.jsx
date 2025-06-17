import CertificationItem from "./CertificationItem";
import { motion } from "framer-motion";
import "./Certifications.css";

const certifications = [
    {
        title: "Introduction to Frontend.",
        platform: "Coursera",
        date: "DEC 2024",
        description: "It provided essential skills in HTML, CSS, and JavaScript, enabling me to build dynamic and visually appealing websites. ",
        link: "https://www.coursera.org/account/accomplishments/verify/8YPHY1FZAEMC?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    },
    {
        title: "React - The Complete Guide 2025 (incl. Next.js, Redux)",
        platform: "Udemy",
        date: "onGoing",
        description: "React, Hooks, Redux, React Router, Next.js, and more.",
        link: "https://github.com/tanushbhootra576",
    },

];

const Certifications = () => {
    return (
        <section className="certifications-section">
            <motion.h2
                className="cert-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Certifications & Courses
            </motion.h2>

            <div className="certifications-list">
                {certifications.map((cert, index) => (
                    <CertificationItem key={index} {...cert} />
                ))}
            </div>
        </section>
    );
};

export default Certifications;
