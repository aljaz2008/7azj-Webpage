# S57AZJ Personal Website

A production-ready personal website for amateur radio operator **S57AZJ (Aljaž Žugič Jehart)** built with a modern Next.js + TypeScript stack.

## Stack

- Next.js 14 + React + TypeScript
- TailwindCSS
- Framer Motion
- Three.js + React Three Fiber + Three Globe
- MDX article system for project popups

## Features

- One-page vertical section flow with `scroll-snap-type: y mandatory`
- Floating top navigation with smooth scrolling
- Animated hero typography and details
- Mouse-reactive constellation particle background
- Interactive 3D QSO globe with arcs and station points
- Project grid with modal popup articles sourced from MDX files
- Minimal black/white technical design system

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    Globe.tsx
    Hero.tsx
    Navbar.tsx
    ParticleBackground.tsx
    ProjectModal.tsx
    ProjectsGrid.tsx
    Section.tsx
  content/
    projects/
      antenna-switch.mdx
  lib/
    projects.ts
public/
  images/
```

## Run Locally

```bash
git clone <your-repository-url>
cd s57azj-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm run start
```

## Initialize Git and Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/s57azj-site.git
git push -u origin main
```
