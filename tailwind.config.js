/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        arrakis: {
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f2d7b3',
          300: '#e9bc82',
          400: '#df994f',
          500: '#d87d2b', // Primary Ochre
          600: '#ca6320',
          700: '#a84b1d',
          800: '#873d1e',
          900: '#6e341b',
          950: '#1c0d06', // Deep Desert Night
          sand: '#e6c280', // Sand Gold
          ochre: '#cc7722', // Classic Ochre
          spice: '#ff5500', // Spice Melange Orange Glow
          iban: '#00d2ff', // Fremen Eyes of Ibad Cyan
          obsidian: '#120a06', // Weathered Dark Bronze/Obsidian
        },
        latveria: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d4',
          300: '#86efb4',
          400: '#4ade8b',
          500: '#10b981', // Core Emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22', // Deep Doom Void
          plasma: '#00ff66', // Victor von Doom Plasma Glow
          emerald: '#00a86b', // Latverian Royal Banner Green
          titanium: '#8a9597', // Brushed Titanium Gray
          gunmetal: '#1e242b', // Heavy Armor Gunmetal
          steel: '#2c3539', // Battleworld Industrial Steel
          obsidian: '#090d11', // Dark Monolith Base
        },
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'spice-sm': '0 0 10px -2px rgba(255, 85, 0, 0.4)',
        'spice-md': '0 0 25px -4px rgba(255, 85, 0, 0.55)',
        'spice-lg': '0 0 45px -5px rgba(255, 85, 0, 0.75)',
        'ibad-glow': '0 0 20px -2px rgba(0, 210, 255, 0.6)',
        'doom-sm': '0 0 10px -2px rgba(0, 255, 102, 0.4)',
        'doom-md': '0 0 25px -4px rgba(0, 255, 102, 0.55)',
        'doom-lg': '0 0 45px -5px rgba(0, 255, 102, 0.75)',
        'dual-glow': '-15px 0 35px -5px rgba(255, 85, 0, 0.45), 15px 0 35px -5px rgba(0, 255, 102, 0.45)',
      },
      backgroundImage: {
        'desert-gradient': 'radial-gradient(circle at 50% 0%, rgba(255, 85, 0, 0.18) 0%, rgba(216, 125, 43, 0.06) 45%, rgba(18, 10, 6, 0.98) 100%)',
        'doom-gradient': 'radial-gradient(circle at 50% 0%, rgba(0, 255, 102, 0.16) 0%, rgba(30, 36, 43, 0.15) 45%, rgba(9, 13, 17, 0.98) 100%)',
        'split-gradient': 'linear-gradient(135deg, rgba(255, 85, 0, 0.14) 0%, rgba(12, 12, 14, 0.96) 50%, rgba(0, 255, 102, 0.14) 100%)',
        'hud-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-md': '32px 32px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
};