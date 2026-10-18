import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Flame,
  ShieldAlert,
  Columns,
  Scale,
  Tv,
  Users,
  Network,
  Compass,
  CheckCircle2,
  XCircle,
  Eye,
  Volume2,
  Armchair,
  Quote,
  Sparkles,
  Layers,
  AlertCircle,
} from 'lucide-react';
import {
  DUNE_DOSSIER,
  DOOMSDAY_DOSSIER,
  THEMATIC_MATRIX,
  FORMAT_GUIDE,
} from '../data/dunesdayContent';
import type { MovieDossier, ThemeViewMode } from '../data/dunesdayContent';

export interface DossierSectionProps {
  themeMode: ThemeViewMode;
  onThemeModeChange?: (mode: ThemeViewMode) => void;
}

type PrimarySectionTab = 'dossiers' | 'thematic-matrix' | 'format-guide';
type DossierFocusMode = 'split-compare' | 'arrakis-only' | 'latveria-only';

export const DossierSection: React.FC<DossierSectionProps> = ({
  themeMode,
  onThemeModeChange,
}) => {
  const [activeTab, setActiveTab] = useState<PrimarySectionTab>('dossiers');
  const [dossierFocus, setDossierFocus] =
    useState<DossierFocusMode>('split-compare');
  const [selectedFormatId, setSelectedFormatId] = useState<string>(
    FORMAT_GUIDE[0].id
  );

  // Synchronize internal dossier focus when global themeMode changes in header
  useEffect(() => {
    if (themeMode === 'desert') {
      setDossierFocus('arrakis-only');
    } else if (themeMode === 'doom') {
      setDossierFocus('latveria-only');
    } else {
      setDossierFocus('split-compare');
    }
  }, [themeMode]);

  // Sub-renderer for an individual Movie Dossier (Arrakis or Latveria styled)
  const renderMovieDossierCard = (
    dossier: MovieDossier,
    isSplitColumn: boolean
  ) => {
    const isArrakis = dossier.id === 'dune-messiah';

    return (
      <div
        key={dossier.id}
        className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all sm:p-8 ${
          isArrakis
            ? 'glass-panel-arrakis border-arrakis-sand/30 shadow-spice-sm'
            : 'glass-panel-latveria border-latveria-plasma/30 shadow-doom-sm'
        }`}
      >
        <div>
          {/* Top Classification Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest ${
                isArrakis ? 'text-arrakis-sand' : 'text-latveria-plasma'
              }`}
            >
              {isArrakis ? (
                <Flame className="h-3.5 w-3.5 text-arrakis-spice" />
              ) : (
                <ShieldAlert className="h-3.5 w-3.5 text-latveria-plasma" />
              )}
              {dossier.classificationCode}
            </span>
            <span className="rounded-md bg-black/50 px-2.5 py-1 font-mono text-[11px] text-zinc-300 border border-white/10">
              {dossier.estimatedRuntimeMinutes} MIN // {dossier.aspectRatio}
            </span>
          </div>

          {/* Movie Title & Credits */}
          <div className="mt-5">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {dossier.subtitle}
            </div>
            <h3
              className={`mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl ${
                isArrakis
                  ? 'font-serif text-glow-spice'
                  : 'font-sans text-glow-doom'
              }`}
            >
              {dossier.title}
            </h3>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-300">
              <span className="rounded-lg bg-white/5 px-3 py-1 border border-white/10">
                <strong className="text-zinc-400">Director:</strong>{' '}
                {dossier.director}
              </span>
              <span className="rounded-lg bg-white/5 px-3 py-1 border border-white/10">
                <strong className="text-zinc-400">Score:</strong>{' '}
                {dossier.composers}
              </span>
              <span className="rounded-lg bg-white/5 px-3 py-1 border border-white/10">
                <strong className="text-zinc-400">Epoch:</strong>{' '}
                {dossier.inUniverseTimeline}
              </span>
            </div>
          </div>

          {/* Logline Banner */}
          <blockquote
            className={`mt-6 rounded-2xl border-l-4 bg-black/40 p-4 text-sm italic leading-relaxed text-zinc-200 ${
              isArrakis
                ? 'border-l-arrakis-spice'
                : 'border-l-latveria-plasma'
            }`}
          >
            "{dossier.logline}"
          </blockquote>

          {/* Executive Briefing */}
          <div className="mt-6 space-y-3">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              <BookOpen
                className={`h-4 w-4 ${
                  isArrakis ? 'text-arrakis-sand' : 'text-latveria-plasma'
                }`}
              />
              Executive Intelligence Briefing
            </h4>
            {dossier.executiveBriefing.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xs leading-relaxed text-zinc-300 sm:text-sm"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Narrative Pillars */}
          <div className="mt-8 space-y-4">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              <Layers
                className={`h-4 w-4 ${
                  isArrakis ? 'text-arrakis-spice' : 'text-latveria-plasma'
                }`}
              />
              Core Narrative & Lore Pillars
            </h4>

            <div className="space-y-4">
              {dossier.corePillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="rounded-2xl border border-white/10 bg-black/45 p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    {pillar.codeName}
                  </div>
                  <h5
                    className={`mt-1 text-lg font-bold text-white ${
                      isArrakis ? 'font-serif' : 'font-sans'
                    }`}
                  >
                    {pillar.title}
                  </h5>
                  <p
                    className={`text-xs font-medium ${
                      isArrakis ? 'text-arrakis-sand' : 'text-latveria-plasma'
                    }`}
                  >
                    {pillar.subtitle}
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                    {pillar.summary}
                  </p>

                  <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                    {pillar.deepDive.map((para, i) => (
                      <p
                        key={i}
                        className="text-xs leading-relaxed text-zinc-400"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Key Implications */}
                  <div className="mt-3 rounded-xl bg-white/5 p-3">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                      Critical Continuity Vectors:
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {pillar.keyImplications.map((imp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-zinc-300"
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                              isArrakis
                                ? 'bg-arrakis-spice'
                                : 'bg-latveria-plasma'
                            }`}
                          />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Characters Dramatis Personae */}
          <div className="mt-8 space-y-4">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              <Users
                className={`h-4 w-4 ${
                  isArrakis ? 'text-arrakis-sand' : 'text-latveria-plasma'
                }`}
              />
              Dramatis Personae & Psychological Profiles
            </h4>

            <div
              className={`grid grid-cols-1 gap-3.5 ${
                isSplitColumn ? 'xl:grid-cols-1' : 'md:grid-cols-2'
              }`}
            >
              {dossier.keyCharacters.map((char) => (
                <div
                  key={char.id}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/65 p-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5
                        className={`text-base font-bold text-white ${
                          isArrakis ? 'font-serif' : 'font-sans'
                        }`}
                      >
                        {char.name}
                      </h5>
                      <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-200">
                        {char.actor}
                      </span>
                    </div>
                    <div
                      className={`mt-0.5 font-mono text-[11px] ${
                        isArrakis ? 'text-arrakis-sand' : 'text-latveria-plasma'
                      }`}
                    >
                      {char.title}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase text-zinc-400">
                      Allegiance: {char.allegiance} // {char.status}
                    </div>

                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                      {char.psychologicalProfile}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                      <strong className="text-zinc-200">Role: </strong>
                      {char.narrativeRole}
                    </p>
                  </div>

                  <div className="mt-3 flex items-start gap-2 border-t border-white/10 pt-2.5 text-[11px] italic text-zinc-300">
                    <Quote
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                        isArrakis
                          ? 'text-arrakis-spice'
                          : 'text-latveria-plasma'
                      }`}
                    />
                    <span>"{char.signatureQuote}"</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faction Conspiracy / Multiversal Alignment Matrix */}
          <div className="mt-8 space-y-4">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              <Network
                className={`h-4 w-4 ${
                  isArrakis ? 'text-arrakis-spice' : 'text-latveria-plasma'
                }`}
              />
              {isArrakis
                ? 'The Four-Power Anti-Atreides Cabal'
                : 'Multiversal Incursion Faction Alignments'}
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dossier.conspiracyOrAlignmentMatrix.map((faction, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-black/40 p-3.5"
                >
                  <div className="font-mono text-xs font-bold text-white">
                    {faction.name}
                  </div>
                  <div
                    className={`mt-0.5 font-mono text-[10px] ${
                      isArrakis ? 'text-arrakis-sand' : 'text-latveria-plasma'
                    }`}
                  >
                    Envoy: {faction.representative}
                  </div>
                  <p className="mt-2 text-xs text-zinc-300">
                    <strong className="text-zinc-400">Agenda: </strong>
                    {faction.agenda}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    <strong className="text-zinc-500">Leverage: </strong>
                    {faction.leverage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Pre-Watch Directives Footer */}
        <div className="mt-8 rounded-2xl border border-white/15 bg-black/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
            <AlertCircle
              className={`h-4 w-4 ${
                isArrakis ? 'text-arrakis-spice' : 'text-latveria-plasma'
              }`}
            />
            Mandatory Pre-Screening Briefing
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {dossier.criticalWatchPreparation.map((prep, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-zinc-300"
              >
                <span className="font-mono font-bold text-zinc-500">
                  0{idx + 1}.
                </span>
                <span>{prep}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section
      id="dossiers"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-300">
            <BookOpen className="h-3.5 w-3.5 text-arrakis-sand" />
            IMPERIAL ARCHIVES × LATVERIAN CODEX
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Classified Lore Dossiers & Format Matrix
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Unabridged narrative primers for the 12-year Muad'Dib Jihad and the
            Multiversal Incursion crisis, paired with our Paul vs. Doom thematic
            synthesis and IMAX/Dolby technical breakdown.
          </p>
        </div>

        {/* Primary Section Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('dossiers')}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'dossiers'
                ? 'border-arrakis-sand bg-gradient-to-r from-arrakis-950 to-latveria-950 text-white shadow-dual-glow'
                : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/25 hover:text-white'
            }`}
          >
            <Columns className="h-4 w-4 text-arrakis-sand" />
            01. Film Dossiers
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('thematic-matrix')}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'thematic-matrix'
                ? 'border-latveria-plasma bg-latveria-950/90 text-white shadow-doom-sm'
                : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/25 hover:text-white'
            }`}
          >
            <Scale className="h-4 w-4 text-latveria-plasma" />
            02. Paul vs. Doom Matrix
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('format-guide')}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'format-guide'
                ? 'border-arrakis-spice bg-arrakis-950/90 text-white shadow-spice-sm'
                : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/25 hover:text-white'
            }`}
          >
            <Tv className="h-4 w-4 text-arrakis-spice" />
            03. IMAX & Format Guide
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: THE DUAL DOSSIERS (DUNE MESSIAH & AVENGERS: DOOMSDAY)
         ===================================================================== */}
      {activeTab === 'dossiers' && (
        <div>
          {/* Sub-Toggle: Split Compare vs. Desert Only vs. Doom Only */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Compass className="h-4 w-4 text-arrakis-sand" />
              <span className="font-mono uppercase tracking-wider">
                Dossier Reading Layout:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setDossierFocus('split-compare');
                  onThemeModeChange?.('split');
                }}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                  dossierFocus === 'split-compare'
                    ? 'border-white/40 bg-zinc-800 text-white font-bold'
                    : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-white'
                }`}
              >
                Split Comparative View
              </button>
              <button
                type="button"
                onClick={() => {
                  setDossierFocus('arrakis-only');
                  onThemeModeChange?.('desert');
                }}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                  dossierFocus === 'arrakis-only'
                    ? 'border-arrakis-spice bg-arrakis-950 text-arrakis-sand font-bold'
                    : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-arrakis-sand'
                }`}
              >
                Arrakis Archive Only (Dune 3)
              </button>
              <button
                type="button"
                onClick={() => {
                  setDossierFocus('latveria-only');
                  onThemeModeChange?.('doom');
                }}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                  dossierFocus === 'latveria-only'
                    ? 'border-latveria-plasma bg-latveria-950 text-latveria-plasma font-bold'
                    : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-latveria-plasma'
                }`}
              >
                Latveria Decree Only (Doomsday)
              </button>
            </div>
          </div>

          {/* Render Dossier Columns */}
          {dossierFocus === 'split-compare' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {renderMovieDossierCard(DUNE_DOSSIER, true)}
              {renderMovieDossierCard(DOOMSDAY_DOSSIER, true)}
            </div>
          ) : dossierFocus === 'arrakis-only' ? (
            <div className="mx-auto max-w-5xl">
              {renderMovieDossierCard(DUNE_DOSSIER, false)}
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              {renderMovieDossierCard(DOOMSDAY_DOSSIER, false)}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: THEMATIC COMPARISON MATRIX (PAUL ATREIDES VS. DOCTOR DOOM)
         ===================================================================== */}
      {activeTab === 'thematic-matrix' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-arrakis-950/60 via-zinc-950 to-latveria-950/60 p-6">
            <h3 className="font-serif text-2xl font-bold text-white">
              The Sovereign Dichotomy: Emperor Paul Muad'Dib vs. God Emperor Doom
            </h3>
            <p className="mt-2 text-sm text-zinc-300">
              Why do <em className="text-arrakis-sand">Dune: Part Three</em> and{' '}
              <em className="text-latveria-plasma">Avengers: Doomsday</em> form
              the most philosophically cohesive double feature in modern blockbuster
              history? Because both epics deconstruct the exact same existential
              figure: the hyper-prescient ruler who sacrifices billions to save a
              remnant of humanity from total extinction.
            </p>
          </div>

          <div className="space-y-6">
            {THEMATIC_MATRIX.map((row, index) => (
              <div
                key={row.id}
                className="overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/90 shadow-xl"
              >
                {/* Top Axis Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-zinc-900/90 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold text-white">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                        {row.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        {row.axisTitle}
                      </h4>
                    </div>
                  </div>
                  <span className="rounded-lg border border-white/10 bg-black/50 px-3 py-1 font-mono text-xs italic text-zinc-300">
                    "{row.coreQuestion}"
                  </span>
                </div>

                {/* Dual Perspective Columns */}
                <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-2 lg:divide-y-0 lg:divide-x">
                  {/* Left: Paul Atreides */}
                  <div className="bg-gradient-to-br from-arrakis-950/35 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <span className=" font-mono text-xs font-bold uppercase tracking-widest text-arrakis-sand">
                        PAUL ATREIDES // MUAD'DIB
                      </span>
                      <Flame className="h-4 w-4 text-arrakis-spice" />
                    </div>
                    <h5 className="mt-2 font-serif text-lg font-bold text-white">
                      {row.paulAtreidesPerspective.header}
                    </h5>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                      {row.paulAtreidesPerspective.analysis}
                    </p>
                    <div className="mt-4 inline-block rounded-lg border border-arrakis-sand/25 bg-black/40 px-3 py-1.5 font-mono text-[11px] text-arrakis-sand">
                      Instrument: {row.paulAtreidesPerspective.artifactOrMechanism}
                    </div>
                  </div>

                  {/* Right: Victor von Doom */}
                  <div className="bg-gradient-to-bl from-latveria-950/35 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-latveria-plasma">
                        VICTOR VON DOOM // LATVERIA
                      </span>
                      <ShieldAlert className="h-4 w-4 text-latveria-plasma" />
                    </div>
                    <h5 className="mt-2 font-sans text-lg font-bold text-white">
                      {row.victorVonDoomPerspective.header}
                    </h5>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                      {row.victorVonDoomPerspective.analysis}
                    </p>
                    <div className="mt-4 inline-block rounded-lg border border-latveria-plasma/25 bg-black/40 px-3 py-1.5 font-mono text-[11px] text-latveria-plasma">
                      Instrument: {row.victorVonDoomPerspective.artifactOrMechanism}
                    </div>
                  </div>
                </div>

                {/* Bottom Synthesis Bar */}
                <div className="border-t border-white/10 bg-black/60 px-6 py-4">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-200 sm:text-sm">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <p>
                      <strong className="font-mono uppercase tracking-wider text-white">
                        Dunesday Convergence:{' '}
                      </strong>
                      {row.convergenceSynthesis}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: THEATER & FORMAT MATRIX (IMAX 70MM, DUAL LASER, DOLBY, 4DX)
         ===================================================================== */}
      {activeTab === 'format-guide' && (
        <div id="formats" className="space-y-8">
          {/* Format Selector Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FORMAT_GUIDE.map((fmt) => {
              const isSelected = fmt.id === selectedFormatId;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setSelectedFormatId(fmt.id)}
                  className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? 'border-arrakis-sand bg-gradient-to-b from-zinc-800/95 to-zinc-950 shadow-spice-sm'
                      : 'border-white/10 bg-zinc-900/50 hover:border-white/25'
                  }`}
                >
                  <div>
                    <span className="inline-block rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-arrakis-sand">
                      {fmt.badge}
                    </span>
                    <h4 className="mt-2.5 font-sans text-lg font-bold text-white">
                      {fmt.name}
                    </h4>
                    <p className="mt-1 font-mono text-xs text-zinc-400">
                      Aspect: {fmt.aspectRatio}
                    </p>
                  </div>

                  {/* Mini Telemetry Bars */}
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-3 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Visual Scale</span>
                      <span className="font-bold text-white">
                        {fmt.visualRating}/10
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Acoustic Impact</span>
                      <span className="font-bold text-white">
                        {fmt.audioRating}/10
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">6-Hr Comfort</span>
                      <span className="font-bold text-latveria-plasma">
                        {fmt.enduranceComfortRating}/10
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Format Breakdown Panel */}
          {FORMAT_GUIDE.filter((f) => f.id === selectedFormatId).map(
            (activeFormat) => (
              <div
                key={activeFormat.id}
                className="rounded-3xl border border-white/15 bg-zinc-950/95 p-6 shadow-2xl sm:p-8"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-arrakis-spice/20 px-2.5 py-1 font-mono text-xs font-bold text-arrakis-sand border border-arrakis-spice/30">
                        {activeFormat.badge}
                      </span>
                      <span className="rounded-md bg-latveria-plasma/15 px-2.5 py-1 font-mono text-xs font-bold text-latveria-plasma border border-latveria-plasma/30">
                        OPTIMAL FOR: {activeFormat.bestForMovie.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
                      {activeFormat.name}
                    </h3>
                  </div>

                  {/* Three Rating Gauges */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5">
                      <Eye className="h-4 w-4 text-arrakis-sand" />
                      <div>
                        <div className="font-mono text-[10px] uppercase text-zinc-400">
                          Visuals
                        </div>
                        <div className="font-mono text-base font-bold text-white">
                          {activeFormat.visualRating}/10
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5">
                      <Volume2 className="h-4 w-4 text-arrakis-spice" />
                      <div>
                        <div className="font-mono text-[10px] uppercase text-zinc-400">
                          Audio
                        </div>
                        <div className="font-mono text-base font-bold text-white">
                          {activeFormat.audioRating}/10
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5">
                      <Armchair className="h-4 w-4 text-latveria-plasma" />
                      <div>
                        <div className="font-mono text-[10px] uppercase text-zinc-400">
                          Endurance
                        </div>
                        <div className="font-mono text-base font-bold text-white">
                          {activeFormat.enduranceComfortRating}/10
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specs & Technical Analysis */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-7">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Optical & Acoustic Engineering Analysis
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {activeFormat.technicalBreakdown}
                    </p>

                    <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                        <div className="font-mono text-[10px] uppercase text-zinc-400">
                          Projection Architecture
                        </div>
                        <div className="mt-1 text-xs font-medium text-zinc-200">
                          {activeFormat.resolutionAndProjection}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                        <div className="font-mono text-[10px] uppercase text-zinc-400">
                          Sound Array
                        </div>
                        <div className="mt-1 text-xs font-medium text-zinc-200">
                          {activeFormat.audioArchitecture}
                        </div>
                      </div>
                    </div>

                    {/* Seat Selection Tactic Callout */}
                    <div className="rounded-2xl border border-arrakis-sand/30 bg-arrakis-950/30 p-4">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-arrakis-sand">
                        Tactical Seat Selection Coordinates:
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-200">
                        {activeFormat.seatSelectionTactic}
                      </p>
                    </div>
                  </div>

                  {/* Pros & Cons Column */}
                  <div className="space-y-4 lg:col-span-5">
                    <div className="rounded-2xl border border-latveria-plasma/25 bg-latveria-950/20 p-4">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-latveria-plasma">
                        Strategic Advantages
                      </div>
                      <ul className="mt-2.5 space-y-2">
                        {activeFormat.pros.map((pro, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-zinc-200"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-latveria-plasma" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-arrakis-spice/25 bg-arrakis-950/20 p-4">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-arrakis-spice">
                        Marathon Trade-Offs & Risks
                      </div>
                      <ul className="mt-2.5 space-y-2">
                        {activeFormat.cons.map((con, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-zinc-300"
                          >
                            <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-arrakis-spice" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default DossierSection;