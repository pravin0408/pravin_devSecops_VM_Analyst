# Pravin // DevSecOps Operations Console

A 3D, interactive DevSecOps portfolio built with **React**, **React Three Fiber**,
**Three.js**, **Drei**, and **Tailwind CSS**, shipped as a static SPA for
**GitHub Pages**.

## Stack

- Vite + React 18
- `@react-three/fiber` + `@react-three/drei` + `three` — the 3D hero globe
- `react-router-dom` (`HashRouter`) — client-side routing that survives a
  hard refresh on GitHub Pages (no server rewrite rules needed)
- Tailwind CSS — the "Cyber Operations Center" theme (dark, neon
  cyan/green, monospace data overlays)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to ./dist
npm run preview   # sanity-check the production build locally
```

## Project structure

```
public/
  data.json            # certifications + consolidated timeline
  cves.json            # CVE / vulnerability matrix
  assets/certs/        # certificate images (put your files here)
src/
  App.jsx              # route definitions (HashRouter)
  components/
    Navbar.jsx
    Scene3D.jsx         # the interactive hero globe
    EvidenceDashboard.jsx
    CertGrid.jsx
    CertModal.jsx
    CVEMatrix.jsx
    Timeline.jsx
    TerminalShowcase.jsx
  pages/
    Home.jsx
```

## Managing your "uploads" without a backend

This is a static site — there's no upload button and no database. Instead,
you manage evidence the same way you manage code:

1. **Save your certificate file** into `public/assets/certs/`
   (e.g. `public/assets/certs/aws_security.jpg`).
2. **Register it** by adding/editing an entry in `public/data.json`:
   ```json
   {
     "id": "cert-aws-sec",
     "name": "AWS Certified Security – Specialty",
     "issuer": "Amazon Web Services",
     "date": "2025-03-14",
     "verificationId": "AWS-SEC-84213-VER",
     "image": "/assets/certs/aws_security.jpg",
     "category": "Cloud Security",
     "credentialUrl": ""
   }
   ```
3. **Log new vulnerability findings** the same way in `public/cves.json`.
4. **Commit and push.** GitHub Pages rebuilds automatically and the new
   certificate/CVE appears in the Evidence Console and the consolidated
   timeline.

## Deploying to GitHub Pages

This repo is set up for a **project site**
(`https://pravin0408.github.io/pravin_devsecops/`), which is why
`vite.config.js` uses a relative `base: './'` — assets resolve correctly
under a subpath without any extra configuration.

### Option A — `gh-pages` branch (simplest)

```bash
npm install
npm run build
npm run deploy      # pushes ./dist to the gh-pages branch
```

Then in **Settings → Pages**, set the source to the `gh-pages` branch, `/ (root)`.
That's the page you already had open:
`https://github.com/pravin0408/pravin_devsecops/settings/pages`.

### Option B — GitHub Actions

Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in **Settings → Pages**, set the source to **GitHub Actions**.

## Notes

- Routing uses `HashRouter` (URLs like `/#/evidence`) specifically because
  GitHub Pages has no server-side rewrite rules — a `BrowserRouter` route
  would 404 on refresh or direct link.
- The 3D scene is intentionally lightweight (wireframe icosahedron +
  a handful of `Sparkles` + three `Html` markers) so it stays smooth on
  mid-range mobile GPUs.
