# 🚀 Build & Deployment Optimization Guide

## Current Build Status

```
✓ Production build: Successful
✓ Total modules: 882 transformed
✓ Build time: 8.13s
✓ Output:
  - index.html: 2.21 kB
  - CSS bundle: 57.72 kB (gzip: 12.33 kB)
  - JS chunk 1: 47.36 kB (gzip: 17.39 kB)
  - JS chunk 2: 707.73 kB (gzip: 258.93 kB) ⚠️ LARGE
```

---

## ⚠️ Addressing Bundle Size

### Issue: Single JS chunk is 707.73 kB

**Root Cause:**

- All dependencies bundled together (GSAP, Three.js, Framer Motion, Ant Design, Locomotive Scroll, SherryJS)
- No code splitting or lazy loading for components

**Solution: Dynamic Code Splitting**

### Step 1: Lazy Load Heavy Components

Replace static imports with `React.lazy()`:

```jsx
// Before
import Projects3DSection from "./components/projects/Projects3DSection";
import WebGLGallery from "./components/WebGLGallery";

// After
const Projects3DSection = React.lazy(
  () => import("./components/projects/Projects3DSection"),
);
const WebGLGallery = React.lazy(() => import("./components/WebGLGallery"));
```

Wrap in Suspense:

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <Projects3DSection />
</Suspense>
```

### Step 2: Manual Chunks in Vite Config

Update `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          gsap: ["gsap", "@gsap/react"],
          three: ["three"],
          framer: ["framer-motion"],
          antd: ["antd"],
          lenis: ["lenis", "locomotive-scroll"],

          // Feature chunks
          projects: [
            "./src/components/projects/Projects3DSection",
            "./src/components/CustomCompo/TextPressure",
          ],
          animations: [
            "./src/components/Landing/ShinyText",
            "./src/components/RotatingText/Compo",
          ],
        },
      },
    },
    // Limit chunk warnings
    chunkSizeWarningLimit: 1000,
  },
});
```

**Expected Result:**

```
Before: 707 kB (1 chunk)
After:  ~150-200 kB main + split chunks (loaded on-demand)
```

### Step 3: Preload Critical Chunks

In `index.html`, preload hero resources:

```html
<head>
  <!-- Preload fonts ASAP -->
  <link
    rel="preload"
    as="font"
    href="/fonts/Montserrat.woff2"
    type="font/woff2"
    crossorigin
  />

  <!-- Preload critical path -->
  <link rel="preload" as="style" href="/assets/index-[hash].css" />
  <link rel="preload" as="script" href="/assets/index-[hash].js" />
</head>
```

---

## 📊 Bundle Analysis

### View Current Bundle Breakdown

```bash
# Install analyzer (dev-only)
npm install -D vite-plugin-visualizer

# Update vite.config.js
import { visualizer } from 'vite-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,  // Auto-open browser
      gzipSize: true,
      brotliSize: true
    })
  ]
}

# Build and analyze
npm run build
# Opens http://localhost:5173/status.html with interactive chart
```

---

## 🎯 Dependency Audit & Optimization

### Check for Unused Dependencies

```bash
# Install depcheck
npm install -D depcheck

# Scan project
npx depcheck
```

Expected unused (safe to ignore):

- TypeScript (dev-only)
- ESLint plugins (dev-only)

**Potential removals:**

- Ant Design (`antd`) - only using some buttons?
  - Consider: Headless UI or custom buttons
- Shery.js - if mostly unused
  - Consider: Replace with Framer Motion equivalents

### Remove Unused Package

```bash
# Example: if truly unused
npm uninstall antd

# Update imports
grep -r "from 'antd'" src/
# Remove all imports, replace with custom components
```

---

## 🔄 Incremental Build Optimization

### Priority 1: Code Splitting (Immediate Impact)

- [ ] Update vite.config.js with manualChunks
- [ ] Add React.lazy() to Projects, Skills sections
- [ ] Add Suspense boundaries with loading states
- **Expected:** 40% JS reduction for LCP

### Priority 2: Image Optimization (Quick Win)

- [ ] Convert portfolio images to WebP/AVIF
- [ ] Add responsive srcset
- [ ] Verify lazy loading works
- **Expected:** 50% image size reduction

### Priority 3: Library Cleanup

- [ ] Audit unused npm packages
- [ ] Replace heavy UI libraries with minimal alternatives
- [ ] Tree-shake utility libraries
- **Expected:** 20-30% size reduction

### Priority 4: CSS Minification

- [ ] Migrate to Tailwind (smaller output)
- [ ] Remove component CSS files (use Tailwind)
- [ ] Purge unused CSS classes
- **Expected:** 30% CSS reduction

---

## 🚀 Deployment Recommendations

### Hosting Options

| Platform             | Cost      | Features                                     | Recommendation    |
| -------------------- | --------- | -------------------------------------------- | ----------------- |
| **Vercel**           | Free tier | Zero-config deploy, preview URLs, serverless | ⭐ Best for React |
| **Netlify**          | Free tier | Auto deployments, form handling, analytics   | ⭐ Alternative    |
| **GitHub Pages**     | Free      | Simple, works with static builds             | Basic             |
| **Cloudflare Pages** | Free      | Fast global CDN, Workers support             | Good              |

### Deploy to Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel
# Follow prompts, accepts vite default settings

# 4. Production deployment
vercel --prod
```

### Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod --dir=dist
```

---

## 🔐 Environment Variables

Create `.env` file (git-ignored):

```env
# API Endpoints
VITE_API_BASE=https://api.example.com
VITE_EMAIL_SERVICE=https://formspree.io/f/xyzabc

# Analytics
VITE_GA_ID=G-XXXXXXXXXXXXX

# Feature flags
VITE_ENABLE_BETA=false
```

Use in code:

```js
const apiBase = import.meta.env.VITE_API_BASE;
```

---

## 📈 Monitoring Post-Deployment

### Setup Lighthouse CI (Free)

```bash
# 1. Install
npm install -D @lhci/cli@latest

# 2. Create lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "cumululative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
      }
    }
  }
}

# 3. Run
lhci autorun
```

### Monitor Core Web Vitals in Production

```js
// src/main.jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

Install:

```bash
npm install web-vitals
```

---

## 🧪 Pre-Deployment Checklist

- [ ] **Build succeeds** → `npm run build` ✓
- [ ] **No console errors** → Check DevTools
- [ ] **Lighthouse passed** → Scores 90+ all metrics
- [ ] **Images optimized** → WebP, lazy load, alt text
- [ ] **Bundle analyzed** → No unexpected large chunks
- [ ] **Mobile tested** → Responsive at 320px–4K
- [ ] **Accessibility tested** → Keyboard navigation, ARIA
- [ ] **Security headers** → If hosting on custom server
- [ ] **DNS/SSL configured** → If custom domain
- [ ] **Analytics setup** → Track user engagement

---

## Post-Deployment: Continuous Improvement

### Weekly Checks

- Monitor bundle size trends
- Check Lighthouse scores
- Review Core Web Vitals
- Look for performance regressions

### Monthly Maintenance

- Update dependencies (`npm outdated`)
- Audit for security (`npm audit`)
- Review user analytics
- Optimize slow pages

### Quarterly Strategy

- Plan major feature additions
- Refactor under-performing components
- Migrate static assets to CDN if growth warrants
- Profile new heavy dependencies before adding

---

## 📞 Performance Budget

```
Target metrics for production:

JS:  < 300 kB gzipped (currently 258.93 kB) ✅
CSS: < 50 kB gzipped (currently 12.33 kB) ✅
LCP: < 2.5 seconds
FID: < 100 milliseconds
CLS: < 0.1
TTL: < 3 seconds

When adding new features:
- Don't exceed JS budget by >20%
- Profile new dependencies before committing
- Test Lighthouse impact before deploying
```

---

## Troubleshooting Build Issues

### Issue: Build takes too long

```bash
# Profile build time
npm run build -- --profile

# Solutions:
# 1. Add manual chunks (see above)
# 2. Remove unused dependencies
# 3. Upgrade Node.js: nvm use 20
```

### Issue: Build succeeds locally but fails on deploy

```bash
# Common causes:
# 1. Environment variables missing → Add to CI/CD secrets
# 2. Node version mismatch → Specify .nvmrc
# 3. Missing build step → Check workflows

echo "20.11.0" > .nvmrc
```

### Issue: Source maps too large

```js
// vite.config.js
build: {
  sourcemap: true,  // Keep for debugging
  rollupOptions: {
    output: {
      sourcemapExcludeSources: true  // Exclude source code
    }
  }
}
```

---

**Next:** Deploy to Vercel or Netlify, then monitor with Lighthouse CI! 🚀
