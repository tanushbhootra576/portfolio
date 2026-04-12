# 🛠️ VS Code Setup & Recommended Extensions

## Quick Setup

### 1. Copy This Into `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.associations": {
    "*.css": "css",
    "*.jsx": "javascriptreact",
    "*.tsx": "typescriptreact"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true
  },
  "editor.rulers": [80, 120],
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

---

## 📦 Recommended VS Code Extensions

### **Essential (Must Have)**

1. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - Purpose: Lint JavaScript/React for errors and warnings
   - Status: ⭐ Already set up in this project

2. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Purpose: Auto-format code on save
   - Config: Uses `.prettierrc` (create if missing)

3. **React Refactor**
   - ID: `planbcoding.vscode-react-refactor`
   - Purpose: Quick refactoring commands for React components
   - Shortcuts: Auto-extract hooks, convert to functional, etc.

### **Accessibility & Quality**

4. **axe DevTools**
   - ID: `deque-systems.vscode-axe-linter`
   - Purpose: Real-time accessibility issue detection
   - Highlights: Missing alt text, contrast issues, ARIA errors

5. **WebHint**
   - ID: `webhint.vscode-webhint`
   - Purpose: Best practices for performance, SEO, security
   - Validates: Meta tags, image optimization, CSS efficiency

6. **SonarLint**
   - ID: `sonarsource.sonarlint-vscode`
   - Purpose: Code quality analysis (bugs, security, maintainability)
   - Smart: Rules-based code inspection

### **Performance & Images**

7. **Image preview**
   - ID: `kisstkondoros.vscode-gutter-preview`
   - Purpose: See image previews in gutter while editing
   - Useful: Verify image paths, sizes

8. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`
   - Purpose: Quick React component snippets
   - Shortcuts: `rfc` → functional component, `useeffect` → hook

### **CSS & Styling**

9. **CSS Modules** (if using CSS modules)
   - ID: `clinyong.vscode-css-modules`
   - Purpose: Auto-complete class names from CSS

10. **Tailwind CSS IntelliSense** (For future Tailwind migration)
    - ID: `bradlc.vscode-tailwindcss`
    - Purpose: Tailwind class suggestions and documentation

### **Version Control & Collaboration**

11. **GitLens**
    - ID: `eamodio.gitlens`
    - Purpose: See commit history, blame, changes inline
    - Useful: Track when/why components changed

12. **GitHub Copilot** (Optional, paid)
    - ID: `GitHub.copilot`
    - Purpose: AI-assisted code generation

---

## 🚀 Workflow Commands

### Quick ESLint & Prettier Cleanup

Run in terminal (VS Code integrates these):

```bash
# Auto-fix all fixable ESLint issues
npx eslint src --fix

# Format ALL files with Prettier
npx prettier --write src

# Combined: Fix + Format
npx eslint src --fix && npx prettier --write src

# Run tests
npm test

# Watch tests during development
npm run test:watch

# Build production version
npm run build

# Preview production build locally
npm run preview
```

### Recommended Keyboard Shortcuts

Add to `.vscode/keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+f",
    "command": "editor.action.formatDocument",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+alt+l",
    "command": "eslint.executeAutofix",
    "when": "editorTextFocus"
  }
]
```

---

## 🎯 Pre-Commit Workflow

### Setup Husky + Lint-Staged (Optional but Recommended)

```bash
# Install dev dependencies
npm install -D husky lint-staged

# Initialize husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

### Create `.lintstagedrc` in project root:

```json
{
  "*.{js,jsx,tsx,ts}": ["eslint --fix", "prettier --write"],
  "*.{css,html}": ["prettier --write"]
}
```

**Result:** Automatically fixes/formats code before commits.

---

## 📊 Useful VS Code Commands (Ctrl+Shift+P)

| Command                                 | Purpose                              |
| --------------------------------------- | ------------------------------------ |
| `ESLint: Fix All Auto-fixable Problems` | Auto-fix linting errors              |
| `Format Document`                       | Apply Prettier formatting            |
| `Organize Imports`                      | Remove unused, sort imports          |
| `Go to Definition`                      | Jump to function/class definition    |
| `Find All References`                   | Find all usages of symbol            |
| `Rename Symbol`                         | Refactor variable/function names     |
| `Extract to Function`                   | Pull selected code into new function |

---

## ✅ File Template for New Components

Create `.vscode/snippets/react.code-snippets`:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import './${1:ComponentName}.css';",
      "",
      "const ${1:ComponentName} = () => {",
      "  return (",
      "    <section className=\"${1/([A-Z])/\\L$1/g}\" aria-labelledby=\"${1/([A-Z])/\\L$1/g}-title\">",
      "      <h2 id=\"${1/([A-Z])/\\L$1/g}-title\">\\${1:ComponentName}</h2>",
      "      {/* Content */}",
      "    </section>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ],
    "description": "Create a new accessible React functional component"
  },

  "Image with Optimization": {
    "prefix": "img-opt",
    "body": [
      "<img",
      "  src=\"$1\"",
      "  alt=\"$2\"",
      "  loading=\"lazy\"",
      "  decoding=\"async\"",
      "  width={$3}",
      "  height={$4}",
      "/>"
    ],
    "description": "Optimized image with lazy loading and explicit dimensions"
  }
}
```

---

## 🧪 Debug Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "/src/*": "${workspaceFolder}/src/*"
      }
    }
  ]
}
```

**Usage:** Press F5 to start debugging in Chrome.

---

## 🎨 Theme Recommendation

**Suggested dark theme for accessibility:**

- Install: "Dracula Official" or "One Dark Pro"
- Why: High contrast, easy on eyes, works well with light text on dark background

---

## 📝 Project Structure in Explorer

Right-click on `.vscode` folder → Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "planbcoding.vscode-react-refactor",
    "deque-systems.vscode-axe-linter",
    "webhint.vscode-webhint",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens"
  ]
}
```

**Result:** When team members open project, VS Code suggests these extensions.

---

## 🔄 Daily Workflow Checklist

1. **Start dev server** → `npm run dev`
2. **Open DevTools** → `F12` for Accessibility panel
3. **Write code** → Editor auto-formats on save
4. **Check warnings** → Look for red squiggles (ESLint, Prettier)
5. **Commit code** → Husky pre-commit hook runs linting
6. **Before push** → Run `npm run build` and verify no errors
7. **Test Lighthouse** → Open Incognito, run audit

---

## 🚨 Common Issues & Fixes

### Issue: Prettier & ESLint Conflict

**Fix:** Install `eslint-config-prettier`:

```bash
npm install -D eslint-config-prettier
```

Update `.eslintrc.js`:

```js
extends: ['eslint:recommended', 'prettier']
```

### Issue: Changes not saving

**Fix:** Check if `formatOnSave` is enabled in settings.json

### Issue: Console errors despite code looking fine

**Fix:** Clear cache, restart TypeScript:

- Cmd+Shift+P → "TypeScript: Restart TS Server"

---

## 📚 Additional Resources

- **Accessibility Testing:** https://www.a11y-101.com/
- **Lighthouse Docs:** https://developers.google.com/web/tools/lighthouse
- **React Best Practices:** https://react.dev/
- **Prettier Config:** https://prettier.io/docs/options
- **ESLint Rules:** https://eslint.org/docs/rules/

---

**Setup Complete!** 🎉

Your VS Code is now optimized for:
✅ Clean, formatted code  
✅ Accessibility-first development  
✅ Performance monitoring  
✅ Real-time linting & feedback  
✅ Efficient collaboration

Start by running `npm run dev` and opening the app at `http://localhost:5173`.
