import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function HyperText({ text, className }) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef(null);

    const startScramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let pos = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = text.split("").map((char, index) => {
                if (index < pos) {
                    return char;
                }
                return characters[Math.floor(Math.random() * characters.length)];
            }).join("");

            setDisplayText(scrambled);
            pos += 1 / 3; // Controls speed of resolution

            if (pos > text.length) {
                clearInterval(intervalRef.current);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, 30);
    };

    // Trigger on mount
    useEffect(() => {
        startScramble();
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <motion.h1
            className={className}
            onMouseEnter={startScramble} // Re-trigger on hover
            style={{
                fontFamily: "'JetBrains Mono', monospace", // Monospace looks best for this
                cursor: "default",
                userSelect: "none"
            }}
        >
            {displayText}
        </motion.h1>
    );
}