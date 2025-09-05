# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NetlifyDrop is a static site hosting repository designed for rapid HTML deployment via Netlify's continuous deployment. The project serves as a content showcase and experimentation platform, featuring a modular CSS architecture optimized for terminal aesthetics and modern web components.

## Repository Structure

```
├── index.html           # Main landing page (Katana one-pager)
├── canvas/              # HTML experiments and sample pages
│   ├── animation.html   # CSS/JS animation demos
│   ├── particles.html   # Particle system experiments
│   └── *.html          # Additional HTML experiments
├── assets/
│   ├── css/
│   │   ├── core/       # Base styles (variables, reset, typography)
│   │   ├── components/ # Reusable UI components
│   │   └── layouts/    # Page layout styles
│   ├── images/         # Static image assets
│   └── js/             # JavaScript files (currently empty)
├── netlify.toml        # Netlify deployment configuration
└── .github/workflows/  # GitHub Actions for security scanning
```

## CSS Architecture

The project uses a modular CSS architecture with clear separation of concerns:

### Core Styles (`assets/css/core/`)
- **variables.css**: Design tokens including terminal dark theme colors, typography stack (JetBrains Mono priority), and 8px grid spacing system
- **reset.css**: CSS normalization and base styles
- **typography.css**: Font definitions and text styling

### Component Styles (`assets/css/components/`)
- **terminal.css**: Terminal-style UI components
- **code.css**: Code block styling with syntax highlighting
- **navigation.css**: Navigation bars and breadcrumbs
- **buttons.css**: CTA buttons with various states

### Layout Styles (`assets/css/layouts/`)
- **landing.css**: Landing page specific layouts
- **blog-post.css**: Article/post layout patterns
- **sidebar.css**: Sidebar navigation and content

### Import Structure
All styles are imported through `main.css` which serves as the single entry point for the CSS architecture.

## Deployment Workflow

### Netlify Configuration
- **Build Command**: None (static files)
- **Publish Directory**: Root (`.`)
- **Security Headers**: Comprehensive CSP, XSS protection, frame options
- **Redirects**: `/canvas` → `/canvas/index.html`

### Security Features
- **GitHub Actions**: Weekly security scans via `.github/workflows/security.yml`
- **HTML Validation**: Automated HTML5 and CSS validation
- **Secret Scanning**: TruffleHog integration for exposed credentials
- **Security Headers**: Content Security Policy and protection headers in netlify.toml

### Continuous Deployment
1. Push HTML files to `canvas/` directory
2. GitHub triggers Netlify build
3. Automatic deployment to https://shelburne.netlify.app
4. Security scans run on push/PR to main branches

## Development Commands

### Local Development
```bash
# Serve locally (any HTTP server)
python -m http.server 8000
# or
npx serve .
```

### File Operations
```bash
# Add new HTML experiment
cp template.html canvas/new-experiment.html

# Check security headers
grep -E "(X-Frame-Options|CSP|X-XSS)" netlify.toml

# Validate HTML
npx html-validate index.html canvas/*.html
```

### Git Workflow
```bash
# Standard workflow
git add canvas/new-file.html
git commit -S -m "Add new HTML experiment"
git push origin main  # Triggers Netlify deployment
```

## Content Guidelines

### HTML Files
- Place experimental HTML in `canvas/` directory
- Use semantic HTML5 elements
- Include proper meta tags for viewport and charset
- Follow the established terminal aesthetic theme

### CSS Modifications
- Edit existing CSS files rather than creating new ones
- Follow the modular architecture (core/components/layouts)
- Use CSS custom properties defined in `variables.css`
- Maintain the terminal dark theme consistency

### Security Considerations
- All commits must be signed (`-S` flag)
- No sensitive data in HTML/CSS files
- Follow CSP guidelines defined in netlify.toml
- Security scans run automatically on all changes

## Theme and Design System

### Color Palette (Terminal Dark)
- Background: `#0d1117` (primary), `#161b22` (secondary)
- Text: `#c9d1d9` (primary)
- Accent: `#58a6ff` (links, highlights)
- Status: `#3fb950` (success), `#d29922` (warning), `#f85149` (error)

### Typography
- Primary: JetBrains Mono, Fira Code, Cascadia Code (monospace stack)
- Base size: 14px
- Line height: 1.6
- Optimized for terminal/code aesthetics

### Spacing System
Based on 8px grid: `--space-xs` (8px), `--space-sm` (16px), `--space-md` (24px), `--space-lg` (32px)