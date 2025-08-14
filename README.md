# SvelteKit Blog

A simple blog built with SvelteKit and MDsveX

## Features

- 📝 Markdown-based blog posts with frontmatter
- 🎨 Syntax highlighting with Prism.js themes
- 🌙 Dark/light mode support
- 📱 Mobile-responsive design
- ⚡ Static site generation

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the development server:

   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

## Adding Content

Create markdown files in `src/content/pages/blog/` with frontmatter:

```markdown
---
title: 'Your Post Title'
date: '2024-01-01'
author: 'Your Name'
description: 'Post description'
tags: ['tag1', 'tag2']
featured: true
---

# Your content here
```

## Tech Stack

- SvelteKit
- MDsveX
- Tailwind CSS
- Prism.js (syntax highlighting)
