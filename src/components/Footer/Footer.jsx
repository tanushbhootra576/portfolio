import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import { safeHref } from '../../utils/url';

const DEFAULT_RESUME_URL = "https://drive.google.com/file/d/1Msrl20xyCZGcOGclcvqkR9M_yVVZvdCq/view?usp=sharing";

const Footer = ({ resumeUrl = (import.meta.env?.VITE_RESUME_URL ?? DEFAULT_RESUME_URL) }) => {
    const safeResumeUrl = safeHref(resumeUrl, { allowRelative: true });
    const safeContactUrl = safeHref("https://forms.gle/XfPf1HyVa7cfMwat6", { allowRelative: false });
    const safeGithubUrl = safeHref("https://github.com/tanushbhootra576", { allowRelative: false });
    const safeLinkedInUrl = safeHref("https://linkedin.com/in/tanushbhootra576", { allowRelative: false });

    return (
        <footer className="footer-dev">
            <div className="footer-main">

                <div className="footer-identity">
                    <div className="footer-title">
                        <span className="footer-name">TANUSH BHOOTRA</span>
                    </div>

                    <div className="footer-roles">
                        <span>CODER</span>
                        <span className="footer-role-sep">|</span>
                        <span>EDITOR</span>
                        <span className="footer-role-sep">|</span>
                        <span>DEVELOPER</span>
                    </div>

                    <div className="footer-buttons">
                        {safeResumeUrl ? (
                            <a
                                className="footer-btn primary"
                                href={safeResumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Resume
                            </a>
                        ) : null}
                        {safeContactUrl ? (
                            <a
                                className="footer-btn secondary"
                                href={safeContactUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contact Me
                            </a>
                        ) : null}
                    </div>
                </div>

                <div className="footer-social-section">
                    <span className="social-label">Connect with me</span>
                    <div className="footer-social">
                        {safeGithubUrl ? (
                            <a href={safeGithubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub />
                            </a>
                        ) : null}
                        {safeLinkedInUrl ? (
                            <a href={safeLinkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        ) : null}
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} Tanush Bhootra. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;