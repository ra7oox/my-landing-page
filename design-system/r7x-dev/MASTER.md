# Design System Master File (R7x Dev - Cyberpunk Theme)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** R7x Dev
**Category:** Developer Portfolio / Cyberpunk Neon HUD
**Aesthetic:** High-tech, glowing neon borders, glassmorphic HUD overlays, premium typography, custom mouse trail.

---

## Global Rules

### Color Palette

| Role | Hex | Tailwind Class / CSS Variable | Description |
|------|-----|------------------------------|-------------|
| Background (Dark) | `#070a12` | `bg-navy-900` / `--bg` | Deep Space Navy |
| Neutral Accent (Dark) | `#0b0f19` | `bg-navy-800` / `--bg2` | Card/Container backgrounds |
| Glow Cyan | `#00f2ff` | `text-cyan-glow` | Neon Cyan Accent |
| Glow Amber | `#ffaa00` | `text-amber-glow` | Accent Amber / Warning Gold |
| Glow Violet | `#a855f7` | `text-violet-glow` | Accent Violet / Purple |
| Text Primary | `#ffffff` | `text-white` | Solid White |
| Text Muted | `rgba(255,255,255,0.55)` | `text-muted` | Muted Gray-Slate |

**Theme Overrides (Light Mode):**
*   `--color-navy-900` shifts to `#f8fafc` (Slate 50)
*   `--color-navy-800` shifts to `#f1f5f9` (Slate 100)
*   `--color-cyan-glow` shifts to `#0284c7` (Sky Blue 600)
*   `--color-amber-glow` shifts to `#d97706` (Amber Bronze 600)
*   `--color-violet-glow` shifts to `#7c3aed` (Purple 600)

### Typography

- **Heading/Display Font:** Syne & Space Grotesk (Uppercase, wide tracking)
- **Body Font:** Inter (Highly readable)
- **Mood:** Futuristic, Minimalist, Elegant, High-Tech
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
```

### Key Effects & Shadows

*   **Cyan Neon Glow:** `0 0 20px rgba(0, 242, 255, 0.3), inset 0 0 10px rgba(0, 242, 255, 0.1)`
*   **Amber Neon Glow:** `0 0 20px rgba(255, 170, 0, 0.3), inset 0 0 10px rgba(255, 170, 0, 0.1)`
*   **Glassmorphic Cards:** Translucent dark backgrounds with neon borders and subtle backdrop filters.
*   **Mouse Trail:** Lagging cyan sparks cursor trail (`CustomCursor.jsx`).

---

## Component Specs

### Buttons (Cyber HUD Variant)

Primary buttons utilize corner brackets, shimmer effects, and glow shadows.
*   **Corner Brackets:** Absolute positioned tiny border corners in cyan.
*   **Shimmer Effect:** Subtle skew-translated transparent white gradient sliding left-to-right on hover.
*   **Transitions:** `transition-all duration-300` for smooth scale and shadow shifts.

### Cards

*   **Visual Style:** Translucent dark card, glowing borders.
*   **Hover effect:**
    ```css
    .card {
      transition: all 300ms ease;
      cursor: none; /* Uses CustomCursor */
    }
    .card:hover {
      box-shadow: 0 0 35px rgba(0, 242, 255, 0.25);
      transform: translateY(-2px);
    }
    ```

---

## Anti-Patterns to Avoid (Pro UX Max)

*   ❌ **Flat designs** without depth, gradients, or ambient glows.
*   ❌ **Text-heavy screens** — Keep layouts visual, utilize grids/bento shapes.
*   ❌ **Using emojis as UI control icons** — Always use custom SVGs.
*   ❌ **Missing interactive hover feedback** — Always scale/glow elements slightly or adjust custom cursor size.
*   ❌ **Layout-shifting hovers** — All hover transitions must use transform, color, or opacity properties (never shift margin/width/height).
*   ❌ **No audio indicators** — Keep audio states clear (with waves or mute indicators).

---

## Pre-Delivery Checklist

- [x] No emojis used as UI icons (strictly SVG)
- [x] Responsive layout validated (375px, 768px, 1024px, 1440px)
- [x] Custom cursor hover feedback works on all link/button selectors
- [x] Light & Dark mode contrast ratios conform to WCAG (4.5:1 minimum)
- [x] Floating elements spaced properly from edges
- [x] Content is not hidden behind fixed navbars (64px offset respected)
- [x] No horizontal scroll on mobile viewports
