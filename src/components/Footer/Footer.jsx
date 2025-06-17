import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import Aurora from "./Aurora";

const Footer = () => (
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
                <button className="contact-button">
                    <a
                        href="/main"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resume 📩
                    </a>
                </button>

              
            </div>
            <div>
                <div className="footer-social">
                    <a href="https://github.com/tanushbhootra576" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/tanushbhootra576" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedinIn />
                    </a>

                </div>
                <br /><br />
                <button className="contact-button">
                    <a
                        href="https://forms.gle/XfPf1HyVa7cfMwat6"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact me 🔶
                    </a>
                </button>
            </div>
        </div>
        <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Tanush Bhootra. All rights reserved.</span>
            <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />
        </div>
    </footer>
);

export default Footer;
