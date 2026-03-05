---
title: "Mastering CSS Grid Layout"
date: "2026-03-02"
tags: ["css", "layout", "design", "grid"]
---

CSS Grid is a powerful layout tool that allows you to create two-dimensional layouts with rows and columns.

## Basic Grid Setup

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
```

## Common Grid Patterns

### Full-width header and footer

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.header {
  grid-column: 1 / -1;
}

.sidebar {
  grid-column: 1 / 3;
}

.content {
  grid-column: 3 / 11;
}

.footer {
  grid-column: 1 / -1;
}
```

## Auto-fit and Auto-fill

These keywords help create responsive grids automatically:

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

Grid is essential for modern web design. Combine it with Flexbox for maximum layout flexibility!
