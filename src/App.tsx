import { useState, useEffect, useRef } from 'react';
import {
  Flame,
  ShieldAlert,
  Columns,
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  BookOpen,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Film,
  Compass,
  Smartphone,
  Users,
  Trash2,
  MessageSquareOff,
} from 'lucide-react';
import type { ThemeViewMode } from './data/dunesdayContent';
import HeroScene from './components/HeroScene';
import SchedulePlanner from './components/SchedulePlanner';
import DossierSection from './components/DossierSection';
import SurvivalChecklist from './components/SurvivalChecklist';

// Target Theatrical Double-Feature Event Date: December 18, 2026
const DUNESDAY_TARGET_ISO = '2026-12-18T00:00:00';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export function App() {
  const [themeMode, setThemeMode] = useState<ThemeViewMode>('split');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 65,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  // Web Audio API refs for procedural sci-fi ambient drone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Live Countdown Timer Effect
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(DUNESDAY_TARGET_ISO).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true,
        });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isLive: false,
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Procedural Web Audio Ambient Drone Toggle (Zero external audio files needed)
  const toggleAmbientDrone = () => {
    if (audioEnabled) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.3
        );
      }
      setTimeout(() => {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 350);
      setAudioEnabled(false);
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Set harmonic frequencies based on theme
        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        osc1.frequency.value = themeMode === 'desert' ? 55.0 : 48.99; // A1 or G1 sub-drone
        osc2.frequency.value = themeMode === 'desert' ? 82.41 : 73.42; // Fifth interval

        filter.type = 'lowpass';
        filter.frequency.value = 160;

        gain.gain.value = 0.001;
        gain.gain.setTargetAtTime(0.045, ctx.currentTime, 0.8);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        audioCtxRef.current = ctx;
        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainRef.current = gain;
        setAudioEnabled(true);
      } catch {
        setAudioEnabled(false);
      }
    }
  };

  // Shift drone pitch subtly if user switches between Arrakis and Latveria modes
  useEffect(() => {
    if (
      audioEnabled &&
      osc1Ref.current &&
      osc2Ref.current &&
      audioCtxRef.current
    ) {
      const now = audioCtxRef.current.currentTime;
      const baseFreq =
        themeMode === 'desert' ? 55.0 : themeMode === 'doom' ? 43.65 : 49.0;
      osc1Ref.current.frequency.setTargetAtTime(baseFreq, now, 0.5);
      osc2Ref.current.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.5);
    }
  }, [themeMode, audioEnabled]);

  // Dynamic root background class based on themeMode
  const themeWrapperClass =
    themeMode === 'desert'
      ? 'theme-desert bg-desert-gradient'
      : themeMode === 'doom'
      ? 'theme-doom bg-doom-gradient'
      : 'bg-split-gradient';

  return (
    <div
      className={`min-h-screen text-zinc-100 transition-colors duration-700 ${themeWrapperClass}`}
    >
      {/* Subtle HUD Grid Background Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-hud-grid bg-grid-md opacity-40" />

      {/* =====================================================================
          FIXED NAVIGATION HEADER
         ===================================================================== */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#08090c]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand Emblem */}
          <a
            href="#hero"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-arrakis-spice/30 via-zinc-900 to-latveria-plasma/30 shadow-sm">
              <span className="font-serif text-sm font-black tracking-tighter text-white">
                D×D
              </span>
            </div>
            <div>
              <span className="block font-serif text-base font-extrabold tracking-widest text-white">
                DUNESDAY
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                MESSIAH × DOOMSDAY
              </span>
            </div>
          </a>

          {/* Quick Jump Links (Desktop) */}
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#planner"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-arrakis-sand transition-colors"
            >
              <Clock className="h-3.5 w-3.5 text-arrakis-spice" />
              Planner
            </a>
            <a
              href="#dossiers"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-white transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-arrakis-sand" />
              Lore & Matrix
            </a>
            <a
              href="#survival"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-latveria-plasma transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-latveria-plasma" />
              Survival Kit
            </a>
            <a
              href="#etiquette"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              <Compass className="h-3.5 w-3.5 text-zinc-400" />
              Etiquette
            </a>
          </nav>

          {/* Theme View Switcher & Audio Synthesizer Toggle */}
          <div className="flex items-center gap-2">
            {/* 3-Way Aesthetic Toggle */}
            <div
              role="group"
              aria-label="Visual Theme Selector"
              className="flex items-center rounded-xl border border-white/15 bg-zinc-900/90 p-1"
            >
              <button
                type="button"
                onClick={() => setThemeMode('desert')}
                title="Arrakis Desert Theme"
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                  themeMode === 'desert'
                    ? 'bg-arrakis-spice text-white shadow-spice-sm'
                    : 'text-zinc-400 hover:text-arrakis-sand'
                }`}
              >
                <Flame className="h-3 w-3" />
                <span className="hidden sm:inline">Desert</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('split')}
                title="Split Convergence Theme"
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                  themeMode === 'split'
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Columns className="h-3 w-3" />
                <span className="hidden sm:inline">Split</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('doom')}
                title="Latveria Doom Theme"
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                  themeMode === 'doom'
                    ? 'bg-latveria-emerald text-black font-bold shadow-doom-sm'
                    : 'text-zinc-400 hover:text-latveria-plasma'
                }`}
              >
                <ShieldAlert className="h-3 w-3" />
                <span className="hidden sm:inline">Doom</span>
              </button>
            </div>

            {/* Ambient Drone Audio Button */}
            <button
              type="button"
              onClick={toggleAmbientDrone}
              title={
                audioEnabled
                  ? 'Mute Ambient Synth Drone'
                  : 'Enable Ambient Sci-Fi Drone'
              }
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                audioEnabled
                  ? 'border-latveria-plasma bg-latveria-950 text-latveria-plasma shadow-doom-sm'
                  : 'border-white/15 bg-zinc-900 text-zinc-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {audioEnabled ? (
                <Volume2 className="h-4 w-4 animate-pulse" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION WITH INTERACTIVE 3D R3F ARTIFACT
         ===================================================================== */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-20 pb-12"
      >
        {/* Interactive 3D Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <HeroScene themeMode={themeMode} className="h-full w-full" />
        </div>

        {/* Hero Foreground Overlay Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pt-8 sm:px-6 lg:px-8 pointer-events-none">
          {/* Top Telemetry Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 animate-ping rounded-full bg-arrakis-spice" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-200">
                CONVERGENCE EVENT // DECEMBER 18, 2026
              </span>
            </div>

            <div className="pointer-events-auto hidden items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 font-mono text-[11px] text-zinc-400 backdrop-blur-md sm:flex">
              <span className="text-arrakis-sand">ARRAKIS: 168 MIN</span>
              <span>•</span>
              <span className="text-latveria-plasma">LATVERIA: 175 MIN</span>
              <span>•</span>
              <span className="text-white">COMBINED: 5H 43M</span>
            </div>
          </div>

          {/* Center-Bottom Hero Typography & Countdown */}
          <div className="my-auto pt-36 pb-6 text-center">
            <div className="mx-auto max-w-4xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-arrakis-sand sm:text-sm">
                TWO EMPERORS. ONE FATEFUL DAY IN CINEMA.
              </p>

              <h1
                className={`mt-3 text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl ${
                  themeMode === 'doom'
                    ? 'font-sans text-glow-doom'
                    : themeMode === 'desert'
                    ? 'font-serif text-glow-spice'
                    : 'font-serif'
                }`}
              >
                <span className="bg-gradient-to-r from-arrakis-sand via-white to-latveria-plasma bg-clip-text text-transparent">
                  DUNESDAY
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-black/55 px-4 py-2.5 text-sm leading-relaxed text-zinc-200 backdrop-blur-md sm:text-base border border-white/10">
                The definitive survival companion, chronological runtime
                calculator, and lore archive for the theatrical double feature of{' '}
                <strong className="font-serif text-arrakis-sand">
                  Dune: Part Three
                </strong>{' '}
                and Marvel Studios’{' '}
                <strong className="font-sans text-latveria-plasma">
                  Avengers: Doomsday
                </strong>
                .
              </p>

              {/* Live T-Minus Countdown Clock */}
              <div className="pointer-events-auto mx-auto mt-8 grid max-w-xl grid-cols-4 gap-2.5 sm:gap-4">
                {[
                  { label: 'DAYS', value: countdown.days },
                  { label: 'HOURS', value: countdown.hours },
                  { label: 'MINUTES', value: countdown.minutes },
                  { label: 'SECONDS', value: countdown.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-2xl border border-white/15 bg-black/75 p-3 backdrop-blur-lg sm:p-4"
                  >
                    <div className="font-mono text-2xl font-extrabold text-white sm:text-4xl">
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="mt-1 font-mono text-[10px] tracking-widest text-zinc-400">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary CTA Buttons */}
              <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#planner"
                  className="inline-flex items-center gap-2 rounded-xl border border-arrakis-spice bg-gradient-to-r from-arrakis-ochre to-arrakis-spice px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-spice-md hover:brightness-110 transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Launch Runtime Planner
                  <ChevronRight className="h-4 w-4" />
                </a>

                <a
                  href="#dossiers"
                  className="inline-flex items-center gap-2 rounded-xl border border-latveria-plasma/50 bg-latveria-950/80 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-latveria-plasma shadow-doom-sm backdrop-blur-md hover:bg-latveria-900/80 hover:text-white transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Read Classified Dossiers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN CONTENT MODULES
         ===================================================================== */}
      <main className="relative z-10 space-y-8">
        {/* 1. Interactive Double-Feature Schedule Planner */}
        <SchedulePlanner themeMode={themeMode} />

        {/* 2. Comprehensive Dossiers, Thematic Matrix & Format Guide */}
        <DossierSection
          themeMode={themeMode}
          onThemeModeChange={(newMode) => setThemeMode(newMode)}
        />

        {/* 3. Interactive Survival Kit & Readiness Tracker */}
        <SurvivalChecklist themeMode={themeMode} />
      </main>

      {/* =====================================================================
          FOOTER & DOUBLE-FEATURE ETIQUETTE PROTOCOL
         ===================================================================== */}
      <footer
        id="etiquette"
        className="relative z-10 mt-20 border-t border-white/10 bg-[#050608] pt-16 pb-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Double-Feature Cinema Etiquette Guide */}
          <div className="mb-12 rounded-3xl border border-white/10 bg-zinc-950/90 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-arrakis-sand">
                  SIETCH & LATVERIAN AUDITORIUM LAW
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                  The Dunesday Double-Feature Etiquette Pact
                </h3>
              </div>
              <span className="self-start rounded-full border border-latveria-plasma/30 bg-latveria-950/60 px-3 py-1 font-mono text-xs text-latveria-plasma md:self-center">
                MANDATORY CODE OF CONDUCT
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/5 bg-black/50 p-4">
                <Smartphone className="h-5 w-5 text-arrakis-spice" />
                <h4 className="mt-3 font-mono text-xs font-bold uppercase text-white">
                  01. Zero Ocular Flare
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  A single smartphone screen at 50% brightness ruins night-adapted
                  vision across eight rows during Greig Fraser's dark Arrakeen
                  sequences. Enable Theater Mode before the IMAX countdown begins.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/50 p-4">
                <MessageSquareOff className="h-5 w-5 text-latveria-plasma" />
                <h4 className="mt-3 font-mono text-xs font-bold uppercase text-white">
                  02. Intermission Spoiler Quarantine
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  Half the theater lobby chose "The Desert First" while the other
                  half chose "Doom First." Never discuss third-act deaths or
                  post-credits reveals while standing in the concession or
                  restroom lines.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/50 p-4">
                <Trash2 className="h-5 w-5 text-arrakis-sand" />
                <h4 className="mt-3 font-mono text-xs font-bold uppercase text-white">
                  03. Pack Out Your Rations
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  Theater ushers have mere minutes to turn over 400-seat
                  auditoriums between back-to-back screenings. Carry every
                  popcorn tub, electrolyte bottle, and wrapper to the exit bins.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/50 p-4">
                <Users className="h-5 w-5 text-latveria-emerald" />
                <h4 className="mt-3 font-mono text-xs font-bold uppercase text-white">
                  04. Respect Contrast Tones
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  Cheer and react during Avengers: Doomsday's multiversal
                  crowd-pleasers, and honor the pin-drop silence during Dune:
                  Part Three's haunting dramatic chambers.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Community Disclaimer */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-arrakis-sand" />
              <span>
                <strong className="text-zinc-300">DUNESDAY</strong> // Built with
                React, TypeScript, Tailwind CSS & Three.js
              </span>
            </div>
            <p className="max-w-xl text-[11px] text-zinc-500">
              Unofficial fan-crafted companion guide and schedule planner.{' '}
              <em>Dune: Part Three</em> is a trademark of Legendary Pictures /
              Warner Bros. Discovery & the Frank Herbert Estate.{' '}
              <em>Avengers: Doomsday</em> is a trademark of Marvel Studios / The
              Walt Disney Company.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;