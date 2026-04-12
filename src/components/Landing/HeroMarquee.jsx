import React, { useMemo } from "react";
import "./HeroMarquee.css";

const HeroMarquee = ({
    words = [
        "Minimal",
        "Modern",
        "React",
        "Design",
        "Motion",
        "Frontend",
        "UI",
        "Portfolio",
    ],
    speedSeconds = 18,
    ariaLabel = "Scrolling marquee",
}) => {
    const items = useMemo(() => {
        const cleaned = (Array.isArray(words) ? words : [])
            .map((w) => String(w ?? "").trim())
            .filter(Boolean);

        // Ensure non-empty, otherwise fall back.
        return cleaned.length ? cleaned : ["Minimal", "Modern", "Portfolio"];
    }, [words]);

    const renderContent = (keyPrefix) => (
        <span className="hero-marquee__content" aria-hidden="true">
            {items.map((word, idx) => (
                <React.Fragment key={`${keyPrefix}-${word}-${idx}`}
                >
                    <span className="hero-marquee__word">{word}</span>
                    <span className="hero-marquee__sep" aria-hidden="true">•</span>
                </React.Fragment>
            ))}
        </span>
    );

    return (
        <div className="hero-marquee" aria-label={ariaLabel}>
            <div className="hero-marquee__mask">
                <div
                    className="hero-marquee__track"
                    style={{ "--marquee-duration": `${speedSeconds}s` }}
                >
                    {/* Two identical copies for seamless looping */}
                    {renderContent("a")}
                    {renderContent("b")}
                </div>
            </div>
        </div>
    );
};

export default HeroMarquee;
