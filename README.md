# 🖋️ StylishStrokes

> **Digital Luxury Calligraphy Archive & Stroke Sandbox**
>
> A state-of-the-art interactive web archive bridging the gap between traditional calligraphic lineages and contemporary fluid motion physics. Built with a strict editorial aesthetic—contrasting ink-black (`#000000`) and paper-white (`#FBFBFA`) layout surfaces, accented by Gold Leaf (`#D4AF37`) and Cinnabar Red (`#E63946`) highlights.

---

## 🎨 Architectural Design Philosophy

**StylishStrokes** is designed to reflect the raw contrast and precision of ink on paper. Its visual design focuses on:
*   **High-Contrast Grid Layouts:** Emulating the structure of traditional calligraphic guidelines (`paper-grid` background grid-system).
*   **Kinetic Physics & Skewing:** Subtle canvas skew effects applied dynamically as you scroll to mimic physical paper flex.
*   **Cinematic Telemetry Overlays:** Real-time diagnostics dashboards displaying exact draw coordinates, drawing speed, brush geometries, and coordinates hardware telemetry.
*   **Zero-Friction Smooth Scrolling:** Managed by the **Lenis** smooth scroll engine for fluid viewport progression.

---

## ⚡ Core Systems & Features

### 1. The Stroke Engine (Interactive Calligraphy Lab)
A high-fidelity sandbox powered by a customizable HTML5 canvas that implements dynamic fluid ink brush geometry algorithms:
*   **Nib Geometries:** 
    *   `Broad Edge`: Rotates brush stroke to a strict -45° pen angle to frame traditional Western Gothic and Uncial stem metrics.
    *   `Flex Reed`: Adjusts pen stroke width based on drawing speed and angle to replicate flexible metal/reed pen variations.
    *   `Shodo Brush`: An organic Eastern-Asian ink simulation mapping dynamic velocity fluctuations, bleeding absorption, and splatter.
*   **Ink Parameters:** Real-time adjustments for **Nib Weight** (brush size) and **Ink Dilution** (water ratio/opacity scale).
*   **Telemetry Dashboard:** High-frequency readout overlay capturing cursor variables (`COORD_X`, `COORD_Y`), stroke velocity (`PX/MS`), and path point counters.
*   **Guidelines and Canvas Actions:** Toggleable slanted guidelines grid and high-resolution **PNG Export** for stroke captures.

### 2. Live Tracing Blueprint Creator
A digital workspace to configure custom training blueprints and letters practice runs:
*   **Font Presets:** Toggle between **Western Italic** (serif slant guides) and **Modern Capitals** (geometric sans-caps bounds).
*   **Dynamic Char Sequence:** Input any custom letters (up to 10 characters) to instantly generate dotted skeleton outline templates.
*   **Gold Leaf Drawing:** Trace over generated outlines with a beautiful golden ink (`#D4AF37`) path layer.
*   **SVG Blueprint Export:** Package your custom word templates into lightweight, fully scalable vector graphics (`.svg`) for physical printing.

### 3. Curated Texture Exhibits (Script Gallery)
An elegant, modern image catalog profiling detailed structural components of calligraphic masterpieces:
*   **Visual Highlights:** Monotone textures representing Western Gothic, Spencerian, Roman Capitals, and East Asian Kanji scripts.
*   **Cinematic Geometry Overlays:** Activate Golden Ratio (`1.618`) gridlines and structural bounds diagrams directly over images.
*   **Technical Specifications Metadata:** Detailed breakdowns mapping the historic lineage, nib type, medium, and proportion rules for each specimen.

### 4. Origins & Styles Archive
An editorial timeline tracing the history, lineage, and physical constraints of the three core calligraphic families:
*   **Western Calligraphy:** Carolingian and Imperial Capital scripts governed by strict vertical tempos.
*   **Arabic Calligraphy:** Proportional ink-dot systems (classical Thuluth and Naskh) featuring sweeping ascenders.
*   **Oriental Calligraphy:** Zen-centered Kanji brush movement balanced around paper absorption.

### 5. Telemetry Contact Map & Local Storage
A fully responsive, high-contrast feedback interface backed by custom map telemetry:
*   **Geolocation Fetching:** Device coordinates are automatically retrieved via the browser's Geolocation API on mount.
*   **Interactive Leaflet Map:** Renders a customized dark-mode Map showing the user's location with a custom Gold-on-Black circular pin indicator.
*   **Transmission Lifecycle:** Managed state machine transitioning from `READY` ➔ `SENDING` ➔ `COMPLETE`, compiling details and telemetry packets.
*   **Local Storage Database:** Contact records and brush preferences are serialized and persisted locally.

---

## 🛠️ Technology Stack & Dependencies

*   **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Module Type: ES6 modules)
*   **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) (Custom font typography and smooth grids)
*   **Animations & Physics:**
    *   [Framer Motion](https://www.framer.com/motion/) (Fluid transitions, modal assemblies, and practice list tier filtering)
    *   [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis) (Kinetic smooth viewport scrolling)
*   **Maps & Telemetry:**
    *   [Leaflet 1.9](https://leafletjs.com/) + [React Leaflet 4](https://react-leaflet.js.org/) (Interactive maps overlay)
*   **Iconography:** [Lucide React](https://lucide-react.dev/) (Editorial diagnostic icons)

---

## 📁 Repository Directory Structure

```text
StylishStrokes/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular layout assemblies
│   │   ├── AboutCalligraphy.jsx # Linage history records
│   │   ├── AboutUs.jsx          # 5-column editorial team collective grid
│   │   ├── CalligraphyLab.jsx   # Stroke Engine & HTML5 canvas controller
│   │   ├── ContactForm.jsx      # Telemetry Map and client-side feedback dispatch
│   │   ├── Gallery.jsx          # Cinematic script exhibit and geometry overlays
│   │   ├── Hero.jsx             # Precision fluid vector path introduction
│   │   ├── LearningResources.jsx# Live Tracing blueprint canvas & PDF download sheets
│   │   ├── Navbar.jsx           # Section tracker and structural anchor navigation
│   │   └── StickyTicker.jsx     # Scrolling metadata footer display
│   ├── App.jsx             # Main router, scroll-skew layout, and Geolocation sync
│   ├── index.css           # Core styling layer, custom cursors, and backdrops
│   └── main.jsx            # React root injection point
├── package.json            # Configuration and third-party dependencies
├── tailwind.config.js      # Custom theme mappings, color structures
├── vite.config.js          # Vite build parameters and hot-reloads
└── README.md               # System documentation
```

---

## 🚀 Installation & Local Development

To spin up the local development server:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/StylishStrokes.git
    cd StylishStrokes
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch the development server:**
    ```bash
    npm run dev
    ```
    *The app will automatically open in your default browser at `http://localhost:5173/`.*

4.  **Build production-ready bundle:**
    ```bash
    npm run build
    ```
---

## 👥 The Development Collective

The application UI, telemetry, and physics were compiled by:
*  **Ikedinachi Franklin Ogbonne**  – *Principal Architect* (Core System Orchestration)
*    **Amy Somtochukwu Agbowo** – *Lead UI Designer* (Visual Proportion Models)
*   **Chiemerie Okeke** – *Systems Engineer* (Telemetry Infrastructure)
*   **Chukwuneta Emmanuel** – *UX Flow Specialist* (Frictionless Content Delivery)

---

> Created with passion for historic letterforms and modern interactive design. 🖋️
