# Y. Siva Ganesh — Portfolio

Personal portfolio website built for deployment on **GitHub Pages**.

**Live Site:** `https://<your-username>.github.io/<repo-name>/`

---

## 🗂 Folder Structure

```
portfolio/
├── index.html              ← Main entry point (GitHub Pages serves this)
├── README.md
├── .nojekyll               ← Tells GitHub Pages to skip Jekyll processing
└── assets/
    ├── css/
    │   └── style.css       ← All styles (Kinetic Minimalist dark theme)
    ├── js/
    │   └── main.js         ← Animations, canvas, typing, form
    └── resume.pdf          ← Your resume (add your own file here)
```

---

## ✨ Features

- **Fly-in animations** — hero elements animate in on page load; all other sections animate as you scroll
- **Particle canvas background** — floating connected-node network (cyan / indigo / purple palette)
- **Typing effect** — hero subtitle cycles through phrases
- **Cursor glow** — radial gradient follows the mouse on desktop
- **Glassmorphism cards** — project, skill, and contact cards with blur + border effects
- **Rotating avatar ring** — subtle gradient ring around the profile photo
- **Active nav highlight** — navbar link activates based on scroll position
- **Mobile responsive** — hamburger menu, responsive grid, adaptive typography
- **Contact form** — client-side validation with success message

---

## 🚀 Deploy to GitHub Pages

### Option A — Root of `main` branch (simplest)

1. Push all files to the root of your `main` (or `master`) branch.
2. Go to **Settings → Pages → Source** → select `Branch: main` / `/ (root)`.
3. Save — your site will be live at `https://<username>.github.io/<repo>/`.

### Option B — `/docs` folder

1. Move all files into a `docs/` folder.
2. In **Settings → Pages**, set source to `Branch: main` / `/docs`.

---

## ⚙️ Customisation Checklist

| Item | Where |
|------|--------|
| Replace profile photo | Update the `src` URL in `index.html` → `.avatar-img` |
| Update contact email / phone | `index.html` → `#contact` section |
| Add your resume PDF | Place it at `assets/resume.pdf` |
| Update project links | `index.html` → each `.project-link` `href` |
| Update social links | `index.html` → footer links |
| Adjust typing phrases | `assets/js/main.js` → `words` array |
| Change particle count | `assets/js/main.js` → `COUNT` variable |
