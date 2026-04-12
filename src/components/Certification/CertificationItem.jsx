import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { FaReact, FaPython, FaJs, FaMicrosoft, FaLinkedin } from "react-icons/fa";
import { SiNvidia, SiMeta, SiUdemy, SiHackerrank } from "react-icons/si";
import "./Certifications.css";
import { safeHref } from '../../utils/url';

const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("meta")) return <SiMeta size={28} color="#1877F2" />;
    if (p.includes("microsoft")) return <FaMicrosoft size={28} color="#00A4EF" />;
    if (p.includes("nvidia")) return <SiNvidia size={28} color="#76B900" />;
    if (p.includes("hackerrank")) return <SiHackerrank size={28} color="#2EC866" />;
    if (p.includes("linkedin")) return <FaLinkedin size={28} color="#0A66C2" />;
    if (p.includes("udemy") || p.includes("academind")) return <SiUdemy size={28} color="#ffffff" />;
    if (p.includes("algozenith")) return <FiAward size={28} color="#FFD700" />;
    if (p.includes("react")) return <FaReact size={28} color="#61DAFB" />;
    if (p.includes("python")) return <FaPython size={28} color="#3776AB" />;
    if (p.includes("javascript")) return <FaJs size={28} color="#F7DF1E" />;
    return <FiAward size={28} color="#ffffff" />;
};

const CertificationItem = ({ title, platform, date, description, link, index }) => {
    const ref = useRef(null);
    const [isTiltEnabled, setIsTiltEnabled] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1025px)");
        const updateTilt = () => setIsTiltEnabled(media.matches);

        updateTilt();

        if (typeof media.addEventListener === "function") {
            media.addEventListener("change", updateTilt);
            return () => media.removeEventListener("change", updateTilt);
        }

        media.addListener(updateTilt);
        return () => media.removeListener(updateTilt);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!isTiltEnabled) return;
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
        if (!isTiltEnabled) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="cert-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            style={
                isTiltEnabled
                    ? {
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        transformPerspective: 1000,
                    }
                    : undefined
            }
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                style={
                    isTiltEnabled
                        ? { transform: "translateZ(20px)", transformStyle: "preserve-3d" }
                        : undefined
                }
            >
                <div className="cert-header">
                    <div className="cert-icon-box">
                        {getIcon(platform)}
                    </div>
                    <span className="cert-date">{date}</span>
                </div>

                <div className="cert-content">
                    <h3 className="cert-title">{title}</h3>
                    <span className="cert-platform">{platform}</span>
                    <p className="cert-description">{description}</p>

                    {safeHref(link, { allowRelative: false }) && (
                        <a
                            href={safeHref(link, { allowRelative: false })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-link"
                            style={
                                isTiltEnabled
                                    ? { transform: "translateZ(60px)", position: "relative", zIndex: 1000 }
                                    : { position: "relative", zIndex: 1000 }
                            }
                        >
                            View Credential <FiExternalLink />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CertificationItem;
