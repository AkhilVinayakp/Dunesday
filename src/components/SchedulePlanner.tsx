import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import {
  Clock,
  Calendar,
  Film,
  Coffee,
  Copy,
  Check,
  Timer,
  Shield,
} from 'lucide-react';
import {
  WATCH_ORDER_PRESETS,
  DUNE_DOSSIER,
  DOOMSDAY_DOSSIER,
} from '../data/dunesdayContent';
import type {
  WatchOrderMode,
  ThemeViewMode,
  DoubleFeaturePreset,
} from '../data/dunesdayContent';

export interface SchedulePlannerProps {
  themeMode?: ThemeViewMode;
}

interface TimelineEvent {
  title: string;
  subtitle: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  type: 'preshow' | 'movie1' | 'intermission' | 'movie2' | 'departure';
  badge?: string;
  notes?: string;
}

export const SchedulePlanner: FC<SchedulePlannerProps> = ({
  themeMode = 'split',
}) => {
  const [watchOrder, setWatchOrder] = useState<WatchOrderMode>('desert-first');
  const [startTimeMinutes, setStartTimeMinutes] = useState<number>(13 * 60); // 1:00 PM default
  const [includeTrailers, setIncludeTrailers] = useState<boolean>(true);
  const trailersDuration = 18; // standard IMAX trailer block
  const [copied, setCopied] = useState<boolean>(false);

  const preset: DoubleFeaturePreset = WATCH_ORDER_PRESETS[watchOrder];
  const [intermissionMinutes, setIntermissionMinutes] = useState<number>(
    preset.recommendedIntermissionMinutes
  );

  // Sync watch order with global theme mode
  useEffect(() => {
    if (themeMode === 'desert') {
      setWatchOrder('desert-first');
    } else if (themeMode === 'doom') {
      setWatchOrder('doom-first');
    }
  }, [themeMode]);

  // Sync default recommended intermission when switching watch orders
  const handleOrderChange = (newOrder: WatchOrderMode) => {
    setWatchOrder(newOrder);
    setIntermissionMinutes(
      WATCH_ORDER_PRESETS[newOrder].recommendedIntermissionMinutes
    );
  };

  // Convert minutes from midnight to readable HH:MM AM/PM string
  const formatTime = (totalMinutes: number): string => {
    const normalized = ((totalMinutes % 1440) + 1440) % 1440;
    const hours24 = Math.floor(normalized / 60);
    const mins = Math.floor(normalized % 60);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${hours12}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  // Format duration in hours and minutes
  const formatDuration = (mins: number): string => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  // Calculate timeline events
  const timeline = useMemo<TimelineEvent[]>(() => {
    const events: TimelineEvent[] = [];
    let currentMin = startTimeMinutes;

    const movie1Title =
      watchOrder === 'desert-first'
        ? DUNE_DOSSIER.title
        : DOOMSDAY_DOSSIER.title;
    const movie1Subtitle =
      watchOrder === 'desert-first'
        ? DUNE_DOSSIER.subtitle
        : DOOMSDAY_DOSSIER.subtitle;
    const movie1Runtime =
      watchOrder === 'desert-first'
        ? DUNE_DOSSIER.estimatedRuntimeMinutes
        : DOOMSDAY_DOSSIER.estimatedRuntimeMinutes;

    const movie2Title =
      watchOrder === 'desert-first'
        ? DOOMSDAY_DOSSIER.title
        : DUNE_DOSSIER.title;
    const movie2Subtitle =
      watchOrder === 'desert-first'
        ? DOOMSDAY_DOSSIER.subtitle
        : DUNE_DOSSIER.subtitle;
    const movie2Runtime =
      watchOrder === 'desert-first'
        ? DOOMSDAY_DOSSIER.estimatedRuntimeMinutes
        : DUNE_DOSSIER.estimatedRuntimeMinutes;

    // Optional IMAX Pre-Show & Trailers
    if (includeTrailers) {
      const preshowEnd = currentMin + trailersDuration;
      events.push({
        title: 'Doors Open, Seating & IMAX Trailers',
        subtitle: 'Concessions run, seat calibration, sound check',
        startTime: formatTime(currentMin),
        endTime: formatTime(preshowEnd),
        durationMinutes: trailersDuration,
        type: 'preshow',
        badge: 'WARM-UP',
        notes: 'Settle in, mute cellular devices, finish primary electrolyte intake.',
      });
      currentMin = preshowEnd;
    }

    // Movie 1
    const movie1End = currentMin + movie1Runtime;
    events.push({
      title: movie1Title,
      subtitle: movie1Subtitle,
      startTime: formatTime(currentMin),
      endTime: formatTime(movie1End),
      durationMinutes: movie1Runtime,
      type: 'movie1',
      badge: watchOrder === 'desert-first' ? 'ARRAKIS // PART 1' : 'LATVERIA // PART 1',
      notes:
        watchOrder === 'desert-first'
          ? 'Deep slow-burn immersion, Hans Zimmer wall of sound, zero dialogue rustling.'
          : 'High kinetic adrenaline, multi-timeline clashes, cheer along with crowd crowd-pleasers.',
    });
    currentMin = movie1End;

    // Intermission Bridge
    const intermissionEnd = currentMin + intermissionMinutes;
    events.push({
      title: 'Intermission Recovery Bridge',
      subtitle: 'Circulation walk, restroom reset, hydration refuel',
      startTime: formatTime(currentMin),
      endTime: formatTime(intermissionEnd),
      durationMinutes: intermissionMinutes,
      type: 'intermission',
      badge: 'BIOLOGICAL RESET',
      notes:
        'Walk outdoors or in lobby for at least 15 min. Apply lubricating eye drops. Avoid lobby spoilers from opposite-order audiences.',
    });
    currentMin = intermissionEnd;

    // Movie 2
    const movie2End = currentMin + movie2Runtime;
    events.push({
      title: movie2Title,
      subtitle: movie2Subtitle,
      startTime: formatTime(currentMin),
      endTime: formatTime(movie2End),
      durationMinutes: movie2Runtime,
      type: 'movie2',
      badge: watchOrder === 'desert-first' ? 'LATVERIA // FINALE' : 'ARRAKIS // FINALE',
      notes:
        watchOrder === 'desert-first'
          ? 'Electrifying multiversal payoff. Stay seated through full post-credits sequence.'
          : 'Philosophical emotional devastation. Pin-drop silence as the prophet walks into the desert.',
    });
    currentMin = movie2End;

    // Event Completion & Debrief
    events.push({
      title: 'Double-Feature Debrief & Egress',
      subtitle: 'Auditorium egress & post-marathon discussion',
      startTime: formatTime(currentMin),
      endTime: formatTime(currentMin + 20),
      durationMinutes: 20,
      type: 'departure',
      badge: 'MISSION COMPLETE',
      notes: 'Pack out all personal rations. Congratulate your endurance cohort.',
    });

    return events;
  }, [watchOrder, startTimeMinutes, includeTrailers, trailersDuration, intermissionMinutes]);

  // Overall totals
  const totalFeatureTime =
    DUNE_DOSSIER.estimatedRuntimeMinutes + DOOMSDAY_DOSSIER.estimatedRuntimeMinutes;
  const totalMarathonDuration =
    (includeTrailers ? trailersDuration : 0) +
    totalFeatureTime +
    intermissionMinutes;

  const marathonStartTime = formatTime(startTimeMinutes);
  const marathonEndTime = formatTime(startTimeMinutes + totalMarathonDuration);

  // Copy schedule summary to clipboard
  const copyItinerary = () => {
    const text = [
      `🎬 DUNESDAY DOUBLE-FEATURE ITINERARY: ${preset.name}`,
      `📅 Target Date: December 18, 2026`,
      `⏱️ Total Marathon Span: ${marathonStartTime} → ${marathonEndTime} (${formatDuration(totalMarathonDuration)})`,
      `🍿 Feature Runtime: ${formatDuration(totalFeatureTime)} | Intermission: ${intermissionMinutes}m`,
      '',
      ...timeline.map(
        (ev) =>
          `• [${ev.startTime} - ${ev.endTime}] (${formatDuration(ev.durationMinutes)}) ${ev.title} - ${ev.subtitle}`
      ),
      '',
      `💡 Tactical Strategy: ${preset.strategicVerdict}`,
    ].join('\n');

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="planner" className="relative scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-arrakis-spice/30 bg-arrakis-spice/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-arrakis-sand">
              <Calendar className="h-3 w-3 text-arrakis-spice" />
              Runtime Intelligence Engine
            </div>
            <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Double-Feature Schedule Planner
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-400">
              Calculate screening windows, intermission transitions, and biological recovery times for the ultimate 6-hour theatrical endurance test.
            </p>
          </div>

          <button
            type="button"
            onClick={copyItinerary}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-900/90 px-4 py-2.5 font-mono text-xs font-semibold text-zinc-200 backdrop-blur-md transition-all hover:border-arrakis-sand hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Itinerary Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-arrakis-sand" />
                <span>Copy Schedule Itinerary</span>
              </>
            )}
          </button>
        </div>

        {/* Configuration Controls Bar */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Preset Switcher & Config (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Watch Order Selector Card */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-md">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                01. Select Viewing Order
              </span>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOrderChange('desert-first')}
                  className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                    watchOrder === 'desert-first'
                      ? 'border-arrakis-spice bg-gradient-to-br from-arrakis-spice/20 to-black text-white shadow-spice-sm'
                      : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-arrakis-sand font-bold">
                    RECOMMENDED
                  </span>
                  <span className="mt-1 font-serif text-sm font-bold text-white">
                    The Desert First
                  </span>
                  <span className="mt-0.5 text-[11px] text-zinc-400">
                    Dune: Messiah → Doomsday
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOrderChange('doom-first')}
                  className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                    watchOrder === 'doom-first'
                      ? 'border-latveria-plasma bg-gradient-to-br from-latveria-950 to-black text-white shadow-doom-sm'
                      : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-latveria-plasma font-bold">
                    SPOILER-SHIELD
                  </span>
                  <span className="mt-1 font-sans text-sm font-bold text-white">
                    Doom First
                  </span>
                  <span className="mt-0.5 text-[11px] text-zinc-400">
                    Doomsday → Dune: Messiah
                  </span>
                </button>
              </div>

              {/* Order Strategic Synopsis */}
              <div className="mt-4 rounded-xl border border-white/5 bg-black/40 p-3.5">
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-arrakis-sand" />
                  <span className="font-mono text-[11px] font-bold uppercase text-zinc-300">
                    Strategic Arc
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {preset.strategicVerdict}
                </p>
                <p className="mt-2 text-[11px] italic text-zinc-500">
                  Arc: {preset.psychologicalArc}
                </p>
              </div>
            </div>

            {/* Showtime & Buffer Adjuster Card */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-md">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                02. Marathon Timing Parameters
              </span>

              {/* Showtime Selection Presets */}
              <div className="mt-3">
                <label className="font-mono text-xs text-zinc-400">First Show Showtime:</label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[
                    { label: '11:00 AM', mins: 11 * 60 },
                    { label: '1:00 PM', mins: 13 * 60 },
                    { label: '3:30 PM', mins: 15 * 60 + 30 },
                    { label: '6:00 PM', mins: 18 * 60 },
                  ].map((slot) => (
                    <button
                      key={slot.label}
                      type="button"
                      onClick={() => setStartTimeMinutes(slot.mins)}
                      className={`rounded-lg border px-2 py-1.5 font-mono text-[11px] transition-all ${
                        startTimeMinutes === slot.mins
                          ? 'border-arrakis-sand bg-arrakis-sand/20 font-bold text-arrakis-sand'
                          : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intermission Slider */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="intermission-slider" className="font-mono text-zinc-300 flex items-center gap-1.5">
                    <Coffee className="h-3.5 w-3.5 text-arrakis-spice" />
                    Intermission Duration:
                  </label>
                  <span className="font-mono font-bold text-arrakis-sand">
                    {intermissionMinutes} Minutes
                  </span>
                </div>
                <input
                  id="intermission-slider"
                  type="range"
                  min={15}
                  max={90}
                  step={5}
                  value={intermissionMinutes}
                  onChange={(e) => setIntermissionMinutes(parseInt(e.target.value, 10))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-arrakis-spice"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-600">
                  <span>15m (Sprint)</span>
                  <span>45m (Recommended)</span>
                  <span>90m (Dinner)</span>
                </div>
              </div>

              {/* Trailer Buffer Toggle */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/5 bg-black/30 p-3">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-zinc-400" />
                  <div>
                    <span className="block font-mono text-xs text-zinc-200">
                      Include 18m IMAX Trailers Block
                    </span>
                    <span className="block text-[10px] text-zinc-500">
                      Standard pre-feature promotional reel
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeTrailers}
                  onChange={(e) => setIncludeTrailers(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-latveria-plasma"
                />
              </div>
            </div>

            {/* Quick Marathon Metrics Pill */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-zinc-950/70 p-4 text-center">
              <div>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase">
                  Start Time
                </span>
                <span className="mt-0.5 block font-mono text-sm font-bold text-white">
                  {marathonStartTime}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase">
                  End Time
                </span>
                <span className="mt-0.5 block font-mono text-sm font-bold text-latveria-plasma">
                  {marathonEndTime}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase">
                  Total Span
                </span>
                <span className="mt-0.5 block font-mono text-sm font-bold text-arrakis-sand">
                  {formatDuration(totalMarathonDuration)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Chronological Schedule (7 cols) */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-md lg:col-span-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-arrakis-sand">
                  Chronological Mission Timeline
                </span>
                <h3 className="mt-0.5 font-serif text-lg font-bold text-white">
                  {preset.name} // Execution Sequence
                </h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Clock className="h-3.5 w-3.5 text-arrakis-spice" />
                <span>{formatDuration(totalMarathonDuration)} Total</span>
              </div>
            </div>

            {/* Interactive Timeline Item Flow */}
            <div className="relative mt-6 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-arrakis-spice before:via-zinc-700 before:to-latveria-plasma">
              {timeline.map((event, idx) => {
                const isMovie1 = event.type === 'movie1';
                const isMovie2 = event.type === 'movie2';
                const isIntermission = event.type === 'intermission';
                const isPreshow = event.type === 'preshow';

                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Step Icon Node */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs shadow-md transition-all ${
                        isMovie1
                          ? 'border-arrakis-spice bg-arrakis-950 text-arrakis-sand shadow-spice-sm'
                          : isMovie2
                          ? 'border-latveria-plasma bg-latveria-950 text-latveria-plasma shadow-doom-sm'
                          : isIntermission
                          ? 'border-amber-500/50 bg-amber-950/50 text-amber-300'
                          : isPreshow
                          ? 'border-zinc-700 bg-zinc-900 text-zinc-400'
                          : 'border-white/20 bg-zinc-900 text-zinc-300'
                      }`}
                    >
                      {isMovie1 || isMovie2 ? (
                        <Film className="h-4 w-4" />
                      ) : isIntermission ? (
                        <Coffee className="h-4 w-4" />
                      ) : isPreshow ? (
                        <Timer className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </div>

                    {/* Event Content Card */}
                    <div
                      className={`flex-1 rounded-xl border p-4 transition-all ${
                        isMovie1
                          ? 'border-arrakis-spice/30 bg-arrakis-950/30'
                          : isMovie2
                          ? 'border-latveria-plasma/30 bg-latveria-950/30'
                          : isIntermission
                          ? 'border-amber-500/30 bg-amber-950/20'
                          : 'border-white/5 bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              isMovie1
                                ? 'bg-arrakis-spice/20 text-arrakis-sand border border-arrakis-spice/40'
                                : isMovie2
                                ? 'bg-latveria-plasma/20 text-latveria-plasma border border-latveria-plasma/40'
                                : isIntermission
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {event.badge}
                          </span>
                          <span className="font-mono text-xs text-zinc-400">
                            {formatDuration(event.durationMinutes)}
                          </span>
                        </div>

                        {/* Clock Range Tag */}
                        <span className="font-mono text-xs font-bold text-white">
                          {event.startTime} → {event.endTime}
                        </span>
                      </div>

                      <h4 className="mt-2 font-serif text-base font-bold text-white">
                        {event.title}
                      </h4>
                      <p className="text-xs text-zinc-400">{event.subtitle}</p>

                      {event.notes && (
                        <div className="mt-2.5 rounded-lg border border-white/5 bg-black/40 p-2.5 text-[11px] leading-relaxed text-zinc-300">
                          <strong className="text-zinc-400">Pro-Tip:</strong> {event.notes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchedulePlanner;