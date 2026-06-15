import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const projects = [
    {
        title: "Epistemic Protocol",
        description: "A decentralized code provenance protocol leveraging Zero-Knowledge cryptography and biometric authentication to verify secure developer identity and commit integrity under strict execution environments.",
        tech: ["TypeScript", "Rust", "Python", "Docker", "ZK-Snarks"],
        image: "/imgs/WeatherApp.webp", // Consider renaming this asset to match the project name
        link: "https://epistemic-lac.vercel.app/",
        github: "" 
    },
    {
        title: "VoxMotion",
        description: "An autonomous rescue scout robot prototype featuring a custom triple-redundant control system that integrates real-time tactical remote feeds, voice-command processing, and automated spatial hazard mapping.",
        tech: ["C++", "Robotics Engineering", "Hardware Control", "Embedded Systems"],
        image: "/imgs/voxmotion.webp",
        link: "",
        github: ""
    },
    {
        title: "use-web-kit",
        description: "A high-performance, zero-dependency utility toolkit for React 19 engineered to prevent browser memory leaks, optimize complex DOM node lifecycles, and handle asynchronous background processes using dedicated worker pooling.",
        tech: ["TypeScript", "React 19", "Performance Engineering", "Web Workers"],
        image: "/imgs/use-web-kit.webp",
        link: "",
        github: ""
    },
    {
        title: "CampusConnect",
        description: "A secure, comprehensive academic management platform and social hub designed for student collaboration, featuring automated web-scraping utilities for instant portal syncing and an integrated distributed file drive.",
        tech: ["Next.js", "TypeScript", "MongoDB", "Puppeteer", "TailwindCSS"],
        image: "/imgs/CampusConnect.webp",
        link: "https://studentverse-amber.vercel.app/",
        github: "https://github.com/tanushbhootra576/camp.git"
    },
    {
        title: "GridSaga",
        description: "A 3D logic puzzle game combining core mechanics of 2048 with spatial Rubik's Cube rotations, featuring modular state management and procedural level generation.",
        tech: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "TailwindCSS"],
        image: "/imgs/GridSaga.webp",
        link: "https://grid-saga.vercel.app/",
        github: "https://github.com/tanushbhootra576/GridSaga.git"
    },
    {
        title: "JurisAI",
        description: "An AI-powered legal assistant chat platform engineered to parsing text data structures and deliver accurate, contextual citations regarding cyber laws and regulatory frameworks.",
        tech: ["React", "Node.js", "MongoDB", "LLM Integration", "TailwindCSS"],
        image: "/imgs/JurisAI.webp",
        link: "https://jurisai-ochre.vercel.app/",
        github: "https://github.com/tanushbhootra576/JurisAI.git"
    },
    {
        title: "LenScape",
        description: "A visually driven photography portfolio featuring premium, high-fidelity glassmorphic user interfaces and optimized asset layouts backed by modern fluid animation orchestration.",
        tech: ["React", "Framer Motion", "GSAP", "TailwindCSS"],
        image: "/imgs/LenScape.webp",
        link: "https://lenscape-i692.onrender.com/",
        github: "https://github.com/tanushbhootra576/lenscape.git"
    }
];

async function takeScreenshots() {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 }); // Set standard desktop resolution

    for (const project of projects) {
        if (!project.link) {
            console.log(`\nSkipping "${project.title}": No website link provided.`);
            continue;
        }

        try {
            console.log(`\nNavigating to ${project.link}...`);
            await page.goto(project.link, { waitUntil: 'networkidle2', timeout: 60000 });
            
            // Wait a few extra seconds to ensure all animations and fonts finish loading
            await new Promise(resolve => setTimeout(resolve, 5000));

            // We assume you are running this from your project root. 
            // This will save files into "public/imgs/..." relative to where you run it.
            const imagePath = path.join(process.cwd(), 'public', project.image);
            const dir = path.dirname(imagePath);
            
            // Create directory if it doesn't exist
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            console.log(`Saving screenshot for "${project.title}" to: ${imagePath}`);
            // Take screenshot as WebP (since your paths have .webp extensions)
            await page.screenshot({ path: imagePath, type: 'webp', quality: 90 });
            
        } catch (error) {
            console.error(`Failed to capture "${project.title}": ${error.message}`);
        }
    }

    await browser.close();
    console.log("\nFinished taking screenshots!");
}

takeScreenshots();
