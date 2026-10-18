# DUNESDAY // The Ultimate Double-Feature Companion

> **"Two Emperors. One Fateful Day in Cinema."**  
> An interactive cinematic survival guide, runtime planner, lore dossier archive, and technical IMAX format matrix built for the December 18, 2026 theatrical convergence of **Denis Villeneuve's *Dune: Part Three* (*Dune Messiah*)** and **Marvel Studios' *Avengers: Doomsday***.

---

## 🌌 Overview

On December 18, 2026, two monolithic cinematic forces collide in theaters worldwide:
- **Dune: Part Three (Dune Messiah)** — Denis Villeneuve's 168-minute tragic, philosophical deconstruction of messianic power, political conspiracy, and holy war across the sands of Arrakis.
- **Avengers: Doomsday** — The Russo Brothers' 175-minute multiversal kinetic war showcasing the rise of God Emperor Victor von Doom and the collapse of converging realities.

With a combined feature runtime of **5 hours and 43 minutes** (over **6 hours and 30 minutes** including trailers and intermission), navigating this double feature requires physical preparation, tactical scheduling, and format awareness. **DUNESDAY** is built to prepare cinephiles, Fremen loyalists, and Latverian legionnaires alike.

---

## 🛠️ Tech Stack & Technologies Used

DUNESDAY was engineered using a modern, high-performance web stack designed for immersive visual storytelling, zero-dependency procedural audio, and rapid responsive rendering:

### 1. Core Framework & Language
- **[React 18](https://react.dev/)** (`^18.3.1`): Declarative component architecture utilizing hooks (`useState`, `useEffect`, `useMemo`, `useRef`) for local state management and reactive UI updates.
- **[TypeScript](https://www.typescriptlang.org/)** (`~5.6.2`): Strict type checking, isolated module compilation, and domain models covering dossiers, formatting guides, and schedule presets.
- **[Vite 5](https://vitejs.dev/)**: Next-generation frontend build tooling with Rollup optimizations, fast HMR (Hot Module Replacement), and targeted manual chunk splitting (`vendor`, `three`, `icons`).

### 2. 3D Graphics & WebGL Shaders
- **[Three.js](https://threejs.org/)** (`^0.170.0`): WebGL 3D graphics rendering engine.
- **[@react-three/fiber](https://r3f.docs.pmnd.rs/) (R3F)** (`^8.17.10`): React renderer for Three.js, enabling declarative scene graphs, frame-loop animations (`useFrame`), and responsive camera control.
- **[@react-three/drei](https://github.com/pmndrs/drei)** (`^9.114.0`): High-level R3F abstractions:
  - `<Float>`: Smooth procedural floating and rotational damping.
  - `<MeshDistortMaterial>`: Dynamic physical vertex displacement for the pulsating Latverian/Arrakis hybrid plasma core.
  - `<Sparkles>`: Floating micro-luminescent ambient particles.
- **Custom GLSL Shaders**:
  - **Vertex Shader**: Computes real-time orbital rotation, breathing radial expansion, theme-interpolated hourglass pinches, and distance-attenuated point sizing for **2,000+ procedural spice particles**.
  - **Fragment Shader**: Generates soft-edged circular particle points with quadratic radial falloff and dynamic additive alpha blending.
- **Context Loss Handling & Telemetry Fallback**: Built-in WebGL capability detection and `webglcontextlost` event listeners that gracefully render a low-power HUD fallback on low-end devices.

### 3. Procedural Web Audio Engine (Zero External Audio Files)
- **Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`)**:
  - Synthesizes a real-time, procedural sci-fi ambient drone directly in the browser without loading large external MP3/WAV assets.
  - Uses two detuned low-frequency oscillators that dynamically glide between **55.0 Hz** (Arrakis Sub-bass resonance) and **43.65 Hz** (Latveria Doom frequency) when the user switches themes.
  - Features smooth exponential audio gain ramps to prevent audible clipping or pops.

### 4. Styling & Thematic Design System
- **[Tailwind CSS](https://tailwindcss.com/)** (`^3.4.17`) + **[PostCSS](https://postcss.org/)** & **[Autoprefixer](https://github.com/postcss/autoprefixer)**:
  - Utility-first CSS architecture with custom color variables for Arrakis Spice (`#ff5500`), Desert Ochre (`#e6c280`), Eyes of Ibad (`#00d2ff`), and Latveria Plasma (`#00ff66`).
  - **Dual-Theme Engine**: Dynamic switching between **Arrakis Desert**, **Latveria Doom**, and **Split Convergence** modes affecting backgrounds, glows, scrollbars, and 3D lighting.
  - **Futuristic HUD Aesthetics**: Glassmorphic panels with backdrop blur, chamfered corner clips (`clip-path`), subtle scanlines, and dual-accented glowing scrollbars.
- **Typography (Google Fonts)**:
  - *Cinzel*: Regal imperial serif reflecting the ancient aristocratic nobility of House Atreides.
  - *Space Grotesk*: Precision HUD sans-serif representing Latverian engineering.
  - *JetBrains Mono*: Monospaced font for telemetry, timestamps, runtimes, and technical format data.
- **[Lucide React](https://lucide.dev/)** (`^0.454.0`): Clean, unified iconography for tactical status badges, playback controls, and checklist items.

---

## ⚡ Key Features Breakdown

```
┌────────────────────────────────────────────────────────────────────────┐
│                               DUNESDAY                                 │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. 3D WebGL Convergence Orb   │ Interactive R3F canvas + 2,000 GLSL   │
│                                │ procedural spice particles & gyro core │
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Procedural Web Audio Synth  │ Native dual-oscillator ambient drone   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. Live Countdown Engine       │ T-Minus countdown to Dec 18, 2026     │
├────────────────────────────────┼───────────────────────────────────────┤
│ 4. Double-Feature Scheduler    │ Interactive runtime & intermission    │
│                                │ calculator with clipboard itinerary   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 5. Classified Lore Dossiers    │ Comprehensive briefs on both movies   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 6. Thematic Matrix             │ 6-point philosophical comparison      │
│                                │ (Paul Atreides vs. Victor von Doom)   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 7. IMAX Format Guide           │ 1.43:1 GT vs. 1.90:1 vs. Dolby Cinema │
├────────────────────────────────┼───────────────────────────────────────┤
│ 8. Interactive Survival Kit    │ 12-point readiness checklist with     │
│                                │ localStorage persistence & ranking    │
├────────────────────────────────┼───────────────────────────────────────┤
│ 9. Cinema Etiquette Protocol   │ Rules of conduct for the marathon     │
└────────────────────────────────┴───────────────────────────────────────┘
```

### 1. Interactive 3D Hero Scene (`HeroScene.tsx`)
- Mouse/touch parallax motion with lerped damping.
- 2,000 individual sand/plasma particles with custom GLSL vertex and fragment shaders.
- Dual gyroscopic gimbal rings with Arrakis brass and Latverian titanium reflections.
- Real-time lighting shifts responding to theme selection (Amber vs. Emerald spotlights).

### 2. Runtime & Schedule Planner (`SchedulePlanner.tsx`)
- **Watch Order Presets**:
  - *The Desert First*: Dune Messiah (168 min) → Intermission (45 min) → Avengers: Doomsday (175 min). Recommended for cognitive sharpness during Villeneuve's philosophical slow burn.
  - *Doom First*: Avengers: Doomsday (175 min) → Intermission (50 min) → Dune Messiah (168 min). The "Spoiler-Shield" order to avoid opening-day MCU social media leaks.
- **Customizable Timing Controls**: Quick showtime presets (11:00 AM, 1:00 PM, 3:30 PM, 6:00 PM), adjustable intermission slider (15–90 min), and optional 18-minute IMAX trailer blocks.
- **Instant Itinerary Copy**: One-click clipboard copy formatted with complete milestone timestamps for group planning.

### 3. Classified Dossiers & Thematic Matrix (`DossierSection.tsx`)
- **Executive Film Briefs**: Detailed breakdown of directors, composers, loglines, core thematic pillars, character profiles, and faction conspiracy alignments.
- **Paul Atreides vs. Victor von Doom**: In-depth philosophical contrast across six axes:
  1. *The Hubris of Omniscience* (Prescience vs. Quantum Calculation)
  2. *Determinism vs. Totalitarian Will* (The Golden Path vs. Battleworld Order)
  3. *Sacrifice of the Soul* (Loss of Humanity vs. Armor of Damnation)
  4. *The Weight of the Monarchy* (Sietch Tradition vs. Latverian Monarchy)
  5. *Cosmic Weaponry* (Spice Melange vs. Doombots & Sorcery)
  6. *The Inevitable Fall* (Wandering Blind into the Sand vs. Multiversal Collapse)

### 4. Technical Format Benchmark (`FORMAT_GUIDE`)
- Deep technical breakdown and scoring across:
  - **IMAX 70mm / 1.43:1 Dual-Laser GT**
  - **IMAX Commercial 1.90:1 Xenon / Single-Laser**
  - **Dolby Cinema (Dual Christie 4K HDR & Dolby Atmos)**
  - **Standard 70mm 5-Perf Projection**
- Evaluates visual aspect ratio expansion, acoustic sound pressure, and 6-hour endurance seat ergonomics.

### 5. Interactive Survival Kit & Readiness Tracker (`SurvivalChecklist.tsx`)
- 12 scientifically verified endurance recommendations:
  - Preservative-free lubricating eye drops (combats dry eye from infrequent blinking in dark theaters).
  - High-fidelity acoustic earplugs (attenuates 105+ dB IMAX peaks while retaining vocal clarity).
  - Venous circulation reset exercises (prevents deep vein thrombosis during 6+ hours seated).
  - Timed hydration, electrolytes, and low-glycemic intermission nutrition.
- Dynamic readiness status: Computes your survival rank from *"Unprepared Off-Worlder"* to *"Fedaykin × Latverian Sovereign"*.
- Local persistence: State saves automatically to browser `localStorage`.

---

## 📂 Project Structure

```
dunesday/
├── index.html                 # HTML shell with Google Fonts & meta tags
├── package.json               # Dependencies, scripts & metadata
├── tsconfig.json              # Solution-level TypeScript configuration
├── tsconfig.app.json          # App TypeScript config (strict, verbatimModuleSyntax)
├── tsconfig.node.json         # Tooling TypeScript config for Vite
├── vite.config.ts             # Vite build pipeline, path aliases & chunk splitting
├── tailwind.config.js         # Custom color tokens, gradients, animations & utilities
├── postcss.config.js          # PostCSS processor config
└── src/
    ├── main.tsx               # React DOM entrypoint
    ├── App.tsx                # Master container, header, countdown, Web Audio synth
    ├── index.css              # Global styles, Tailwind directives & custom scrollbars
    ├── App.css                # Component styling utilities
    ├── components/
    │   ├── HeroScene.tsx          # Three.js 3D Canvas, GLSL shaders & hybrid core
    │   ├── SchedulePlanner.tsx    # Double-feature timeline calculator & itinerary exporter
    │   ├── DossierSection.tsx     # Classified film dossiers, format guide & thematic matrix
    │   └── SurvivalChecklist.tsx  # 12-point readiness tracker with localStorage
    ├── data/
    │   └── dunesdayContent.ts     # Centralized TypeScript content store & domain models
    └── assets/                    # Project graphics & icons
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (Node v20+ recommended)
- **Package Manager**: npm, pnpm, or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd dunesday/dunesday
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build

To typecheck and compile the production-ready bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🎨 Design Philosophy & Color Palette

The visual identity of Dunesday reflects the confrontation between the scorching, organic sands of Arrakis and the cold, tyrannical emerald technology of Latveria:

| Domain | Color Token | Hex Code | Thematic Representation |
| :--- | :--- | :--- | :--- |
| **Arrakis** | `arrakis-spice` | `#ff5500` | Raw spice melange flare & prescient fire |
| **Arrakis** | `arrakis-sand` | `#e6c280` | Sun-bleached dunes of the deep desert |
| **Arrakis** | `arrakis-ibad` | `#00d2ff` | Fremen blue-within-blue eyes of spice addiction |
| **Latveria** | `latveria-plasma` | `#00ff66` | Victor von Doom's quantum magic & energy shields |
| **Latveria** | `latveria-titanium` | `#8a9597` | Forged battleplate armor |
| **Neutral** | `bg-obsidian` | `#08090c` | Deep theatrical darkness & cinema void |

---

## 📜 Legal & Community Disclaimer

*Dunesday* is an unofficial, fan-crafted companion guide and endurance planner.
- *Dune: Part Three (Dune Messiah)* is a trademark of Legendary Pictures, Warner Bros. Discovery, and the Frank Herbert Estate.
- *Avengers: Doomsday* is a trademark of Marvel Studios and The Walt Disney Company.
