import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const projects = [
    {
        title: "Epistemic Protocol",
        link: "https://epistemic-lac.vercel.app/",
        image: "/imgs/WeatherApp.webp"
    },
    {
        title: "TheSuperRAG",
        link: "https://the-super-rag.vercel.app/",
        image: "/imgs/TheSuperRAG.webp"
    },
    {
        title: "VoxMotion",
        link: "",
        image: "/imgs/voxmotion.webp"
    },
    {
        title: "use-web-kit",
        link: "https://use-web-kit.vercel.app/",
        image: "/imgs/use-web-kit.webp"
    },
    {
        title: "CampusConnect",
        link: "https://studentverse-amber.vercel.app/",
        image: "/imgs/CampusConnect.webp"
    },
    {
        title: "JurisAI",
        link: "https://jurisai-ochre.vercel.app/",
        image: "/imgs/JurisAI.webp"
    },
    {
        title: "LenScape",
        link: "https://lenscape-i692.onrender.com/",
        image: "/imgs/LenScape.webp"
    }
];

async function downloadImages() {
    console.log("Launching browser to extract images...");
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    // Simulate realistic browser to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    for (const project of projects) {
        if (!project.link) {
            console.log(`\nSkipping "${project.title}": No link provided.`);
            continue;
        }

        try {
            console.log(`\nNavigating to ${project.link} to find images...`);
            await page.goto(project.link, { waitUntil: 'networkidle2', timeout: 60000 });
            
            // Wait a few seconds for dynamic content
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Extract the Open Graph image or the largest img tag on the page
            const targetImageUrl = await page.evaluate(() => {
                // First try: Open Graph image (usually the best thumbnail)
                const ogImage = document.querySelector('meta[property="og:image"]');
                if (ogImage && ogImage.content) {
                    return ogImage.content;
                }
                
                // Second try: Find the largest image on the page
                const imgs = Array.from(document.querySelectorAll('img'));
                let largestImg = null;
                let maxArea = 0;
                
                for (const img of imgs) {
                    const rect = img.getBoundingClientRect();
                    const area = rect.width * rect.height;
                    // Ignore tiny icons and data URIs
                    if (area > maxArea && img.src && !img.src.startsWith('data:')) {
                        maxArea = area;
                        largestImg = img.src;
                    }
                }
                return largestImg;
            });

            if (!targetImageUrl) {
                console.log(`No suitable <img> tag found for "${project.title}".`);
                continue;
            }

            console.log(`Found image for "${project.title}": ${targetImageUrl}`);

            // Download the image
            const imagePath = path.join(process.cwd(), 'public', project.image);
            const dir = path.dirname(imagePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            await new Promise((resolve, reject) => {
                const client = targetImageUrl.startsWith('https') ? https : http;
                client.get(targetImageUrl, (res) => {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Status Code: ${res.statusCode}`));
                        return;
                    }
                    const fileStream = fs.createWriteStream(imagePath);
                    res.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close();
                        console.log(`Successfully downloaded and saved: ${imagePath}`);
                        resolve();
                    });
                }).on('error', (err) => {
                    reject(err);
                });
            });
            
        } catch (error) {
            console.error(`Failed to scrape image for "${project.title}": ${error.message}`);
        }
    }

    await browser.close();
    console.log("\nFinished downloading all images!");
}

downloadImages();
