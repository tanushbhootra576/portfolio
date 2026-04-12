import CertificationItem from "./CertificationItem";
import { motion } from "framer-motion";
import "./Certifications.css";

const AnimatedHeading = ({ text }) => {
    const container = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.045,
                delayChildren: 0.05,
            },
        },
    };

    const clip = {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
    };

    const drop = {
        hidden: { y: "-110%" },
        show: {
            y: "0%",
            transition: { duration: 0.55, ease: "easeOut" },
        },
    };

    return (
        <motion.h2
            className="cert-section-title"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            aria-label={text}
        >
            {Array.from(text).map((ch, i) => (
                <motion.span
                    key={`${ch}-${i}`}
                    className="cert-title-letter-wrap"
                    aria-hidden="true"
                    variants={clip}
                >
                    <motion.span className="cert-title-letter" variants={drop}>
                        {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                </motion.span>
            ))}
        </motion.h2>
    );
};

const certifications = [
    {
        title: "AZIOI: Master Python For Competitive Coding",
        platform: "AlgoZenith",
        date: "Oct 2025",
        description: "Credential ID AZ249981592486056. Skills: Python (Programming Language)",
        link: "https://d3pdqc0wehtytt.cloudfront.net/certificates/AZ249981592486056.pdf",
    },
    {
        title: "React - The Complete Guide 2025 (incl. Next.js, Redux)",
        platform: "Academind",
        date: "Oct 2025",
        description: "Credential ID UC-3fd4f5aa-942b-403e-b57f-1aa2836420fa. Skills: React.js · Redux · Next.js · context api · Framer Motion",
        link: "https://www.udemy.com/certificate/UC-3fd4f5aa-942b-403e-b57f-1aa2836420fa/",
    },

    {
        title: "JavaScript Intermediate",
        platform: "HackerRank",
        date: "Oct 2025",
        description: "Credential ID f3117127a060. Skills: JavaScript",
        link: "https://www.hackerrank.com/certificates/f3117127a060",
    },
    // {
    //     title: "Python Basic",
    //     platform: "HackerRank",
    //     date: "Oct 2025",
    //     description: "Credential ID 492717434EB3. Skills: Python (Programming Language)",
    //     link: "https://www.hackerrank.com/certificates/492717434EB3",
    // },
    // {
    //     title: "Getting Started with AI on Jetson Nano",
    //     platform: "NVIDIA",
    //     date: "Sep 2025",
    //     description: "Credential ID _SMMCkJuTvGTGRZ4HPswog",
    //     link: "https://courses.nvidia.com/certificates/_SMMCkJuTvGTGRZ4HPswog",
    // },
    {
        title: "Machine Learning Fundamentals with Azure Machine Learning Studio",
        platform: "Microsoft",
        date: "Feb 2025",
        description: "Skills: Microsoft Azure Machine Learning",
        link: "https://learn.microsoft.com/en-us/training/paths/machine-learning-fundamentals-azure-machine-learning/",
    },
    {
        title: "Introduction to Front-End Development",
        platform: "Meta",
        date: "Dec 2024",
        description: "Credential ID 8YPHY1FZAEMC. Skills: HTML · CSS · JavaScript · Responsive Web Design",
        link: "https://www.coursera.org/account/accomplishments/verify/8YPHY1FZAEMC?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    },
    {
        title: "Docker Deep Dive: Build, Ship, and Run Containers",
        platform: "Udemy",
        date: "Feb 2026",
        description: "Certificate no: UC-5a5715c2-a712-4bcc-b2fb-caa1214c7a74. Skills: Docker",
        link: "https://ude.my/UC-5a5715c2-a712-4bcc-b2fb-caa1214c7a74",
    },

];

const Certifications = () => {
    return (
        <section className="certifications-section">
            <AnimatedHeading text="CERTIFICATIONS" />

            <div className="certifications-list">
                {certifications.map((cert, index) => (
                    <CertificationItem key={index} {...cert} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Certifications;
