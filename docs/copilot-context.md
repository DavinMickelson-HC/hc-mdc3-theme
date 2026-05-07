🚀 Hennepin County Design System — Theming Architecture (Copilot Context)
This document defines the theming architecture, rules, and expectations for this Angular 22 project.
Copilot must treat this file as authoritative guidance when generating or modifying:

Palette files
Theme mapping files
Component appearance files
CSS variable tokens
Runtime theme switching logic
The word “color” must always use American spelling.

🎨 Design System Overview
This project uses:
Angular Material 3 (MDC3)
CSS custom properties for all brand tokens
A semantic MDC3 mapping layer (mdc-theme.css)
Multiple palettes (light + dark)
Runtime theme switching via <body> classes
County‑wide base palettes
Project‑level override palettes

The system supports unlimited palettes, each defined as a standalone .css file.

Required Folder Structure
src/styles/theme/
mdc-theme.css ← MDC3 semantic token mapping
index.scss ← global entry point

/palettes/ ← all brand palettes live here
bluegreen.css
bluegreen-dark.css
bluegray.css
bluegray-dark.css
blueorange.css
blueorange-dark.css
bluewarmgray.css
bluewarmgray-dark.css
blueforest.css
blueforest-dark.css
bluegold.css
bluegold-dark.css

Copilot must generate code to make it ewasy to switch color palettes:

🎨 Palette Architecture
New palette files will go inside /palettes/

Each palette file:
Defines only --hc-\* brand tokens
Contains no MDC tokens
Is wrapped in a class selector (e.g., .bluegreen, .bluegreen.dark)
Supports light and dark variants
Is fully runtime‑switchable

✔ Light palette example
css
.bluegreen {
--hc-primary: #0058a4;
--hc-secondary: #9fcc3b;
--hc-tertiary: #369ddb;
...
}

✔ Dark palette example
css
.bluegreen.dark {
--hc-primary: #4fa3e3;
--hc-secondary: #b8e46a;
--hc-tertiary: #7cc6f0;
...
}

✔ Copilot rules for palette files
Must define all required --hc-\* tokens
Must include light and dark variants
Must use American spelling (example: color - not colour)
Must not include MDC tokens
Must not include Sass or TypeScript
Must be pure CSS

🎨 MDC3 Theme Mapping Rules
mdc-theme.css is the semantic layer.

It maps:

Code
--md-sys-color-primary → var(--hc-primary)
--md-sys-color-secondary → var(--hc-secondary)
--md-sys-color-tertiary → var(--hc-tertiary)
...
✔ Copilot must never modify this file unless asked
✔ Copilot must never place brand colors directly in MDC tokens
✔ Copilot must always map MDC tokens to --hc-\* tokens
This file is palette‑agnostic and never changes.

🌓 Light/Dark Mode Rules
Theme switching is handled by toggling classes on <body>:

Code

<body class="bluegreen light">
<body class="bluegreen dark">
<body class="blueforest light">
<body class="bluegold dark">
Copilot must:
Always generate palette classes in .paletteName and .paletteName.dark format
Never use .light or .dark as standalone selectors
Never invert colors automatically
Always generate true MDC3 dark‑mode colors

🧱 Component Appearance Rules
County and project appearance files must:
Use Material 3 component‑level mixins
Apply consistent border radius, elevation, and typography
Override only appearance‑related tokens
Never define color tokens directly

Copilot must generate appearance overrides for:
Buttons
FABs
Inputs
Cards
Toolbars
Navigation components

🧩 Global Entry Point (index.scss)
This file must:
Import mdc-theme.css
Import all palette files
Apply the active palette based on <body> classes
Register CSS variables globally
Copilot must not place theme logic anywhere else.

✔️ Copilot Behavior Expectations
When generating code, Copilot must:
Use the folder structure above
Use American spelling for “color”
Generate CSS palette files, not TS/Sass
Keep mdc-theme.css semantic and palette‑agnostic
Never place theme files inside /src/app
Never mix palette tokens with MDC tokens
Always generate .paletteName and .paletteName.dark classes
Treat this file as project‑wide context
Copilot: Follow these rules unless the user explicitly overrides them.
