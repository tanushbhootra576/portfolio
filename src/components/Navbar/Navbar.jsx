import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        let isScrolling = false;
        let scrollStopTimer = null;

        const isLandingVisible = () => {
            const landing = document.querySelector('.landing-cmp1');
            if (!landing) return false;

            const rect = landing.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            return rect.top < viewportHeight * 0.9 && rect.bottom > 120;
        };

        const updateNavbarVisibility = () => {
            const shouldHide = isScrolling || isLandingVisible();
            setIsHidden(shouldHide);

            if (shouldHide) {
                setMobileOpen(false);
            }
        };

        const onScroll = () => {
            isScrolling = true;
            updateNavbarVisibility();

            if (scrollStopTimer) clearTimeout(scrollStopTimer);

            scrollStopTimer = setTimeout(() => {
                isScrolling = false;
                updateNavbarVisibility();
            }, 180);
        };

        const onResize = () => {
            updateNavbarVisibility();
        };

        updateNavbarVisibility();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (scrollStopTimer) clearTimeout(scrollStopTimer);
        };
    }, []);

    return (
        <nav className={`navbar ${isHidden ? 'navbar--hidden' : ''}`} aria-label="Primary">
            <div className="nav-inner">
                {/* Brand Logo */}
                <a href="#about" className="logo">
                    &gt;_Tanush<span className="cursor-blink">|</span>
                </a>

                {/* Desktop Links */}
                <div className="links">
                    <a href="#about" className="nav-link">About</a>
                    <a href="#skills" className="nav-link">Skills</a>
                    <a href="#experience" className="nav-link">Experience</a>
                    <a href="#projects" className="nav-link">Projects</a>
                    <a href="#opensource" className="nav-link">Open Source</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    className={`mobile-toggle ${mobileOpen ? 'is-open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                    aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    <span className="line top-line"></span>
                    <span className="line bottom-line"></span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
                <div className="mobile-menu-inner">
                    <a href="#about" onClick={() => setMobileOpen(false)} className="mobile-nav-link">About</a>
                    <a href="#skills" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Skills</a>
                    <a href="#experience" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Experience</a>
                    <a href="#projects" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Projects</a>
                    <a href="#opensource" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Open Source</a>
                    <a href="#contact" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Contact</a>
                </div>
            </div>
        </nav>
    );
}