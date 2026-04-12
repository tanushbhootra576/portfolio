import React, { useMemo } from "react";
import "./SkillsProgress.css";
import { motion as Motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaGithub,
  FaNode,
  FaCode,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiCplusplus,
  SiVercel,
  SiRender,
  SiMarkdown,
  SiCanva,
  SiJson,
  SiNpm,
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiJest,
  SiVitest,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import DomeGallery from "./DomeGallery.jsx";
import WordScrollReveal from "./WordScrollReveal.jsx";

const skillsData = [
  { name: "HTML5", icon: FaHtml5, color: "#E34C26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#FFFFFF" },
  { name: "Node.js", icon: FaNode, color: "#68A063" },
  { name: "Express", icon: SiExpress, color: "#90c53f" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "MongoDB", icon: SiMongodb, color: "#13AA52" },
  { name: "DSA", icon: FaCode, color: "#FFFFFF" },
  { name: "GitHub", icon: FaGithub, color: "#181717" },
  { name: "Jest", icon: SiJest, color: "#C21325" },
  { name: "Vitest", icon: SiVitest, color: "#6E9F18" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Render", icon: SiRender, color: "#46E3B7" },
  { name: "Markdown", icon: SiMarkdown, color: "#083FA1" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
  { name: "JSON", icon: SiJson, color: "#F7DF1E" },
  { name: "NPM", icon: SiNpm, color: "#CB3837" },
];

const AnimatedTitle = ({ text, className }) => {
  return (
    <h2
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        perspective: "1000px",
        cursor: "default",
      }}
    >
      {text.split("").map((char, i) => (
        <Motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.05,
            type: "spring",
            stiffness: 150,
            damping: 12,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -5,
            scale: 1.2,
            color: "var(--accent-primary)",
            textShadow: "0 0 10px rgba(var(--accent-primary-rgb), 0.5)",
            transition: { duration: 0.2 },
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </Motion.span>
      ))}
    </h2>
  );
};

const SkillsProgress = () => {
  const globeIcons = useMemo(
    () =>
      skillsData.map((s) => ({
        icon: s.icon,
        color: s.color,
        alt: s.name,
      })),
    [],
  );

  return (
    <section className="skills-container" id="skills">
      <div className="skills-bg-grid" />

      <Motion.div
        className="skills-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatedTitle text="What I Build" className="skills-title" />
        <p className="skills-subtitle">Technologies & Tools I Use</p>
      </Motion.div>

      <Motion.div
        className="dome-container"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <DomeGallery
          images={globeIcons}
          minRadius={500}
          autoRotate={true}
          rotationSpeed={0.4}
          grayscale={false}
          fit={1}
          padFactor={0.22}
          imageBorderRadius="50%"
          segments={28}
          overlayBlurColor="#0b1135"
        />
      </Motion.div>

      <div className="skills-description-text">
        {/* <WordScrollReveal
                        words={[
                            'Dynamic',
                            'User‑Friendly',
                            'HTML',
                            'CSS',
                            'JavaScript',
                            'React',
                            'Next.js',
                            'Fast',
                            'Accessible',
                            'Responsive',
                            'Components',
                            'State',
                            'APIs',
                            'Data Flow',
                            'Deploy',
                            'Python',
                            'C++',
                            'Python',
                            'Databases',
                            'Authentication',
                            'Engineering',
                            'Efficient Algorithms',
                            'Problem‑Solving',
                            'Efficient Code',
                            'Smooth UX',
                            'Intentional UI',
                            'Code',
                            'Develope',
                            'Debug',
                        ]}
                        topLabel="Scroll to reveal"
                        // bottomLabel="I build clean, fast, animated web experiences"
                        seed="skills-what-i-build"
                        variant="frameless"
                        showHint={false}
                        showProgress={false}
                    /> */}
      </div>
    </section>
  );
};

export default SkillsProgress;
