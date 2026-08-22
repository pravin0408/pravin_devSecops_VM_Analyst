# Pravin Pradeep Patil — DevSecOps & VM Analyst Portfolio
## Project Documentation

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Project** | DevSecOps Portfolio Website |
| **Author** | Pravin Pradeep Patil |
| **Tech Stack** | React 18, Vite 5, Tailwind CSS 3.4, Three.js, React Router v6 |
| **Hosting** | GitHub Pages (via GitHub Actions CI/CD) |
| **Repository** | https://github.com/pravin0408/pravin_devSecops_VM_Analyst |
| **Live URL** | https://pravin0408.github.io/pravin_devSecops_VM_Analyst/ |

---

## 2. Architecture

```
┌──────────────────────────────────────────────────┐
│                   index.html                     │
│         (Security Headers + CSP Meta)            │
├──────────────────────────────────────────────────┤
│                    App.jsx                       │
│              (HashRouter + Routes)               │
├──────────┬───────────────────────┬───────────────┤
│  Navbar  │      Page Routes      │  Pratibhu Bot │
│ (Global) │                       │   (Global)    │
├──────────┴───────────────────────┴───────────────┤
│                                                  │
│  /              Home.jsx                         │
│  /learn         Learn.jsx                        │
│  /learn/sast    SAST.jsx                         │
│  /learn/dast    DAST.jsx                         │
│  /learn/pentest Pentesting.jsx                   │
│  /security      SecurityAnalysis.jsx             │
│  /evidence      EvidenceDashboard.jsx            │
│  /automation    TerminalShowcase.jsx             │
│  /contact       Contact.jsx                      │
│                                                  │
├──────────────────────────────────────────────────┤
│              Shared Components                   │
│  Scene3D · ThreatDashboard · CertGrid            │
│  CertModal · Timeline · SecurityChatbot          │
└──────────────────────────────────────────────────┘
```

---

## 3. What Was Built (Feature List)

### 3.1 Home Page
- **3D Globe** — Interactive Three.js icosahedron with arc connections and clickable nodes built with `@react-three/fiber` and `@react-three/drei`.
- **Statistics Strip** — Animated metrics (Certifications, Pipelines Hardened, CI/CD Gates, MTTR).
- **Threat Intelligence Dashboard** — Real-time CVE feed from NVD API filtered to 2026, threat metrics, active campaigns.
- **CIS Benchmark Framework** — Educational cards for Ubuntu, Windows Server, Docker, and Kubernetes benchmarks.
- **About Section** — Skills overview with hover-interactive links.
- **Education Cards** — Quick access to SAST, DAST, and Pentesting learning pages.
- **Mouse-tracking Hover Effects** — CSS spotlight that follows cursor position.

### 3.2 Learning Hub (`/learn`)
Landing page linking to three in-depth educational pages:

#### SAST Page (`/learn/sast`)
- What is SAST, how it works (4-step process)
- Popular tools (Semgrep, Checkmarx, SonarQube, Bandit)
- Common vulnerabilities detected (8 items with OWASP tags)
- CI/CD integration examples (GitLab CI YAML)
- Best practices (DOs and DON'Ts)
- External resources and links

#### DAST Page (`/learn/dast`)
- What is DAST, how it works (4-step process)
- Popular tools (OWASP ZAP, Burp Suite, InsightAppSec, Acunetix)
- Common vulnerabilities detected (8 items)
- DAST vs SAST comparison table
- Shell script example for ZAP automation
- Best practices and resources

#### Pentesting Page (`/learn/pentesting`)
- 5 phases of penetration testing with tools for each
- Types of pentests (Black Box, White Box, Gray Box, Red Team)
- 8 essential tools with categories
- Common attack vectors (6 items)
- Full OWASP Top 10 (2021) listing
- Legal and ethical considerations (warning section)
- Learning resources (HackTheBox, TryHackMe, PortSwigger, OSCP)

### 3.3 Security Analysis Page (`/security`)
Live security assessment of the portfolio website itself:

- **13 vulnerabilities** identified across SAST, DAST, and Pentesting
- **100% remediation rate** — all findings fixed
- Interactive expandable findings with CWE references
- Each finding shows: description, impact, remediation, and fix applied
- Testing methodology documentation

### 3.4 Evidence Dashboard (`/evidence`)
- Fetches `data.json` at runtime for certifications
- Certification grid with modal viewer
- Consolidated timeline (chronological events)

### 3.5 Automation Console (`/automation`)
- CI/CD pipeline scripts (GitLab CI YAML, Python, Bash)
- OWASP Top 10 before/after code comparisons
- Tab-based viewer with syntax highlighting

### 3.6 Contact Page (`/contact`)
- Email form integrated with Formspree (delivers to `pravinpatil3096@gmail.com`)
- Fields: Name, Email, Subject, Message
- Success/error feedback to user
- Direct email, LinkedIn, and GitHub links
- Response time indicator
- Topic cards showing areas of expertise

### 3.7 Pratibhu — AI Security Chatbot
- Floating 🛡️ button on every page (bottom-right corner)
- Opens a chat window on click
- Comprehensive knowledge base covering 8 security domains
- Keyword-based topic matching engine
- Suggested quick-start questions
- Auto-scrolling conversation
- Graceful fallback with topic list when no match found

**Pratibhu Knowledge Base:**

| Domain | Keywords | Coverage |
|---|---|---|
| SAST | sast, static, code analysis | Tools, CI/CD, best practices |
| DAST | dast, dynamic, runtime | Tools, workflow, comparison |
| Pentesting | pentesting, penetration, exploit | 5 phases, tools, legal |
| Tenable | tenable, nessus, plugin, scan | Capabilities, plugins, workflow |
| DevSecOps | devsecops, pipeline, ci/cd | 5 pipeline stages, tools |
| OWASP Top 10 | owasp, top 10, a01-a10 | All 10 risks with prevention |
| LLM Security | llm, ai, gpt, prompt injection | Prompt injection, jailbreak, best practices |
| Infrastructure | infrastructure, cloud, hardening | CIS benchmarks, common findings |

---

## 4. Security Hardening Applied

### 4.1 HTTP Security Headers (index.html)

| Header | Value | Purpose |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; ...` | Prevents XSS, injection |
| X-Content-Type-Options | `nosniff` | Prevents MIME sniffing |
| X-Frame-Options | `DENY` | Prevents clickjacking |
| Referrer-Policy | `strict-origin-when-cross-origin` | Limits referrer leakage |
| Permissions-Policy | `geolocation=(), microphone=(), camera=()` | Disables unused APIs |

### 4.2 SAST Fixes (4 findings)

| ID | Finding | Severity | Fix |
|---|---|---|---|
| SAST-001 | Missing CSP | HIGH | Added strict CSP meta tag |
| SAST-002 | API response not validated | MEDIUM | Added try-catch + validation |
| SAST-003 | Missing `rel="noopener noreferrer"` | MEDIUM | Added to all external links |
| SAST-004 | Missing security headers | HIGH | Added all headers in HTML |

### 4.3 DAST Fixes (4 findings)

| ID | Finding | Severity | Fix |
|---|---|---|---|
| DAST-001 | Reflected XSS risk | HIGH | React output encoding (safe by default) |
| DAST-002 | Missing CSRF tokens | MEDIUM | All links are read-only navigation |
| DAST-003 | DOM XSS in mouse hook | HIGH | Refactored to safe CSS custom properties |
| DAST-004 | Insecure HTTP URLs | LOW | All URLs enforced to HTTPS |

### 4.4 Pentesting Fixes (5 findings)

| ID | Finding | Severity | Fix |
|---|---|---|---|
| PTEST-001 | Open redirect | MEDIUM | Hardcoded and whitelisted URLs |
| PTEST-002 | Error information disclosure | LOW | Generic error messages only |
| PTEST-003 | Missing SRI | MEDIUM | Added integrity attributes to CDN |
| PTEST-004 | Clickjacking | MEDIUM | X-Frame-Options: DENY |
| PTEST-005 | Unvalidated redirects | MEDIUM | Whitelist-based navigation |

---

## 5. Design System

### 5.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `void` | `#05080c` | Page background |
| `void-panel` | `#0a121c` | Card/panel backgrounds |
| `void-raised` | `#0e1a28` | Elevated elements |
| `void-line` | `#16293a` | Borders and dividers |
| `signal-cyan` | `#2fe0ff` | Primary accent, links |
| `signal-green` | `#39ff9d` | Success, online status |
| `signal-amber` | `#ffb020` | Warning, caution |
| `signal-red` | `#ff3b5c` | Error, critical severity |
| `signal-dim` | `#5c7c8c` | Muted text |

### 5.2 Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headings | Rajdhani | 500, 600, 700 |
| Body / Code | JetBrains Mono | 400, 500, 600 |

### 5.3 Utility Classes

| Class | Purpose |
|---|---|
| `.eyebrow` | Section label (11px, uppercase, cyan) |
| `.panel` | Card with border, backdrop blur |
| `.btn-console` | Styled button with glow on hover |
| `.hover-glow` | Lift + glow border on hover |
| `.hover-spotlight` | Radial gradient follows mouse cursor |
| `.card-shine` | Sweep shine animation on hover |
| `.severity-*` | Color-coded severity badges |

### 5.4 Animations

| Name | Effect |
|---|---|
| `blink` | Pulsing opacity (status indicators) |
| `scanline` | Vertical sweep (CRT effect) |
| `flicker` | Subtle opacity stutter |
| `border-glow` | Pulsing border brightness on hover |

---

## 6. Deployment

### 6.1 GitHub Actions Workflow (`.github/workflows/deploy.yml`)

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

### 6.2 Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build to ./dist
npm run preview      # Preview production build
```

---

## 7. File Structure

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # Router + global layout
├── index.css                   # Tailwind + custom CSS + hover effects
├── hooks/
│   └── useMouseSpotlight.js    # Mouse-tracking spotlight hook
├── components/
│   ├── Navbar.jsx              # Fixed navigation bar
│   ├── Scene3D.jsx             # Three.js globe with interactive nodes
│   ├── ThreatDashboard.jsx     # Live CVE feed + CIS benchmarks
│   ├── SecurityChatbot.jsx     # Pratibhu chatbot (floating widget)
│   ├── EvidenceDashboard.jsx   # Certifications + timeline viewer
│   ├── CertGrid.jsx            # Certification card grid
│   ├── CertModal.jsx           # Certificate detail modal
│   ├── Timeline.jsx            # Chronological event timeline
│   ├── TerminalShowcase.jsx    # CI/CD scripts + OWASP comparisons
│   ├── CyberEnvironment.jsx    # 3D environment (grid, particles)
│   └── ImmersiveScene.jsx      # Full immersive 3D scene (unused)
└── pages/
    ├── Home.jsx                # Landing page
    ├── Learn.jsx               # Learning hub
    ├── SAST.jsx                # SAST education
    ├── DAST.jsx                # DAST education
    ├── Pentesting.jsx          # Pentesting education
    ├── SecurityAnalysis.jsx    # Security assessment report
    └── Contact.jsx             # Contact form page
```

---

## 8. Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | DOM rendering |
| react-router-dom | ^6.26.2 | Client-side routing |
| @react-three/fiber | ^8.17.10 | React renderer for Three.js |
| @react-three/drei | ^9.114.3 | Three.js helpers and components |
| three | ^0.169.0 | 3D graphics library |

### Development

| Package | Version | Purpose |
|---|---|---|
| vite | ^5.4.8 | Build tool and dev server |
| @vitejs/plugin-react | ^4.3.2 | React plugin for Vite |
| tailwindcss | ^3.4.13 | Utility-first CSS framework |
| postcss | ^8.4.47 | CSS processing |
| autoprefixer | ^10.4.20 | CSS vendor prefixing |
| gh-pages | ^6.1.1 | GitHub Pages deployment |

---

## 9. External Services

| Service | Purpose | Configuration |
|---|---|---|
| **Formspree** | Contact form email delivery | Sends to `pravinpatil3096@gmail.com` |
| **NVD API 2.0** | Live CVE vulnerability feed | Filtered for 2026, HIGH/CRITICAL severity |
| **Google Fonts** | Typography (Rajdhani, JetBrains Mono) | Loaded with SRI integrity |
| **GitHub Pages** | Static site hosting | Deployed via GitHub Actions |

---

## 10. How the Chatbot (Pratibhu) Works

### Architecture

```
User Input → Keyword Matching → Knowledge Base Lookup → Response
     ↓               ↓                    ↓
  "What is      Matches topic       Returns detailed
   SAST?"       via keywords         response text
```

### Flow

1. User clicks the 🛡️ floating button (bottom-right corner)
2. Chat window opens with welcome message
3. User types a question or clicks a suggested question
4. Input text is converted to lowercase
5. Each topic's keyword array is checked for matches
6. If a match is found, the topic's response is returned
7. If no match, a fallback message lists available topics
8. Messages are displayed in a scrollable chat window

### Knowledge Base Structure

```javascript
const securityKnowledgeBase = {
  topicName: {
    keywords: ['keyword1', 'keyword2', ...],
    response: 'Detailed multi-line response text...'
  },
  // ... 8 total topics
}
```

---

## 11. How the Contact Form Works

### Flow

```
User fills form → Submit → Formspree API → Email to pravinpatil3096@gmail.com
                     ↓
              Success/Error feedback shown to user
```

### Integration

- **Service:** Formspree.io (free tier, no backend required)
- **Method:** POST request with JSON body
- **Fields sent:** name, email, subject, message
- **Email subject:** "New Portfolio Contact: [user subject]"
- **Error handling:** Try-catch with user-visible feedback

---

## 12. How the Threat Intelligence Works

### CVE Feed

```
Page Load → Fetch NVD API → Filter 2026 + HIGH/CRITICAL → Sort by Severity → Display
                  ↓
          On error: Show fallback CVE data
```

- **API:** `https://services.nvd.nist.gov/rest/json/cves/2.0`
- **Filter:** `pubStartDate=2026-01-01` to `pubEndDate=2026-12-31`
- **Sort:** CRITICAL first, then HIGH, then by CVSS score descending
- **Display:** Top 8 results with linked CVE IDs

---

## 13. Git Commit History

| Commit | Description |
|---|---|
| `0f226a3` | Initial immersive 3D experience |
| `6bf6aee` | Redesign with simple modern UI + SAST/DAST/Pentesting pages |
| `4403380` | Advanced hover effects + Threat Intelligence dashboard |
| `f1a54d0` | Update CVEs to 2026, Tenable findings, CIS benchmarks |
| `c1e40c5` | Infrastructure vulnerabilities with impact and remediation |
| `ccb63c7` | Security analysis: SAST/DAST/Pentesting findings and fixes |
| `c38d800` | Remove infrastructure assets, focus on CVE and CIS info |
| `4b9511f` | Contact page + Pratibhu AI chatbot |
| `d06d299` | Fix chatbot visibility with floating toggle button |
| Current | Rename chatbot to Pratibhu + project documentation |

---

*Document generated: August 2026*
*Author: Pravin Pradeep Patil*
