import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckSquare,
  Square,
  ShieldCheck,
  RotateCcw,
  CheckCheck,
  HeartPulse,
  Headphones,
  Apple,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { SURVIVAL_ITEMS } from '../data/dunesdayContent';
import type {
  SurvivalChecklistItem,
  ThemeViewMode,
} from '../data/dunesdayContent';

export interface SurvivalChecklistProps {
  themeMode?: ThemeViewMode;
}

type DisplayCategory =
  | 'All'
  | 'Physical Preparation'
  | 'Gear & Comfort'
  | 'Nutrition & Timing';

const STORAGE_KEY = 'dunesday_survival_checklist_v1';

// Map data store categories cleanly into the 3 operational readiness pillars
const mapItemToDisplayCategory = (
  item: SurvivalChecklistItem
): Exclude<DisplayCategory, 'All'> => {
  switch (item.category) {
    case 'Ocular & Auditory':
    case 'Ergonomics & Thermal':
      // Separate physical exercises/eye care from wearable gear
      if (
        item.id === 'circulation-venous-reset' ||
        item.id === 'preservative-free-lubricant'
      ) {
        return 'Physical Preparation';
      }
      return 'Gear & Comfort';
    case 'Metabolic & Hydration':
    case 'Themed Rations':
      return 'Nutrition & Timing';
    default:
      return 'Gear & Comfort';
  }
};

export const SurvivalChecklist: React.FC<SurvivalChecklistProps> = ({
  themeMode = 'split',
}) => {
  // Initialize state from localStorage or defaultChecked flags
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage is blocked
    }
    const initial: Record<string, boolean> = {};
    SURVIVAL_ITEMS.forEach((item) => {
      if (item.defaultChecked) {
        initial[item.id] = true;
      }
    });
    return initial;
  });

  const [activeCategory, setActiveCategory] = useState<DisplayCategory>('All');
  const [expandedRationaleId, setExpandedRationaleId] = useState<string | null>(
    null
  );

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkAll = () => {
    const all: Record<string, boolean> = {};
    SURVIVAL_ITEMS.forEach((item) => {
      all[item.id] = true;
    });
    setCheckedIds(all);
  };

  const resetAll = () => {
    setCheckedIds({});
  };

  // Compute readiness percentage & status rank
  const stats = useMemo(() => {
    const total = SURVIVAL_ITEMS.length;
    const completed = SURVIVAL_ITEMS.filter((item) => checkedIds[item.id]).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    let rankLabel = 'UNPREPARED OFF-WORLDER';
    let rankColor = 'text-amber-400';

    if (percentage === 100) {
      rankLabel = 'FEDAYKIN × LATVERIAN SOVEREIGN';
      rankColor = 'text-latveria-plasma';
    } else if (percentage >= 70) {
      rankLabel = 'DESERT & INCURSION VETERAN';
      rankColor = 'text-arrakis-sand';
    } else if (percentage >= 40) {
      rankLabel = 'INITIATE ACOLYTE';
      rankColor = 'text-zinc-200';
    }

    return { total, completed, percentage, rankLabel, rankColor };
  }, [checkedIds]);

  // Filter items by selected display category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return SURVIVAL_ITEMS;
    return SURVIVAL_ITEMS.filter(
      (item) => mapItemToDisplayCategory(item) === activeCategory
    );
  }, [activeCategory]);

  const categories: {
    name: DisplayCategory;
    icon: React.ReactNode;
    count: number;
  }[] = [
    {
      name: 'All',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      count: SURVIVAL_ITEMS.length,
    },
    {
      name: 'Physical Preparation',
      icon: <HeartPulse className="h-3.5 w-3.5" />,
      count: SURVIVAL_ITEMS.filter(
        (i) => mapItemToDisplayCategory(i) === 'Physical Preparation'
      ).length,
    },
    {
      name: 'Gear & Comfort',
      icon: <Headphones className="h-3.5 w-3.5" />,
      count: SURVIVAL_ITEMS.filter(
        (i) => mapItemToDisplayCategory(i) === 'Gear & Comfort'
      ).length,
    },
    {
      name: 'Nutrition & Timing',
      icon: <Apple className="h-3.5 w-3.5" />,
      count: SURVIVAL_ITEMS.filter(
        (i) => mapItemToDisplayCategory(i) === 'Nutrition & Timing'
      ).length,
    },
  ];

  return (
    <section
      id="survival"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Top Header & Readiness Progress Card */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-latveria-plasma/30 bg-latveria-950/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-latveria-plasma">
              <ShieldCheck className="h-3.5 w-3.5" />
              STILLSUIT & ARMOR TELEMETRY // ENDURANCE KIT
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dunesday Survival Checklist
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Six hours in a pressurized IMAX or Dolby auditorium tests ocular
              tear-film stability, lumbar discs, and glycemic balance. Verify
              your loadout before showtime.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={checkAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-zinc-900 px-3.5 py-2 font-mono text-xs font-medium text-zinc-200 hover:border-latveria-plasma/50 hover:text-white transition-all"
            >
              <CheckCheck className="h-4 w-4 text-latveria-plasma" />
              Mark All Ready
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/50 px-3.5 py-2 font-mono text-xs text-zinc-400 hover:border-white/25 hover:text-zinc-200 transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear Kit
            </button>
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                COMBAT & DESERT READINESS:
              </span>
              <span
                className={`font-mono text-xs font-bold uppercase tracking-widest ${stats.rankColor}`}
              >
                {stats.rankLabel}
              </span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">
              {stats.percentage}%{' '}
              <span className="text-xs font-normal text-zinc-400">
                ({stats.completed}/{stats.total} equipped)
              </span>
            </div>
          </div>

          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-zinc-900 p-0.5 border border-white/10">
            <div
              style={{ width: `${stats.percentage}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                themeMode === 'desert'
                  ? 'bg-gradient-to-r from-arrakis-ochre via-arrakis-spice to-arrakis-sand'
                  : themeMode === 'doom'
                  ? 'bg-gradient-to-r from-latveria-emerald to-latveria-plasma'
                  : 'bg-gradient-to-r from-arrakis-spice via-amber-400 to-latveria-plasma'
              }`}
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs transition-all ${
                  isActive
                    ? 'border-arrakis-sand bg-arrakis-sand/15 text-white shadow-sm'
                    : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Checklist Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredItems.map((item) => {
            const isChecked = !!checkedIds[item.id];
            const displayCat = mapItemToDisplayCategory(item);
            const isExpanded = expandedRationaleId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all select-none ${
                  isChecked
                    ? 'border-latveria-plasma/45 bg-gradient-to-br from-latveria-950/40 via-zinc-900/90 to-zinc-950 shadow-doom-sm'
                    : 'border-white/10 bg-zinc-900/40 hover:border-white/25 hover:bg-zinc-900/70'
                }`}
              >
                <div>
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                        {item.codeTag}
                      </span>
                      <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                        {displayCat}
                      </span>
                    </div>

                    {/* Priority Badge */}
                    <span
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        item.priority === 'CRITICAL'
                          ? 'bg-arrakis-spice/20 text-arrakis-spice border border-arrakis-spice/30'
                          : item.priority === 'HIGH'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-latveria-plasma/15 text-latveria-plasma border border-latveria-plasma/30'
                      }`}
                    >
                      {item.priority === 'CRITICAL' && (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {item.priority}
                    </span>
                  </div>

                  {/* Title & Checkbox */}
                  <div className="mt-3 flex items-start gap-3.5">
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 text-latveria-plasma" />
                      ) : (
                        <Square className="h-5 w-5 text-zinc-500 group-hover:text-zinc-300" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-base font-bold transition-colors ${
                          isChecked
                            ? 'text-white line-through decoration-latveria-plasma/60'
                            : 'text-zinc-100'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pro Tip & Expandable Scientific Rationale */}
                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-zinc-400">
                      DEPLOY:{' '}
                      <strong className="text-arrakis-sand">
                        {item.deploymentWindow}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedRationaleId(isExpanded ? null : item.id);
                      }}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-300 hover:text-white underline decoration-white/30"
                    >
                      <Info className="h-3 w-3 text-arrakis-sand" />
                      {isExpanded ? 'Hide Science' : 'Why It Matters'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 space-y-2 rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-zinc-300"
                    >
                      <p>
                        <strong className="font-mono uppercase text-arrakis-sand">
                          Physiological Rationale:{' '}
                        </strong>
                        {item.scientificRationale}
                      </p>
                      <p className="text-zinc-400">
                        <strong className="font-mono uppercase text-latveria-plasma">
                          Field Pro-Tip:{' '}
                        </strong>
                        {item.proTip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SurvivalChecklist;