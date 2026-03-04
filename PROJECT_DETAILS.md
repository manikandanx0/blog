# Blog Project - Complete Architecture & Details

**Project Name:** blog  
**Version:** 0.1.0  
**Type:** Next.js Static Blog  
**Date:** March 4, 2026

---

## 1. PROJECT OVERVIEW

A personal blog built with **Next.js 16.1.6** using a static site generation (SSG) approach. The blog serves as an archive for thoughts, systems, and obsessions, with content stored as Markdown files. The site is fully static (no database or backend), making it lightweight, fast, and perfect for hosting on platforms like GitHub Pages.

**Mission:** "Thoughts. Systems. Obsessions." - A personal archive for writing and content curation.

---

## 2. TECHNOLOGY STACK

### Core Framework
- **Next.js** (16.1.6): React-based framework with App Router
- **React** (19.2.3): UI library
- **React-DOM** (19.2.3): DOM rendering

### Content Processing
- **gray-matter** (4.0.3): Parse YAML frontmatter from Markdown files
- **remark** (15.0.1): Markdown processor
- **remark-html** (16.0.1): Converts Markdown to HTML

### Styling
- **Tailwind CSS** (4): Utility-first CSS framework via `@tailwindcss/postcss`
- **PostCSS** (4): CSS transformation tool

### Development & Linting
- **ESLint** (9): Code quality and style enforcement
- **eslint-config-next** (16.1.6): Next.js-specific ESLint rules

### Fonts (Google Fonts)
- **Playfair Display**: Display font (headings) - weights 400, 600, 700
- **Source Serif 4**: Body text font - weights 400, 500
- **Noto Serif JP**: Japanese typography support
- **Google Sans Code**: Monospace font for code

### Package Manager
- **pnpm**: Fast, disk space efficient package manager

---

## 3. PROJECT STRUCTURE

```
blog/
├── src/
│   ├── app/
│   │   ├── layout.js                 # Root layout component with font setup
│   │   ├── page.js                   # Home page listing all posts
│   │   ├── globals.css               # Global styles and CSS variables
│   │   └── [...slug]/
│   │       └── page.js               # Dynamic route for individual posts
│   └── lib/
│       └── posts.js                  # Utility functions for reading and parsing posts
├── archive/                          # Content directory
│   ├── posts/
│   │   └── first-post.md            # Blog post example
│   └── poems/
│       └── the-sun-shines.md        # Poem example
├── public/
│   └── images/
│       └── posts/
│           └── first-post/          # Static assets for posts
├── Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── next.config.mjs              # Next.js configuration
│   ├── jsconfig.json                # JavaScript compiler options
│   ├── postcss.config.mjs           # PostCSS configuration
│   ├── eslint.config.mjs            # ESLint rules
│   ├── tailwind.config.mjs          # Tailwind config (auto-generated)
│   └── tsconfig.json                # TypeScript config (optional)
└── README.md                         # Standard Next.js README
```

---

## 4. KEY COMPONENTS & ARCHITECTURE

### 4.1 Root Layout (`src/app/layout.js`)

**Purpose:** Configures global layout, metadata, and imports fonts

**Features:**
- Sets page title and description
- Configures 4 custom Google fonts with CSS variables:
  - `--font-display`: Playfair Display
  - `--font-body`: Source Serif 4
  - `--font-jp`: Noto Serif JP
  - `--font-mono`: Google Sans Code
- Applies fonts globally to HTML element
- Wraps all pages with consistent styling

**Font Configuration:**
```javascript
- Playfair_Display: weights [400, 600, 700], latin subset
- Source_Serif_4: weights [400, 500], style [normal, italic]
- Noto_Serif_JP: weights [400, 500], subsets [latin, japanese]
- Google_Sans_Code: weight [400], monospace
```

### 4.2 Home Page (`src/app/page.js`)

**Purpose:** Display all posts and poems in chronological order

**Features:**
- Fetches all posts using `getAllPosts()`
- Renders posts with:
  - Title (clickable link)
  - Publication date
  - Associated tags
  - Horizontal separator
- Sorts posts by date (newest first)
- Navigation headers: "Mani's Archive" with tagline

**URL Routing:** `GET /` → Home page

### 4.3 Dynamic Post Page (`src/app/[...slug]/page.js`)

**Purpose:** Render individual posts/poems

**Features:**
- Uses catch-all route `[...slug]` for nested paths
- Supports nested directory structures (e.g., `posts/first-post`, `poems/the-sun-shines`)
- Static generation: `generateStaticParams()` pre-builds all post pages at build time
- Markdown to HTML conversion using **remark** + **remark-html**
- Displays:
  - Post title
  - Publication date
  - HTML-rendered content
- Returns 404 if post not found

**URL Examples:**
- `/posts/first-post` → post in `archive/posts/first-post.md`
- `/poems/the-sun-shines` → poem in `archive/poems/the-sun-shines.md`

### 4.4 Posts Utility (`src/lib/posts.js`)

**Purpose:** Handle all file I/O and content processing

**Key Function: `getAllPosts()`**
- Recursively scans `archive/` directory for `.md` files
- Parses YAML frontmatter using **gray-matter**
- Extracts metadata: `title`, `date`, `tags`, custom fields
- Converts file paths to URL slugs
- Returns array of post objects sorted by date (descending)

**Post Object Structure:**
```javascript
{
  slug: "posts/first-post",      // URL path
  title: "Building My Blog with Next.js",
  date: "2026-02-20",
  tags: ["nextjs", "blog", "setup"],
  content: "# Raw markdown content..."
}
```

---

## 5. CONTENT STRUCTURE

### 5.1 Markdown Format

All content uses YAML frontmatter + Markdown body:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
cover: "/images/path/to/cover.png"  # Optional
---

# Your markdown content here

- Supports **bold**, *italic*, `code`
- Headings, lists, blockquotes, etc.
```

### 5.2 Directory Organization

**`archive/posts/`** - Blog posts  
**`archive/poems/`** - Poems or literary content  
**Flexible:** Any subdirectory structure works; URL slugs follow the path structure

### 5.3 Examples

**File:** `archive/posts/first-post.md`
- **URL:** `/posts/first-post`
- **Frontmatter:** title, date, tags, cover image path

**File:** `archive/poems/the-sun-shines.md`
- **URL:** `/poems/the-sun-shines`
- **Frontmatter:** title, date, tags

---

## 6. STYLING & DESIGN

### 6.1 CSS Architecture (`src/app/globals.css`)

**Approach:** Custom CSS with CSS variables (no Tailwind classes in HTML)

**CSS Variables (Dark Mode):**
```css
--bg-main: #0e0e12          /* Main background */
--bg-secondary: #16161d     /* Secondary background */
--bg-soft: #1c1c24          /* Softer background */
--text-primary: #f2f2f5     /* Main text */
--text-muted: #9ca3af       /* Muted text (dates, tags) */
--divider: #24242c          /* Horizontal rule color */
--accent: #7c3aed           /* Accent (purple) */
--accent-soft: #a78bfa      /* Soft accent (light purple) */
```

**Layout:**
- `.container`: Max-width 720px (optimal reading width)
  - Left margin: responsive `clamp(24px, 10vw, 160px)`
  - Padding-top: 120px
  - Padding-bottom: 100px
- `.section`: margin-top 96px for spacing
- `hr`: 1px divider with `--divider` color

**Typography:**
- **Body:** 18px, line-height 1.75
  - Font: Source Serif 4 (or JP fallback)
  - Color: `--text-primary`
- **Headings:** Playfair Display, custom sizes
  - `h1`: 64px, weight 700
  - `h2`: 40px, weight 600
  - `h3`: 32px, weight 600
- **Links:** Purple accent with hover effects
- **Meta text:** Muted gray color, smaller size

**Dark Mode:** Everything optimized for dark backgrounds

---

## 7. CONFIGURATION FILES

### 7.1 `next.config.mjs`

```javascript
export: "export"              // Static HTML export
images: unoptimized: true    // Disable Next.js image optimization
```

**Impact:** Generates fully static HTML at build time suitable for static hosting

### 7.2 `jsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Impact:** Path alias `@/` points to `src/` for cleaner imports

**Usage:** `import { getAllPosts } from "@/lib/posts"`

### 7.3 `postcss.config.mjs`

```javascript
{
  plugins: {
    "@tailwindcss/postcss": {}
  }
}
```

**Impact:** Integrates Tailwind CSS 4 with PostCSS

### 7.4 `eslint.config.mjs`

- Uses Next.js core web vitals rules
- Ignores build artifacts: `.next/`, `out/`, `build/`
- Enforces code quality and React best practices

---

## 8. DEPLOYMENT & BUILD

### 8.1 Build Configuration

**Static Export:** The site is exported as fully static HTML
- No Node.js server required
- Can be deployed to: GitHub Pages, Netlify, Vercel static hosting, etc.
- Build output: `out/` directory (default)

### 8.2 Next.js Features Used

- **App Router:** Modern file-based routing (`src/app/`)
- **Static Generation (SSG):** `generateStaticParams()` pre-builds all routes
- **CSS Modules & Global CSS:** Custom styling approach
- **Font Optimization:** Google Fonts with CSS variables

---

## 9. NPM SCRIPTS

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start development server (localhost:3000) |
| `build` | `next build` | Build for production static export |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint code quality checks |

---

## 10. CONTENT PIPELINE

### How Content Flows

1. **Write:** Create `.md` file in `archive/` with YAML frontmatter
2. **Parse:** `getAllPosts()` reads files and extracts metadata
3. **Generate:** `generateStaticParams()` creates static routes
4. **Render:** 
   - On homepage: List all posts
   - On post page: Convert Markdown → HTML using remark→html
5. **Deploy:** Export static HTML and deploy

---

## 11. FEATURE HIGHLIGHTS

| Feature | Implementation |
|---------|-----------------|
| **Full Text Search** | Not implemented (file-based) |
| **Comments** | Not implemented (static site) |
| **Database** | No database (file-based) |
| **Authentication** | No auth needed (personal blog) |
| **RSS Feed** | Not implemented |
| **Markdown Support** | ✅ Full remark + remark-html |
| **Code Highlighting** | Minimal (uses HTML rendering) |
| **Image Support** | ✅ Static public/images folder |
| **Nested Routes** | ✅ Catch-all [...slug] routing |
| **Tag Support** | ✅ Frontend only (no filtering) |
| **Responsive Design** | ✅ Fluid clamp() for layout |

---

## 12. PERFORMANCE CHARACTERISTICS

- **No Database:** Lightning fast (file I/O only)
- **Static Export:** Serves pre-built HTML (ideal for CDN)
- **No JavaScript Runtime:** Minimal client-side JS needed
- **Font Optimization:** Google Fonts with CSS variables
- **Image Unoptimized:** Direct static file serving
- **Build Time:** ~seconds (number of posts dependent)

---

## 13. BROWSER SUPPORT

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid & Flexbox support required
- JavaScript enabled (minimal required)

---

## 14. POTENTIAL ENHANCEMENTS

- [ ] RSS feed generation
- [ ] Sitemap generation
- [ ] Search functionality (client-side)
- [ ] Code syntax highlighting (Prism.js / highlight.js)
- [ ] Table of contents for posts
- [ ] Related posts suggestions
- [ ] Dark/light theme toggle
- [ ] Social sharing buttons
- [ ] Comments via third-party (Giscus, Utterances)

---

## 15. DIRECTORY REFERENCE

```
/workspaces/blog/
├── eslint.config.mjs          → ESLint configuration
├── jsconfig.json              → JS compiler options & path aliases
├── next.config.mjs            → Next.js config (static export)
├── package.json               → Dependencies & scripts
├── pnpm-lock.yaml             → Dependency lock file
├── postcss.config.mjs         → PostCSS configuration
├── README.md                  → Default Next.js README
├── tree.txt                   → Directory listing
├── archive/
│   ├── poems/
│   │   └── the-sun-shines.md
│   └── posts/
│       └── first-post.md
├── public/
│   └── images/
│       └── posts/
│           └── first-post/    → Images referenced in posts
├── src/
│   ├── app/
│   │   ├── layout.js          → Root layout with fonts
│   │   ├── page.js            → Home page / posts listing
│   │   ├── globals.css        → Global styles & dark theme
│   │   └── [...slug]/
│   │       └── page.js        → Dynamic post page
│   └── lib/
│       └── posts.js           → Post parsing & retrieval utility
└── PROJECT_DETAILS.md         → This file
```

---

## 16. METADATA SUMMARY

| Aspect | Details |
|--------|---------|
| **Framework** | Next.js 16.1.6 (App Router, SSG) |
| **Rendering** | Static HTML export |
| **Hosting** | GitHub Pages, Netlify, Vercel, etc. |
| **Content** | Markdown files with YAML frontmatter |
| **Styling** | Custom CSS + Tailwind CSS 4 |
| **Database** | None (file-based) |
| **Authentication** | None |
| **Performance** | Excellent (fully static) |
| **Maintainability** | High (simple, file-based structure) |

---

**Last Updated:** March 4, 2026  
**Project Status:** Active Development
