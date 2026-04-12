# 📱 Testing Guide: Responsive Design & Accessibility

## Quick Start: Run the App

```bash
# Install dependencies (if not already done)
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🎯 Responsive Design Testing

### 1. **Chrome DevTools Device Emulation**

1. **Open Chrome → Press `Ctrl+Shift+M`** (toggle Device Toolbar)
2. **Start at Mobile (320px)**
   - Click dropdown → Select "iPhone SE" or enter 320px width
   - Check:
     - No horizontal scrolling
     - Text is readable (min 16px font on mobile)
     - Touch targets are 44px× minimum
     - Navigation stacks vertically

3. **Test Breakpoints (in order):**
   - 320px (iPhone SE) ✓
   - 640px (iPhone Pro landscape) ✓
   - 768px (iPad) ✓
   - 1024px (iPad Pro) ✓
   - 1440px (Desktop) ✓
   - 1920px (4K) ✓

### 2. **Spacing Validation**

Use Chrome DevTools **Computed Styles** to verify section padding:

```css
/* Expected on mobile (<640px) */
section {
  padding-top: 64px; /* py-16 */
  padding-bottom: 64px;
}

/* Expected on desktop (≥768px) */
section {
  padding-top: 96px; /* py-24 */
  padding-bottom: 96px;
}
```

**Steps:**

1. Right-click on section → Inspect
2. Go to "Computed" tab
3. Search for "padding"
4. Verify values match above

---

## ♿ Accessibility Testing

### 1. **Keyboard Navigation (Tab Key)**

1. Open site in Chrome
2. Press **Tab** repeatedly through entire page
3. Verify:
   - Focus outline visible (white 2px border on dark background)
   - Order logical and left-to-right
   - Can reach all buttons, links, forms
   - Skip-to-main-content link (if present)

**Expected focus style:**

```css
:focus {
  outline: 2px solid var(--accent-primary); /* White outline */
  outline-offset: 2px;
}
```

### 2. **Screen Reader Testing** (Windows: NVDA, Mac: VoiceOver)

#### Using NVDA (Free, Windows)

1. Download & install [NVDA](https://www.nvaccess.org/)
2. Open site in Chrome
3. Press **Insert + Enter** to start NVDA
4. Listen for:
   - Page title announced
   - Heading hierarchy: "Heading 1: Portfolio", "Heading 2: About Me", etc.
   - Button labels: "GitHub, opens in new tab"
   - Section titles as landmarks

#### Using VoiceOver (Mac/iOS)

1. Press **Cmd + F5** to enable
2. Use **VO (Control + Option) + U** to open rotor
3. Navigate through headings and landmarks
4. Verify proper hierarchy

### 3. **Axe DevTools Chrome Extension**

1. Install [Axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools/lhdoppojpmngadmnkmen3kfkdkgoakgm)
2. Right-click page → Click "Scan page with axe"
3. Review **Issues** tab:
   - Target color contrast
   - Missing alt text
   - Empty headings
   - Form labeling

**Target:** 0 errors, minimal warnings

---

## 🚀 Performance Testing with Lighthouse

### 1. **Setup: Incognito Mode (Important!)**

- Extensions can skew results
- Chrome: **Ctrl+Shift+N** (Windows) or **Cmd+Shift+N** (Mac)

### 2. **Run Lighthouse Audit**

1. Open DevTools: **F12**
2. Go to **Lighthouse** tab
3. Change settings:
   - Device: **Mobile** (test mobile first)
   - Uncheck "Throttling" (for baseline)
4. Click **Analyze page load**

### 3. **Review Scores & Metrics**

**Target Scores:**
| Metric | Target | Current |
|--------|--------|---------|
| **Performance** | 90+ | ? |
| **Accessibility** | 90+ | ? |
| **Best Practices** | 90+ | ? |
| **SEO** | 95+ | ? |

**Core Web Vitals (inspect each):**

```
LCP (Largest Contentful Paint)
  Target: < 2.5 seconds
  What it is: When main content is visible

FID (First Input Delay) / INP (Interaction to Next Paint)
  Target: < 200ms
  What it is: Response time to user interaction

CLS (Cumulative Layout Shift)
  Target: < 0.1
  What it is: Unwanted visual movement during load
```

### 4. **Debug Common Issues**

#### Problem: Poor LCP

```
Solution:
- Lazy load images below fold (already done ✓)
- Preload hero image
- Reduce render-blocking resources
```

#### Problem: Low Accessibility Score

```
Check:
- Heading hierarchy (h1 > h2 > h3)
- Color contrast (use Axe or WAVE)
- Alt text on all images
- Form labels
- ARIA roles
```

#### Problem: Layout Shift (CLS)

```
Check images have explicit width/height:
<img width={400} height={300} ... />  ✓

Check fonts are loaded before render:
@import url("...?display=swap")  ✓
```

---

## 🖼️ Image Optimization Checklist

### Verify Image Attributes

Open DevTools **Network** tab, filter by "Images":

```jsx
✓ Lazy loading:
  <img loading="lazy" ... />

✓ Async decoding:
  <img decoding="async" ... />

✓ Explicit dimensions (prevent shift):
  <img width={400} height={300} ... />

✓ Descriptive alt text:
  alt="Portfolio Website – A personal portfolio built with React..."
```

### Test Lazy Loading

1. **Network tab** → Filter "img"
2. Scroll down slowly
3. Verify images load as you approach them (not all at once on page load)

### Future: WebP/AVIF with Fallback

```jsx
<picture>
  <source srcSet="/img.avif" type="image/avif" />
  <source srcSet="/img.webp" type="image/webp" />
  <img src="/img.jpg" alt="..." loading="lazy" />
</picture>
```

---

## 📊 SEO Validation

### 1. **Check Meta Tags**

Open DevTools **Elements** tab, search for `<head>`:

```html
✓ <title>Tanush | Senior Front-End Developer Portfolio</title> ✓
<meta name="description" content="..." /> ✓
<meta property="og:title" content="..." /> ✓
<meta property="og:image" content="..." /> ✓
<meta name="viewport" content="width=device-width, ..." /> ✓
<meta name="theme-color" content="#000000" />
```

### 2. **Heading Hierarchy**

Use Axe DevTools "Headings" view:

```
Heading 1 (only 1 per page)
  ├─ Heading 2: About Me
  ├─ Heading 2: Skills
  ├─ Heading 2: Featured Projects
  │   └─ Heading 3: Project Title
```

### 3. **Alt Text Coverage**

```bash
# In DevTools Console:
JSON.stringify(
  Array.from(document.querySelectorAll('img'))
    .map(img => ({
      src: img.src,
      alt: img.alt,
      hasAlt: !!img.alt
    }))
);
```

Should show **100% images have alt text**.

---

## 🧪 Browser & Device Testing

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox
- [ ] Safari (if Mac)
- [ ] Edge

### Mobile Devices

- [ ] iPhone 12/13 (Safari)
- [ ] Samsung Galaxy (Chrome)
- [ ] iPad (Safari)

### Quick Mobile Test (without device)

1. Chrome DevTools → **Toggle Device Toolbar** (`Ctrl+Shift+M`)
2. Click **Responsive** → Enter custom width
3. Test touch by clicking (simulates tap events)

---

## 📋 Final Checklist Before Production

- [ ] **Responsive:** 320px–4K all working
- [ ] **Accessibility:** Tab navigation works, focus visible, 90+ score
- [ ] **Performance:** Lighthouse 90+ on all metrics
- [ ] **Images:** All have lazy + decoding + dimensions
- [ ] **SEO:** Meta tags present, heading hierarchy correct
- [ ] **Touch:** No hover-only buttons, 44px minimum targets
- [ ] **Build:** `npm run build` succeeds, no errors
- [ ] **Bundle:** Check size – no bloat detected

---

## 🎯 Performance Budget

```
Target bundle size: < 300KB gzipped (JS)
Current: 258.93 KB ✓ GOOD

Target: No chunks > 500KB (can split)
Current: 707.73 KB (before gzip) ⚠️ Consider chunking
```

**Recommendation:** Split GSAP, Framer Motion, Three.js into separate chunks.

---

_Generated: March 31, 2026 | Framework: React 19 + Vite_
