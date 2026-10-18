// ============================================================================
// TYPE DEFINITIONS & INTERFACES
// ============================================================================

export type ThemeViewMode = 'desert' | 'doom' | 'split';
export type WatchOrderMode = 'desert-first' | 'doom-first';

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  actor: string;
  allegiance: string;
  status: string;
  psychologicalProfile: string;
  narrativeRole: string;
  signatureQuote: string;
}

export interface LorePillar {
  id: string;
  codeName: string;
  title: string;
  subtitle: string;
  summary: string;
  deepDive: string[];
  keyImplications: string[];
}

export interface FactionConspirator {
  name: string;
  representative: string;
  agenda: string;
  leverage: string;
}

export interface MovieDossier {
  id: 'dune-messiah' | 'avengers-doomsday';
  title: string;
  subtitle: string;
  director: string;
  composers: string;
  estimatedRuntimeMinutes: number;
  aspectRatio: string;
  inUniverseTimeline: string;
  classificationCode: string;
  logline: string;
  executiveBriefing: string[];
  corePillars: LorePillar[];
  keyCharacters: CharacterProfile[];
  conspiracyOrAlignmentMatrix: FactionConspirator[];
  criticalWatchPreparation: string[];
}

export interface ThematicComparisonRow {
  id: string;
  category: string;
  axisTitle: string;
  coreQuestion: string;
  paulAtreidesPerspective: {
    header: string;
    analysis: string;
    artifactOrMechanism: string;
  };
  victorVonDoomPerspective: {
    header: string;
    analysis: string;
    artifactOrMechanism: string;
  };
  convergenceSynthesis: string;
}

export interface FormatComparisonItem {
  id: string;
  name: string;
  badge: string;
  aspectRatio: string;
  resolutionAndProjection: string;
  audioArchitecture: string;
  visualRating: number; // Out of 10
  audioRating: number; // Out of 10
  enduranceComfortRating: number; // Out of 10 (crucial for a 6+ hour double bill)
  bestForMovie: 'Dune: Part Three' | 'Avengers: Doomsday' | 'Both Equally';
  technicalBreakdown: string;
  pros: string[];
  cons: string[];
  seatSelectionTactic: string;
}

export interface SurvivalChecklistItem {
  id: string;
  category: 'Ocular & Auditory' | 'Metabolic & Hydration' | 'Ergonomics & Thermal' | 'Themed Rations';
  title: string;
  codeTag: string;
  priority: 'CRITICAL' | 'HIGH' | 'TACTICAL';
  deploymentWindow: 'Pre-Show' | 'Act II Midpoint' | 'Intermission Bridge' | 'Final Hour';
  description: string;
  scientificRationale: string;
  proTip: string;
  defaultChecked?: boolean;
}

// ============================================================================
// 1. DUNE: PART THREE (DUNE MESSIAH) DOSSIER
// ============================================================================

export const DUNE_DOSSIER: MovieDossier = {
  id: 'dune-messiah',
  title: 'DUNE: PART THREE',
  subtitle: 'THE MESSIAH CHRONICLES // IMPERIAL ARCHIVE 10,203 A.G.',
  director: 'Denis Villeneuve',
  composers: 'Hans Zimmer',
  estimatedRuntimeMinutes: 168,
  aspectRatio: '1.43:1 (IMAX 70mm & Dual Laser) / 2.39:1',
  inUniverseTimeline: '12 Years After the Battle of Arrakeen (10,203 A.G.)',
  classificationCode: 'ARRAKIS-OMEGA-99 // EYES OF IBAD CLEARANCE',
  logline:
    'Twelve years into the Muad\'Dib Jihad, Emperor Paul Atreides sits atop a golden throne built on sixty-one billion corpses, trapped within the suffocating prison of his own infallibility as an interstellar cabal engineers his undoing.',
  executiveBriefing: [
    'Victory on the plains of Arrakeen was not the triumph of House Atreides; it was the ignition of an unstoppable cosmic wildfire. Over the past twelve standard years, the Fremen Qizarate—Paul Muad\'Dib\'s missionary and military legions—have swept across the Known Universe. Sixty-one billion lives have been extinguished, ninety planets sterilized completely, and five hundred worlds demoralized into absolute theological submission.',
    'Arrakis itself is transforming. Ecological terraforming initiated by Liet-Kynes and accelerated by Imperial decree has brought open water canals and greenery to the northern latitudes, threatening the deep-desert life cycle of Shai-Hulud. At the center of Arrakeen stands the Grand Keep of Alia and Paul: a megalithic citadel dwarfing every human structure in history, explicitly designed to make galactic petitioners feel microscopic.',
    'Yet the God-Emperor is hollow. Paul\'s spice-saturated prescience no longer grants him liberation; it locks him onto a single, agonizing railroad track of time where any deviation results in an even worse cataclysm for humanity—and a brutal, lingering death for Chani.',
  ],
  corePillars: [
    {
      id: 'jihad-aftermath',
      codeName: 'PROTOCOL // SIXTY-ONE BILLION',
      title: 'The 12-Year Holy War & The Imperial Machine',
      subtitle: 'When liberation metastasizes into bureaucratic theocracy',
      summary:
        'The honorable Fremen desert survivalists have become bloated imperial conquerors, traumatized by alien oceans and corrupted by off-world spoils.',
      deepDive: [
        'Paul compares his own legacy to the worst tyrants of Old Terra—Genghis Khan and Adolf Hitler—except their death tolls look like statistical rounding errors next to the green and black banners of House Atreides. The Jihad was never controllable once Paul claimed the mantle of the Lisan al-Gaib.',
        'Veterans of the Jihad now wander the streets of Arrakeen with prosthetic limbs and shattered psyches, haunted by the sight of vast oceans on conquered worlds like Caladan and Lankiveil. Meanwhile, the Qizarate priesthood led by Korba codifies Paul\'s every breath into dogma, turning rebellion into state-enforced orthodoxy.',
      ],
      keyImplications: [
        'Stilgar is forced to function as an Imperial Chancellor rather than a Naib, torn between ancient desert honor and statecraft.',
        'Ecological terraforming on Arrakis begins poisoning the sandtrout vectors, signaling the future scarcity of melange.',
      ],
    },
    {
      id: 'prescience-trap',
      codeName: 'PARADOX // THE ORACLE\'S PRISON',
      title: 'The Burden of Absolute Prescience',
      subtitle: 'To know the future completely is to become its slave',
      summary:
        'Paul does not merely predict the future; by observing a timeline with his Kwisatz Haderach consciousness, he collapses quantum possibilities and locks that exact timeline into stone.',
      deepDive: [
        'In Dune: Part Three, prescience is framed as an existential horror. Paul sees every assassination attempt, every betrayal within his court, and the exact moment Chani will die in childbirth. Why doesn\'t he stop it? Because in every alternate branch of the time-stream where Chani survives, she is captured, tortured, or used as a pawn by his enemies in ways far more monstrous.',
        'Furthermore, the Spacing Guild Navigators—who rely on limited prescience to fold space—generate "temporal nexus blindspots" around themselves. By placing a Guild Navigator inside a conspiracy room, Paul\'s enemies can plot in a fog that even the Kwisatz Haderach cannot penetrate.',
      ],
      keyImplications: [
        'Paul walks willingly toward physical blindness (the Stone Burner attack), testing whether he can navigate the world solely through the pre-calculated memory of his vision.',
        'Sets the stage for the "Golden Path" that Paul refuses to bear, passing the terrible mantle to his unborn children, Leto II and Ghanima.',
      ],
    },
    {
      id: 'tleilaxu-conspiracy',
      codeName: 'VECTOR // AXOLOTL REBIRTH',
      title: 'The Four-Power Conspiracy & The Tleilaxu',
      subtitle: 'A psychological weapon wearing the face of a dead friend',
      summary:
        'Unable to defeat Paul militarily, the Bene Gesserit, Spacing Guild, Imperial House Corrino, and Bene Tleilax forge a clandestine alliance to shatter him from within.',
      deepDive: [
        'The Bene Tleilax (Tleilaxu) are genetic fanatics and masters of biological engineering who view the rest of humanity as "Powindah" (infidels). Their most insidious creation is the "ghola"—a flesh-and-bone reconstruction grown in sinister Axolotl tanks from the preserved cadaver cells of a deceased person.',
        'They gift Paul "Hayt," a resurrected ghola of his beloved mentor and swordmaster, Duncan Idaho, fitted with hypnotic metallic Tleilaxu eyes and Mentat-Zensunni conditioning. Hayt is a Trojan horse: designed first to destabilize Paul\'s emotional equilibrium through philosophical questioning, and second, implanted with a buried sub-vocal trigger command to murder Paul at the moment of his deepest grief.',
      ],
      keyImplications: [
        'Introduces Scytale, a Tleilaxu Face Dancer capable of fluidly morphing his cellular structure, voice, and bone geometry to impersonate anyone in Arrakeen.',
        'Tests whether genetic memory can awaken the original soul of Duncan Idaho against irreversible Tleilaxu conditioning.',
      ],
    },
  ],
  keyCharacters: [
    {
      id: 'paul-atreides',
      name: 'Paul Atreides (Muad\'Dib)',
      title: 'Emperor of the Known Universe // Usul',
      actor: 'Timothée Chalamet',
      allegiance: 'House Atreides (Disillusioned)',
      status: 'Omniscient Prisoner of the Throne',
      psychologicalProfile:
        'Crushed by cosmic exhaustion. Unlike the vengeful warlord who seized the throne at the end of Part Two, this Paul is detached, melancholic, and desperate to dismantle his own mythos without triggering a galactic dark age.',
      narrativeRole:
        'Must walk a razor-thin tightrope between protecting Chani for as long as time permits, exposing the Qizarate\'s corruption, and escaping the golden cage via desert exile.',
      signatureQuote: 'There is no escape—we pay for the violence of our ancestors.',
    },
    {
      id: 'chani',
      name: 'Chani Kynes',
      title: 'Fedaykin Commander // Sihaya of the Deep Desert',
      actor: 'Zendaya',
      allegiance: 'Fundamentalist Free Fremen / Paul (Reluctant)',
      status: 'Skeptical Resistance Anchor',
      psychologicalProfile:
        'Fiercely independent and disgusted by the sycophantic Imperial court in Arrakeen. Following Denis Villeneuve\'s divergence in Part Two, Chani represents the conscience of the old desert Fremen who refuse to worship a foreign messiah.',
      narrativeRole:
        'Reconciles with Paul the man while despising Muad\'Dib the Emperor; her pregnancy with twins becomes the central ticking clock of the entire narrative.',
      signatureQuote: 'You promised us our desert, Usul. Instead, you gave us an empire of graves.',
    },
    {
      id: 'princess-irulan',
      name: 'Princess Irulan Corrino',
      title: 'Imperial Consort // Bene Gesserit Adept',
      actor: 'Florence Pugh',
      allegiance: 'Bene Gesserit Sisterhood / House Corrino / House Atreides',
      status: 'Conspirator in a Loveless Political Marriage',
      psychologicalProfile:
        'Brilliant, proud, and deeply humiliated by her status as a purely administrative wife denied the Imperial heir. Caught between her orders from Reverend Mother Gaius Helen Mohiam and her growing awe—and pity—for Paul.',
      narrativeRole:
        'Secretly administers contraceptive regimens to stall an unapproved Atreides bloodline while acting as the reluctant bridge between the Sisterhood and the conspirators.',
      signatureQuote: 'I am the chronicler of a god who wishes he were dead.',
    },
    {
      id: 'hayt-duncan-idaho',
      name: 'Hayt (Duncan Idaho Ghola)',
      title: 'Tleilaxu Gift // Mentat-Zensunni Philosopher',
      actor: 'Jason Momoa',
      allegiance: 'Bene Tleilax (Programmed) / House Atreides (Latent)',
      status: 'Biological Trojan Horse',
      psychologicalProfile:
        'Serene, eerie, and clinical. Possesses no conscious episodic memories of his first life as Duncan Idaho, yet exhibits the exact muscle memory, cadence, and fierce protective instincts that haunt Paul and Alia.',
      narrativeRole:
        'The emotional heart of the third act; his internal war against Tleilaxu compulsion determines the fate of the Atreides twins.',
      signatureQuote: 'They took my flesh from the rocks of Arrakis, my Lord. Whether they took my soul remains to be seen.',
    },
    {
      id: 'alia-atreides',
      name: 'Alia Atreides',
      title: 'St. Alia of the Knife // Pre-Born Regent',
      actor: 'Anya Taylor-Joy',
      allegiance: 'House Atreides',
      status: 'Awakened Abomination',
      psychologicalProfile:
        'Born with full Reverend Mother genetic memory in the womb after Jessica drank the Water of Life. She possesses the ancient wisdom of ten thousand ancestors inside a young body, viewing normal human speech as agonizingly slow.',
      narrativeRole:
        'Commands the fanatical religious temple in Arrakeen while experiencing her own terrifying visions and magnetic attraction toward Hayt.',
      signatureQuote: 'Before I knew how to walk, I knew how a thousand emperors died.',
    },
  ],
  conspiracyOrAlignmentMatrix: [
    {
      name: 'The Bene Gesserit Sisterhood',
      representative: 'Reverend Mother Gaius Helen Mohiam & Princess Irulan',
      agenda: 'Salvage the 90-generation Kwisatz Haderach breeding program and prevent wild Atreides genes from escaping Sisterhood control.',
      leverage: 'Access to the Imperial bedchamber, Truthsayer monopoly, and covert biochemical manipulation.',
    },
    {
      name: 'The Spacing Guild',
      representative: 'Edric (Third-Stage Guild Navigator)',
      agenda: 'Break Paul\'s stranglehold on the Spice Melange supply that holds interstellar commerce hostage.',
      leverage: 'Prescient anti-oracle shielding; anywhere Edric floats in his orange gas tank, Paul\'s visions go completely dark.',
    },
    {
      name: 'The Bene Tleilax (Tleilaxu)',
      representative: 'Scytale (Face Dancer Master)',
      agenda: 'Prove they can manufacture their own Kwisatz Haderach and force Paul to trade his empire for a resurrected ghola of Chani.',
      leverage: 'Axolotl tank resurrection technology, cellular shapeshifting, and the conditioned ghola Hayt.',
    },
    {
      name: 'Fremen Qizarate Rebels',
      representative: 'Korba the Panegyrist & Otheym',
      agenda: 'Martyr Paul Muad\'Dib into an eternal, unquestionable god so the priesthood can rule unopposed—or restore old desert purity.',
      leverage: 'Smuggled atomic Stone Burners and insider knowledge of Arrakeen security routines.',
    },
  ],
  criticalWatchPreparation: [
    'Understand what a "Stone Burner" is: an atomic subterranean weapon licensed under extreme taboo that emits "J-Rays," burning out optic nerves instantly while cracking planetary crusts.',
    'Note the distinction between a Ghola (reconstructed from dead tissue in Axolotl tanks, like Hayt) and a Face Dancer (a shape-shifting genetic mimic, like Scytale).',
    'Listen closely to Hans Zimmer\'s score shifts: the triumphant brass of Part Two decays into dissonant, haunting choral lamentations and metallic Tleilaxu clicks.',
  ],
};

// ============================================================================
// 2. AVENGERS: DOOMSDAY DOSSIER
// ============================================================================

export const DOOMSDAY_DOSSIER: MovieDossier = {
  id: 'avengers-doomsday',
  title: 'AVENGERS: DOOMSDAY',
  subtitle: 'LATVERIAN SOVEREIGN DECREE // MULTIVERSAL INCURSION FILE 616-838',
  director: 'Anthony & Joe Russo',
  composers: 'Alan Silvestri',
  estimatedRuntimeMinutes: 175,
  aspectRatio: '1.90:1 (IMAX Digital & Laser) / 2.39:1',
  inUniverseTimeline: 'Final Phase of the Multiverse Saga // Pre-Battleworld Collapse',
  classificationCode: 'DOOM-PROTOCOL-001 // LATVERIA SUPREME',
  logline:
    'As cascading multiversal Incursions annihilate parallel Earths across the cosmos, Victor von Doom steps out of the shadows—not to conquer a dying reality, but to mercy-kill the chaos of free will and forge a single surviving world in his own iron image.',
  executiveBriefing: [
    'The Multiverse is experiencing terminal structural failure. Following the destruction of the Sacred Timeline\'s loom and the unchecked proliferation of branched realities, universes are colliding in events known as "Incursions." When two universes drift into the same cosmic coordinates, their respective Earths serve as the impact point: unless one Earth is utterly destroyed within hours, both entire universes cease to exist.',
    'While fractured factions of Avengers, the Fantastic Four, and the Thunderbolts scramble with inadequate morality and divided leadership, one man has been calculating the end of all things for years: Victor von Doom. Combining hyper-advanced Latverian technocracy with forbidden elder mysticism, Doom rejects the heroes\' sentimental refusal to make hard choices.',
    'Wearing a face that haunts the memory of Earth-616\'s greatest martyr, Victor von Doom views himself as the only true savior in existence. To save life itself from total oblivion, he will steal the power of cosmic architects, harvest dying shards of reality, and weld them together into Battleworld.',
  ],
  corePillars: [
    {
      id: 'doom-philosophy',
      codeName: 'DOCTRINE // IRON SALVATION',
      title: 'The Architecture of Victor von Doom',
      subtitle: 'Arrogance backed by terrifying competence',
      summary:
        'Doom is not a nihilist like Thanos who wants to cull half of life, nor a conqueror like Kang seeking dominion over time; Doom is an absolutist perfectionist who believes humanity is incapable of governing its own survival.',
      deepDive: [
        'In Doom\'s worldview, every catastrophe across the multiverse stems from chaotic individualism and the short-sightedness of so-called "heroes." When Tony Stark snapped his fingers, he died saving one timeline while inadvertently destabilizing the cosmic balance. Victor von Doom operates without hesitation, uniting quantum physics, titanium-alloy armor smithing, and dark dimensional sorcery.',
        'His mask is not merely protection for scarred flesh; it is a monument to iron discipline. In Latveria, there is zero poverty, zero crime, and zero war—because there is only Doom\'s will. Now, he intends to scale the Latverian model across the entire surviving cosmos.',
      ],
      keyImplications: [
        'Emotional psychological warfare: Heroes of Earth-616 must confront a ruthless sovereign who mirrors the visage of Tony Stark yet despises everything Stark stood for.',
        'Doom treats Reed Richards not just as an intellectual rival, but as the embodiment of failed idealistic science.',
      ],
    },
    {
      id: 'incursion-mechanics',
      codeName: 'TELEMETRY // RED SKIES CONVERGENCE',
      title: 'The Physics & Morality of Incursions',
      subtitle: 'Two Earths in the sky; eight hours until double extinction',
      summary:
        'An Incursion shrinks the entire multiverse down to an impossible trolley problem: become a planetary mass murderer, or allow two entire universes to evaporate into white void.',
      deepDive: [
        'When an Incursion begins, the sky turns blood-red (or shifts spectrum depending on the atmospheric resonance) as a parallel Earth materializes in upper orbit. The "Incursion Zone"—the small geographic footprint where the two planets begin phasing into one another—becomes the ultimate battlefield.',
        'Traditional Avengers morality ("We don\'t trade lives") collapses immediately under Incursion mathematics. While Captain America and Spider-Man struggle with the ethics of destroying another populated Earth to save their own, Doom has already mapped the decay chain and begun systematically harvesting the energy signatures of collapsing realities.',
      ],
      keyImplications: [
        'Pits heroic factions against each other: those willing to detonate antimatter bombs on alternate Earths vs. those fighting to find an impossible third option.',
        'Directly threatens Loki\'s Yggdrasil World Tree at the Citadel at the End of Time.',
      ],
    },
    {
      id: 'battleworld-foundation',
      codeName: 'GENESIS // PROJECT BATTLEWORLD',
      title: 'The Forging of Battleworld',
      subtitle: 'When the multiverse dies, only the patchwork throne remains',
      summary:
        'Avengers: Doomsday is structurally the "Infinity War" of the Multiverse Saga—a catastrophic crescendo designed to end with the death of the old multiverse and the birth of God Emperor Doom\'s realm.',
      deepDive: [
        'Rather than stopping the final Incursion the way the heroes hope, Doom executes a grand heist against the cosmic mechanisms holding reality together (drawing from Jonathan Hickman\'s landmark 2015 "Time Runs Out" and "Secret Wars" runs). By harnessing the raw creative energy of the multiverse\'s anchor beings and cosmic conduits, Doom salvages fragments of dozens of destroyed Earths.',
        'These salvaged territories—Latverion, remnants of 616 New York, the retro-futuristic 1960s Manhattan of the Fantastic Four, wasteland domains—are fused into a single toroidal patchwork planet lit by a forged sun: Battleworld, where Doom reigns supreme.',
      ],
      keyImplications: [
        'Life Raft survival pods become the only way for a tiny remnant of un-brainwashed heroes to remember the old universe.',
        'Concludes on a monumental cliffhanger leading directly into Avengers: Secret Wars.',
      ],
    },
  ],
  keyCharacters: [
    {
      id: 'victor-von-doom',
      name: 'Victor von Doom (Doctor Doom)',
      title: 'Monarch of Latveria // Architect of Salvation',
      actor: 'Robert Downey Jr.',
      allegiance: 'House of Doom / Latveria Supreme',
      status: 'Prime Multiversal Catalyst',
      psychologicalProfile:
        'Supremely regal, ruthlessly pragmatic, and utterly convinced of his own righteousness. He never raises his voice in anger because he views everyone in the room as children playing with matches inside a powder keg.',
      narrativeRole:
        'The de facto protagonist of the film. Much like Thanos in Infinity War, the narrative tracks Doom\'s relentless crusade to acquire the multiversal pieces required to prevent total void collapse.',
      signatureQuote: 'You call it tyranny because you lack the spine required for survival. There is only Doom.',
    },
    {
      id: 'reed-richards',
      name: 'Reed Richards (Mister Fantastic)',
      title: 'Director of the Future Foundation // Earth-828',
      actor: 'Pedro Pascal',
      allegiance: 'The Fantastic Four',
      status: 'Displaced Multiversal Scientist',
      psychologicalProfile:
        'Burdened by hyper-intelligence and the guilt of failing to prevent his native retro-futuristic universe\'s initial incursion event. He believes every problem has a mathematical solution—until he encounters Doom\'s marriage of science and black magic.',
      narrativeRole:
        'Doom\'s ideological foil. Their philosophical and tactical duel over how to solve the Incursion crisis forms the intellectual spine of the film.',
      signatureQuote: 'Victor doesn\'t want to fix the equation, Sue. He wants to rewrite the laws of mathematics so every answer equals him.',
    },
    {
      id: 'sam-wilson',
      name: 'Sam Wilson (Captain America)',
      title: 'Leader of the Earth-616 Avengers',
      actor: 'Anthony Mackie',
      allegiance: 'The Avengers (Earth-616)',
      status: 'Frontline Tactical Commander',
      psychologicalProfile:
        'Grounded, empathetic, and fiercely committed to preserving humanity\'s moral soul even when cosmic gods and geniuses insist morality is a luxury they can no longer afford.',
      narrativeRole:
        'Must unite a fractured, dysfunctional assembly of Earth-616 heroes and off-world allies when the sky cracks open over Manhattan.',
      signatureQuote: 'The moment we decide which Earth deserves to burn, we\'ve already lost everything worth saving.',
    },
    {
      id: 'stephen-strange',
      name: 'Dr. Stephen Strange',
      title: 'Master of the Mystic Arts // Black Priests Conduit',
      actor: 'Benedict Cumberbatch',
      allegiance: 'Clea / The Multiversal Preservation Front',
      status: 'Corrupted by Dark Dimension Incursion Tracking',
      psychologicalProfile:
        'Hardened by his time in the Dark Dimension with Clea fixing prior incursions. Strange is one of the few 616 heroes who understands the terrifying scale of what is coming—and why Doom\'s methods might be the only functional ones.',
      narrativeRole:
        'Returns to Earth-616 with dire warnings, forced into an uneasy, perilous philosophical proximity with Victor von Doom\'s mystic-scientific gambit.',
      signatureQuote: 'I\'ve seen ten thousand universes turn to ash. Morality doesn\'t stop two planets from occupies the same space.',
    },
    {
      id: 'peter-parker',
      name: 'Peter Parker (Spider-Man)',
      title: 'The Forgotten Neighborhood Hero',
      actor: 'Tom Holland',
      allegiance: 'Earth-616 Street Level / The Avengers',
      status: 'Erased from Collective Memory',
      psychologicalProfile:
        'Isolated and battle-hardened since Doctor Strange\'s memory spell, carrying deep trauma that instantly resurfaces when he unmasks Victor von Doom and sees the face of his deceased mentor, Tony Stark.',
      narrativeRole:
        'The emotional anchor of the audience; his devastating confrontation with Doom weaponizes the legacy of Iron Man in the cruelest way imaginable.',
      signatureQuote: 'You have his face... how dare you wear his face?',
    },
  ],
  conspiracyOrAlignmentMatrix: [
    {
      name: 'The Sovereign State of Latveria',
      representative: 'Victor von Doom & The Doombots Legion',
      agenda: 'Accelerate controlled Incursion collapses to harvest cosmic tether energy and construct Battleworld under Doom\'s sole rule.',
      leverage: 'Hybrid techno-mystic armor, time-platform telemetry, and complete willingness to sacrifice trillions to save a remnant.',
    },
    {
      name: 'The Future Foundation (Earth-828)',
      representative: 'Reed Richards, Sue Storm, Johnny Storm & Ben Grimm',
      agenda: 'Construct Multiversal Life Rafts capable of surviving the white void between dying universes while seeking a non-lethal separation wave.',
      leverage: 'Bridge dimensional portals, Franklin/Valeria cosmic anomalies, and sub-space shielding.',
    },
    {
      name: 'Earth-616 Avengers & New Avengers (Thunderbolts*)',
      representative: 'Sam Wilson, Yelena Belova, Bucky Barnes & Shang-Chi',
      agenda: 'Defend Earth-616\'s incursion point from invading parallel variants and prevent Doom from seizing the Ten Rings and cosmic relics.',
      leverage: 'Vibranium war tech, ancient mystic artifacts (Ten Rings & Bangles), and boots-on-the-ground tactical cohesion.',
    },
    {
      name: 'The Citadel at the End of Time',
      representative: 'Loki (God of Stories) & TVA Remnants',
      agenda: 'Hold the dying branches of the Yggdrasil timeline tree together with raw willpower as Doom approaches the throne at the center of time.',
      leverage: 'Temporal Loom energy reserves and omniversal surveillance across all dying branches.',
    },
  ],
  criticalWatchPreparation: [
    'Revisit the post-credits scenes of The Fantastic Four: First Steps and Thunderbolts*—both directly feed into the arrival of the Excelsior ship in Earth-616 airspace.',
    'Keep track of "Anchor Beings" and cosmic artifacts (the Ten Rings, Ms. Marvel\'s Quantum Bands, and Loki\'s temporal branches), which serve as the structural MacGuffins replacing the Infinity Stones.',
    'Prepare for a stark tonal shift: the Russo Brothers structure Doomsday as a relentless geopolitical and cosmic thriller where the heroes are three steps behind Doom from frame one.',
  ],
};

// ============================================================================
// 3. THEMATIC MATRIX (PAUL ATREIDES VS. VICTOR VON DOOM)
// ============================================================================

export const THEMATIC_MATRIX: ThematicComparisonRow[] = [
  {
    id: 'prescience-vs-science',
    category: 'EPISTEMOLOGY OF CONTROL',
    axisTitle: 'Prescience vs. Techno-Mystic Omniscience',
    coreQuestion: 'How do you master a chaotic universe that resists human order?',
    paulAtreidesPerspective: {
      header: 'The Curse of the Kwisatz Haderach',
      analysis:
        'Paul accesses the fourth dimension through biological evolution and hyper-concentrated Spice Melange. He sees every branching path of history simultaneously, yet this total foresight paralyzes him. By looking at the future, he calcifies it—becoming a passenger in his own body.',
      artifactOrMechanism: 'The Water of Life & Melange Saturation (Eyes of Ibad)',
    },
    victorVonDoomPerspective: {
      header: 'The Fusion of Quantum Physics & Elder Sorcery',
      analysis:
        'Doom refuses to accept fate as predetermined. Where science hits a wall, he uses sorcery; where magic lacks precision, he builds titanium-grade particle accelerators. He models multiversal collapse mathematically and violently bends reality to fit his blueprint.',
      artifactOrMechanism: 'Latverian Time-Platform & Mystic Titanium Armor',
    },
    convergenceSynthesis:
      'Both men see further than anyone else alive, and both are completely isolated by that vision. Paul is horrified by the deterministic trap he sees; Doom is infuriated that anyone else dares to question his calculations.',
  },
  {
    id: 'savior-vs-dictator',
    category: 'POLITICAL THEOLOGY',
    axisTitle: 'The Reluctant Messiah vs. The Absolute Monarch',
    coreQuestion: 'Can humanity survive without a tyrant holding the reins?',
    paulAtreidesPerspective: {
      header: 'Emperor Muad\'Dib (The Trap of Worship)',
      analysis:
        'Paul never wanted to be a god, yet he weaponized Bene Gesserit Missionaria Protectiva superstitions for revenge and lost control of the fanaticism. Now he presides over a sprawling theocracy he secretly despises, Actively plotting to discredit his own religion.',
      artifactOrMechanism: 'The Qizarate Priesthood & The Grand Keep of Arrakeen',
    },
    victorVonDoomPerspective: {
      header: 'God Emperor Doom (The Duty of Supremacy)',
      analysis:
        'Doom openly demands absolute submission because he genuinely believes democracy and heroic idealism are suicide pacts. He does not hide behind false humility; he wears the iron crown proudly because, in his mind, only Doom has the stomach to save existence.',
      artifactOrMechanism: 'The Iron Mask & The Throne of Battleworld',
    },
    convergenceSynthesis:
      'Dunesday presents two sides of the authoritarian coin: Paul represents the tragedy of a liberator who becomes a dictator against his will, while Doom represents the terrifying efficacy of a dictator who actually succeeds where heroes fail.',
  },
  {
    id: 'cost-of-destiny',
    category: 'MORAL CALCULUS',
    axisTitle: 'The Utilitarian Nightmare & The Cost of Destiny',
    coreQuestion: 'How many billions are you willing to sacrifice to prevent total extinction?',
    paulAtreidesPerspective: {
      header: 'Sixty-One Billion Dead to Avoid a Worse Abyss',
      analysis:
        'Paul endures the horror of the Fremen Jihad because his prescience reveals that aborting it prematurely leads to the stagnation and total extinction of the human species. Yet when faced with the full terror of the "Golden Path" (becoming an immortal monster), he flinches out of love for Chani and his humanity.',
      artifactOrMechanism: 'The Golden Path & The Blind Exile into the Sand',
    },
    victorVonDoomPerspective: {
      header: 'Pruning Trillions to Salvage a Single World',
      analysis:
        'Confronted with the mathematical certainty that 100% of the multiverse will die in the Incursions, Doom does not flinch for a microsecond. He willingly destroys entire universes and murders cosmic beings to salvage a 0.001% remnant on Battleworld.',
      artifactOrMechanism: 'Incursion Antimatter Triggers & Multiversal Harvesting',
    },
    convergenceSynthesis:
      'Paul\'s tragedy is that he retains just enough human empathy to break under the weight of utilitarian genocide; Doom\'s terror is that he possesses the iron conviction to carry the equation all the way to zero.',
  },
  {
    id: 'mask-and-identity',
    category: 'ICONOGRAPHY & LOSS OF SELF',
    axisTitle: 'The Blinded Prophet vs. The Iron Visage',
    coreQuestion: 'What happens to the human face beneath the myth?',
    paulAtreidesPerspective: {
      header: 'Eyes Burned Out by Atomic Fire',
      analysis:
        'When the Stone Burner detonates, Paul loses his physical eyes—the iconic blue-within-blue Eyes of Ibad—yet continues to "see" everyone around him by locking himself tightly inside his pre-recorded prescient vision. Only when the vision ends does he become truly blind and finally free.',
      artifactOrMechanism: 'Charred Sockets & The Fremen Desert Blindfold',
    },
    victorVonDoomPerspective: {
      header: 'The Scarred Mirror of a Dead Hero',
      analysis:
        'Victor seals his face behind cold, expressionless titanium, severing himself from normal human vulnerability. For the heroes of Earth-616, the psychological blow is doubled: beneath the mask of their greatest existential threat lies the mirror image of Tony Stark.',
      artifactOrMechanism: 'Thermo-Forged Titanium Mask & Emerald Hood',
    },
    convergenceSynthesis:
      'In both epics, the loss of the human face marks the death of the mortal man and the ascension of an unstoppable archetype.',
  },
];

// ============================================================================
// 4. THEATER & FORMAT MATRIX
// ============================================================================

export const FORMAT_GUIDE: FormatComparisonItem[] = [
  {
    id: 'imax-70mm',
    name: 'IMAX 70mm Film (15-Perf)',
    badge: 'THE GOLD STANDARD // 1.43:1',
    aspectRatio: '1.43:1 (Full Vertical Expansion)',
    resolutionAndProjection: '15-perforation 70mm celluloid film strip running horizontally (~18K equivalent theoretical resolution)',
    audioArchitecture: '12-Channel Uncompressed Digital Surround + Sub-Bass Array (Custom IMAX Tuning)',
    visualRating: 10,
    audioRating: 9.5,
    enduranceComfortRating: 7.0,
    bestForMovie: 'Dune: Part Three',
    technicalBreakdown:
      'Denis Villeneuve and cinematographer Greig Fraser shot key sequences of Dune: Part Three specifically for the towering 1.43:1 frame. Seeing the Arrakeen Throne Room and the Stone Burner detonation on an 80-foot-tall 15/70mm celluloid screen provides an analog organic grain, dynamic range, and vertical scale that cannot be replicated at home. For Avengers: Doomsday (framed at 1.90:1), you will still get massive physical scale via digital laser switchover or DMR print.',
    pros: [
      'Unrivaled 1.43:1 towering aspect ratio reveals up to 40% more vertical image in Dune: Part Three.',
      'True photochemical analog warmth and highlight roll-off on Arrakis desert horizons.',
      'True event-cinema cultural atmosphere; every seat is filled with hardcore cinephiles.',
    ],
    cons: [
      'Extremely scarce globally (only ~30 commercial venues worldwide possess functional 15/70mm projectors).',
      'Traditional steep stadium seating in older IMAX GT auditoriums lacks plush recliners for a 6-hour marathon.',
      'Mechanical platter projection carries a rare ~1% risk of film sync hiccups.',
    ],
    seatSelectionTactic:
      'Book Row G, H, or J dead center (approximately two-thirds up the auditorium). Sitting in the front four rows of a 1.43:1 GT auditorium during a 343-minute double feature will cause severe cervical neck strain.',
  },
  {
    id: 'imax-dual-laser',
    name: 'IMAX GT Dual 4K Laser',
    badge: 'PRECISION TITAN // 1.43:1 & 1.90:1',
    aspectRatio: '1.43:1 (on GT Screens) & 1.90:1 Seamless',
    resolutionAndProjection: 'Dual 4K Laser Projection System with Anamorphic Prism Optics & High-Contrast Laser Light Engine',
    audioArchitecture: '12-Channel Next-Gen IMAX Immersive Sound with Overhead & Side Array Channels',
    visualRating: 9.8,
    audioRating: 9.8,
    enduranceComfortRating: 8.0,
    bestForMovie: 'Both Equally',
    technicalBreakdown:
      'The most balanced format for the complete Dunesday double bill. On a Grand Theatre (GT) screen, Dual Laser unlocks the exact same full 1.43:1 vertical expansion for Dune: Part Three as 70mm film, while delivering razor-sharp, high-nit digital contrast and saturated emerald plasma greens for Avengers: Doomsday\'s 1.90:1 multiversal sequences without changing projector assemblies.',
    pros: [
      'Delivers both 1.43:1 (Dune 3) and 1.90:1 (Doomsday) with peak digital brightness and zero flicker.',
      'Deep blacks and blinding specular highlights ideal for Doctor Doom\'s emerald arcane energy and Stone Burner flares.',
      'Upgraded 12-channel laser audio system handles Hans Zimmer\'s sub-bass and Alan Silvestri\'s brass with zero distortion.',
    ],
    cons: [
      'Slightly more clinical digital sharpness compared to the organic texture of 70mm celluloid.',
      'Must verify your theater is true "Dual Laser GT" (1.43:1 screen) and not "Single Laser" (capped at 1.90:1).',
    ],
    seatSelectionTactic:
      'Target the exact row aligned with the projection booth window, one to three seats off the dead-center aisle to optimize the 12-channel acoustic sweet spot.',
  },
  {
    id: 'dolby-cinema',
    name: 'Dolby Cinema (Vision + Atmos)',
    badge: 'CONTRAST & ENDURANCE KING',
    aspectRatio: '2.39:1 (Scope) or 1.85:1 (Venue Dependent)',
    resolutionAndProjection: 'Dual 4K Dolby Vision Christie Laser Projectors (1,000,000:1 Contrast Ratio, 31+ Foot-Lamberts)',
    audioArchitecture: 'Dolby Atmos 64+ Object-Based Overhead & Surround Speakers + Under-Seat Buttkicker Sub-Transducers',
    visualRating: 9.2,
    audioRating: 10.0,
    enduranceComfortRating: 10.0,
    bestForMovie: 'Avengers: Doomsday',
    technicalBreakdown:
      'If your back cannot survive six hours in rigid stadium seats, Dolby Cinema is your tactical sanctuary. While you sacrifice IMAX\'s expanded vertical aspect ratios (both films play in standard 2.39:1 widescreen), you gain the deepest true blacks in cinema history (critical for Dune\'s night scenes and Doom\'s space incursions), pinpoint 3D overhead Atmos object tracking, and plush powered recliners with built-in tactile bass transducers.',
    pros: [
      '1,000,000:1 contrast ratio renders true pitch-black darkness rather than gray projector wash.',
      'Dolby Atmos spatial audio separates the Voice of the Bene Gesserit and Doom\'s metallic footsteps across 360 degrees.',
      'Luxury powered recliners make a 6+ hour marathon physically effortless.',
    ],
    cons: [
      'Crops out the expanded 1.43:1 and 1.90:1 IMAX vertical framing on both films.',
      'Under-seat transducers can occasionally rattle if you place metallic water bottles in the cupholders.',
    ],
    seatSelectionTactic:
      'Choose Row D or E in the middle bank right behind the main handicap/crosswalk walkway so you can fully extend your footrest and exit for bio-breaks without stepping over 15 people.',
  },
  {
    id: '4dx-motion',
    name: '4DX Extreme Sensory Cinema',
    badge: 'CHAOS MARATHON // HIGH FATIGUE',
    aspectRatio: '2.39:1 Standard',
    resolutionAndProjection: 'Standard 2K/4K Digital Xenon or Single Laser Projection',
    audioArchitecture: 'Standard 5.1 / 7.1 Theatrical Surround',
    visualRating: 6.5,
    audioRating: 7.0,
    enduranceComfortRating: 3.5,
    bestForMovie: 'Avengers: Doomsday',
    technicalBreakdown:
      '4DX syncs hydraulic pitch/roll/heave motion seats with compressed air blasts, water mist, strobe lightning, scent diffusers, and back-ticklers. Riding a sandworm in Dune or experiencing a planetary Incursion in Doomsday feels like a theme park attraction—for the first 90 minutes. Attempting both films back-to-back in 4DX is an extreme physical endurance test that will leave you bruised and dehydrated.',
    pros: [
      'Unmatched visceral fun during sandworm sequences and multiversal zero-gravity combat.',
      'Pneumatic air blasts and wind fans genuinely keep you awake during late-night showtimes.',
    ],
    cons: [
      'Six hours of hydraulic thrashing will wreck your lower lumbar spine and spill any open beverages.',
      'Mechanical whirring of seat actuators drowns out quiet philosophical dialogue between Paul, Irulan, and Hayt.',
      'Inferior screen brightness and standard aspect ratio compared to IMAX and Dolby.',
    ],
    seatSelectionTactic:
      'Never book 4DX for BOTH halves of the double bill. If you crave the ride, do Avengers: Doomsday in 4DX first, then walk over to IMAX or Dolby Cinema for Dune: Part Three.',
  },
];

// ============================================================================
// 5. SURVIVAL CHECKLIST ITEMS
// ============================================================================

export const SURVIVAL_ITEMS: SurvivalChecklistItem[] = [
  {
    id: 'acoustic-attenuators',
    category: 'Ocular & Auditory',
    title: 'High-Fidelity Concert Earplugs (-15dB Flat Attenuation)',
    codeTag: 'AUDIO-SHIELD // ZIMMER-GRADE',
    priority: 'CRITICAL',
    deploymentWindow: 'Pre-Show',
    description:
      'Musician-grade acoustic filters (e.g., Loop Experience or Etymotic ER20XS) that lower decibel pressure without muffling dialogue clarity.',
    scientificRationale:
      'A combined 343+ minutes of IMAX 12-channel audio peaking at 105+ dB (Hans Zimmer\'s Bene Gesserit Voice bass drops + Russo Brothers\' Incursion explosions) triggers temporary threshold shift (auditory fatigue) and tension headaches by hour four.',
    proTip:
      'Insert them during the 25 minutes of loud pre-show trailers to save your eardrums, then decide during the opening logos whether your specific theater\'s calibration requires keeping them in.',
    defaultChecked: true,
  },
  {
    id: 'preservative-free-lubricant',
    category: 'Ocular & Auditory',
    title: 'Preservative-Free Single-Vial Lubricating Eye Drops',
    codeTag: 'OCULAR-IBAD // BLINK-RESTORE',
    priority: 'CRITICAL',
    deploymentWindow: 'Intermission Bridge',
    description:
      'Individual sterile vials of lipid-based or hyaluronate eye drops (avoid redness-relief vasoconstrictors).',
    scientificRationale:
      'Human blink rates drop by up to 66% when staring at high-contrast laser projection in air-conditioned dark auditoriums. By the middle of the second film, corneal dryness causes halo glare around bright subtitles and emerald/orange plasma effects.',
    proTip:
      'Administer one drop per eye outdoors in natural light during your intermission break between films—your eyes will feel reset for the second three-hour stretch.',
    defaultChecked: true,
  },
  {
    id: 'electrolyte-stillsuit-protocol',
    category: 'Metabolic & Hydration',
    title: 'High-Sodium Electrolyte Packet + Sip-Regulated Insulated Bottle',
    codeTag: 'STILLSUIT-HYDRO // WATER-DISCIPLINE',
    priority: 'CRITICAL',
    deploymentWindow: 'Pre-Show',
    description:
      '500ml water mixed with a sodium/potassium/magnesium electrolyte powder rather(than chugging a 64oz plain soda).',
    scientificRationale:
      'Plain water or diuretic caffeinated sodas pass rapidly through the kidneys, forcing an emergency restroom sprint right during the Stone Burner attack or Doom\'s unmasking. Sodium electrolytes promote cellular water retention and sustain cognitive alertness while minimizing bladder volume.',
    proTip:
      'Stop large fluid intake 75 minutes before the first movie starts; switch exclusively to small, controlled sips once the lights dim.',
    defaultChecked: false,
  },
  {
    id: 'glycemic-protein-ration',
    category: 'Metabolic & Hydration',
    title: 'Slow-Release Protein & Complex Carb Intermission Meal',
    codeTag: 'METABOLIC-CORE // ANTI-CRASH',
    priority: 'HIGH',
    deploymentWindow: 'Intermission Bridge',
    description:
      'A balanced meal or dense protein bar (nuts, roasted chickpeas, paneer/tofu wrap, or dark chocolate) between screenings instead of purely refined theater sugar.',
    scientificRationale:
      'Consuming a bucket of buttered popcorn and candy during Movie 1 triggers an insulin spike followed by reactive hypoglycemia (the dreaded sugar crash) exactly 45 minutes into Movie 2, virtually guaranteeing you will nod off during dialogue-heavy lore scenes.',
    proTip:
      'Save any caffeine hit (espresso or matcha) exclusively for the 30-minute intermission bridge before the second movie begins.',
    defaultChecked: false,
  },
  {
    id: 'lumbar-thermal-layer',
    category: 'Ergonomics & Thermal',
    title: 'Rollable Hoodie or Flannel (Dual Lumbar Pillow & Cryo-Shield)',
    codeTag: 'ARMOR-WEAVE // LUMBAR-LOCK',
    priority: 'HIGH',
    deploymentWindow: 'Act II Midpoint',
    description:
      'A heavyweight zip hoodie or structured overshirt that can be rolled into a cylinder behind your lower back or worn when theater HVAC drops.',
    scientificRationale:
      'Packed 400-seat IMAX auditoriums run their industrial chillers at maximum capacity to offset body heat. Furthermore, static sitting for nearly six hours flattens the natural lordotic curve of the L4-L5 vertebrae.',
    proTip:
      'Tuck the rolled hoodie horizontally into the small of your back during Movie 1, then wear it during Movie 2 when core body temperature naturally dips.',
    defaultChecked: false,
  },
  {
    id: 'circulation-venous-reset',
    category: 'Ergonomics & Thermal',
    title: '15-Minute Intermission Walk & Calf-Pump Protocol',
    codeTag: 'KINETIC-RESET // BLOOD-FLOW',
    priority: 'HIGH',
    deploymentWindow: 'Intermission Bridge',
    description:
      'Mandatory outdoor walk, hip-flexor stretches, and 30 standing calf raises between Film 1 and Film 2.',
    scientificRationale:
      'Six hours of seated knee flexion pools venous blood in the lower extremities and tightens the psoas muscles, causing restlessness and brain fog. A brisk 10-minute outdoor walk flushes lactic buildup and resets circadian dopamine.',
    proTip:
      'Do not sit in the theater lobby chairs during intermission—stay on your feet the entire break.',
    defaultChecked: false,
  },
  {
    id: 'themed-spice-doom-snacks',
    category: 'Themed Rations',
    title: 'Cinnamon-Cardamom Roasted Almonds & Pistachio Matcha Bites',
    codeTag: 'CULINARY-LORE // MELANGE-DOOM',
    priority: 'TACTICAL',
    deploymentWindow: 'Act II Midpoint',
    description:
      'Custom pocket rations: warm cinnamon-spiced almonds (Arrakis Melange tribute) paired with emerald pistachio/matcha dark chocolate squares (Latverian tribute).',
    scientificRationale:
      'Cinnamon and dark chocolate provide mild neuro-stimulant theobromine and olfactory engagement without noisy wrapper rustling during quiet IMAX sequences.',
    proTip:
      'Pre-transfer snacks out of crinkly commercial plastic bags into silent silicone stasher pouches before entering the auditorium.',
    defaultChecked: false,
  },
];

// ============================================================================
// 6. SCHEDULE PLANNER PRESETS & METADATA
// ============================================================================

export interface DoubleFeaturePreset {
  id: WatchOrderMode;
  name: string;
  tagline: string;
  firstMovieTitle: string;
  firstMovieRuntime: number;
  secondMovieTitle: string;
  secondMovieRuntime: number;
  strategicVerdict: string;
  psychologicalArc: string;
  recommendedIntermissionMinutes: number;
}

export const WATCH_ORDER_PRESETS: Record<WatchOrderMode, DoubleFeaturePreset> = {
  'desert-first': {
    id: 'desert-first',
    name: 'THE DESERT FIRST',
    tagline: 'Dune: Part Three → Avengers: Doomsday',
    firstMovieTitle: 'Dune: Part Three (Dune Messiah)',
    firstMovieRuntime: DUNE_DOSSIER.estimatedRuntimeMinutes,
    secondMovieTitle: 'Avengers: Doomsday',
    secondMovieRuntime: DOOMSDAY_DOSSIER.estimatedRuntimeMinutes,
    strategicVerdict:
      'The Cinephile\'s Optimal Progression. Tackle Denis Villeneuve\'s dense, slow-burn philosophical tragedy while your mind is at 100% cognitive sharpness, then ride the high-adrenaline multiversal spectacle of Avengers: Doomsday through the second half of the marathon.',
    psychologicalArc:
      'Starts with meditative dread, intricate political conspiracy, and tragic catharsis on Arrakis; transitions after intermission into kinetic ensemble warfare and cosmic escalation.',
    recommendedIntermissionMinutes: 45,
  },
  'doom-first': {
    id: 'doom-first',
    name: 'DOOM FIRST',
    tagline: 'Avengers: Doomsday → Dune: Part Three',
    firstMovieTitle: 'Avengers: Doomsday',
    firstMovieRuntime: DOOMSDAY_DOSSIER.estimatedRuntimeMinutes,
    secondMovieTitle: 'Dune: Part Three (Dune Messiah)',
    secondMovieRuntime: DUNE_DOSSIER.estimatedRuntimeMinutes,
    strategicVerdict:
      'The Spoiler-Shield & Midnight Existentialist Route. Ideal if you want to dodge opening-day MCU social media spoilers immediately, then descend into the hypnotic, dreamlike desert tragedy of Dune Messiah as night falls.',
    psychologicalArc:
      'Opens with explosive multiversal shockwaves and the rise of God Emperor Doom; closes with quiet, haunting spiritual devastation as Paul Atreides walks into the sand.',
    recommendedIntermissionMinutes: 50,
  },
};