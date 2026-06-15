import puppeteer from 'puppeteer';
import path from 'path';

async function takeScreenshot() {
    console.log("Launching browser for GitPreview snapshot...");
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    const link = "https://gitview-seven.vercel.app/";
    const imagePath = path.join(process.cwd(), 'public', 'imgs', 'gitpreview.webp');
    
    try {
        console.log(`Navigating to ${link}...`);
        await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });
        
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for animations

        console.log(`Saving screenshot to: ${imagePath}`);
        await page.screenshot({ path: imagePath, type: 'webp', quality: 90 });
        console.log("Success!");
    } catch (error) {
        console.error(`Failed to capture: ${error.message}`);
    }

    await browser.close();
}

takeScreenshot();
