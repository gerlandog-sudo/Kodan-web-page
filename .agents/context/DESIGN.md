# Kodan Software · Design System

## Color Strategy: Restrained (Neon Dark)
The interface uses a deep dark background with high-impact technical accents.

### Palette (OKLCH Approximations)
- **Background (Global)**: `oklch(15.2% 0 0)` (#050505) - Deep Obsidian.
- **Primary Accent (Mint)**: `oklch(88.5% 0.18 166)` (#00FFC2) - Digital Mint.
- **Pulse Blue**: `oklch(53% 0.25 272)` (#635BFF).
- **Thermal Violet**: `oklch(45% 0.31 301)` (#8A00FF).
- **Text (Header)**: `oklch(96% 0.005 166)` (#F2F2F2).
- **Text (Body)**: `oklch(70% 0.005 166)` (#A0A0A0).

## Typography
- **Display**: Aptos Display / Inter. High contrast, clean geometric forms.
- **Technical/Data**: JetBrains Mono. Used for "Scroll to start" and technical indicators.
- **Scale**: Minimum 1.25 ratio between hierarchy steps.

## Layout & Rhythm
- **Density**: Variable. High-density technical sections (Timeline) contrasted with expansive atmospheric sections (Hero/3D).
- **Glassmorphism**: Used sparingly for premium surfaces (Cards, Modals). `blur(20px)`.

## Motion Principles
- **Scrub-Sync**: Scroll-driven animations are strictly linear or with minimal easing to maintain direct tactile feedback.
- **Atmospheric Entrance**: Use of exponential ease-out for non-scroll transitions.

## Banned Patterns
- Generic SaaS gradients.
- Plain #000 or #FFF (all neutrals are slightly tinted).
- Emoji-based iconography.
