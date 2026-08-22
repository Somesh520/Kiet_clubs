"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./CategoryWidgets.module.css";

// Helper to sanitize class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ─────────────────────────────────────────────────────────────────────────────
   1. CODING & CYBERSECURITY TERMINAL WIDGET
   ─────────────────────────────────────────────────────────────────────────── */
export function CodingWidget({ clubName }) {
  const [logs, setLogs] = useState([
    `$ kiet-admin --status`,
    `Initializing security sandbox...`,
    `Connected to ${clubName || "Terminal"}.`
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [logs]);

  const addLogWithDelay = async (newLogs) => {
    setIsTyping(true);
    for (let i = 0; i < newLogs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setLogs((prev) => [...prev, newLogs[i]]);
    }
    setIsTyping(false);
  };

  const handleCompile = () => {
    if (isTyping) return;
    setLogs((prev) => [...prev, "$ npm run build"]);
    addLogWithDelay([
      "▲ Next.js 16.2.6 (Turbopack)",
      "○ Creating production build...",
      "✓ Compiled 14 files successfully",
      "✓ Deployment optimized."
    ]);
  };

  const handleScan = () => {
    if (isTyping) return;
    setLogs((prev) => [...prev, "$ cybersec-check --all"]);
    addLogWithDelay([
      "[info] Auditing network ports...",
      "[warn] Port 8080 open (Dev server)",
      "[success] Firewall configuration secure",
      "[success] 0 vulnerabilities detected."
    ]);
  };

  const handleClear = () => {
    setLogs([`$ clear`, `Terminal session reset.`]);
  };

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalHeader}>
        <span>console@kiet:{clubName ? clubName.toLowerCase().replace(/\s+/g, "-") : "club"}</span>
        <span>bash 80x24</span>
      </div>
      <div className={styles.terminalOutput} ref={outputRef}>
        {logs.map((log, idx) => (
          <div key={idx} className={styles.terminalLine}>
            {log.startsWith("$") ? (
              <>
                <span className={styles.terminalPrompt}>$</span>
                {log.slice(2)}
              </>
            ) : (
              log
            )}
          </div>
        ))}
        {isTyping && <span className={styles.terminalCursor}></span>}
      </div>
      <div className={styles.terminalControls}>
        <button onClick={handleCompile} className={styles.terminalBtn} disabled={isTyping}>
          Compile
        </button>
        <button onClick={handleScan} className={styles.terminalBtn} disabled={isTyping}>
          Scan
        </button>
        <button onClick={handleClear} className={styles.terminalBtn}>
          Clear
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. MUSIC PLAYER WIDGET (SYNTHESIZER & EQUALIZER)
   ─────────────────────────────────────────────────────────────────────────── */
export function MusicWidget({ clubName, accentColor }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  const startSynth = () => {
    // Initialize Web Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Upbeat retro melody notes (frequency in Hz)
    const melody = [
      261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
      440.00, 349.23, 293.66, 392.00  // A4, F4, D4, G4
    ];
    let noteIndex = 0;

    // Synthesize notes periodically
    synthIntervalRef.current = setInterval(() => {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const freq = melody[noteIndex];
      noteIndex = (noteIndex + 1) % melody.length;

      // Create nodes
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle"; // Warm, non-harsh wave
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      // Smooth envelope to prevent audio pops
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      // Connect nodes
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Play and schedule stop
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }, 250); // Upbeat tempo
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <div className={styles.musicWrapper} style={{ "--accent-color": accentColor }}>
      <div className={styles.vinylContainer}>
        <div className={cn(styles.vinylRecord, isPlaying && styles.spinning)}></div>
      </div>
      <div className={styles.equalizer}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(styles.eqBar, isPlaying && styles.eqBarActive)}
            style={{
              height: isPlaying ? undefined : "6px",
            }}
          ></div>
        ))}
      </div>
      <button onClick={togglePlay} className={styles.playBtn}>
        {isPlaying ? (
          <>
            <span>■</span> Mute Jam
          </>
        ) : (
          <>
            <span>▶</span> Listen Jam
          </>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. DANCE FLOOR GRID WIDGET
   ─────────────────────────────────────────────────────────────────────────── */
export function DanceWidget({ accentColor }) {
  const [bpm, setBpm] = useState(130);
  const [activeCellIdxs, setActiveCellIdxs] = useState([]);

  useEffect(() => {
    const intervalMs = (60 / bpm) * 1000;
    const interval = setInterval(() => {
      // Pick 2-4 random cells to light up
      const cellsCount = Math.floor(Math.random() * 3) + 2;
      const newActive = [];
      while (newActive.length < cellsCount) {
        const idx = Math.floor(Math.random() * 8); // 8 cells grid
        if (!newActive.includes(idx)) {
          newActive.push(idx);
        }
      }
      setActiveCellIdxs(newActive);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [bpm]);

  // Vibrant neon color list
  const neonColors = ["#ec4899", "#06b6d4", "#a855f7", "#10b981", "#eab308"];

  return (
    <div className={styles.danceContainer} style={{ "--accent-color": accentColor }}>
      <div className={styles.danceFloor}>
        {[...Array(8)].map((_, i) => {
          const isActive = activeCellIdxs.includes(i);
          const randColor = neonColors[i % neonColors.length];
          return (
            <div
              key={i}
              className={styles.danceCell}
              style={{
                backgroundColor: isActive ? randColor : "#151515",
                boxShadow: isActive ? `0 0 10px ${randColor}` : "none",
                borderColor: isActive ? "#000" : "#222"
              }}
            ></div>
          );
        })}
      </div>
      <div className={styles.danceControls}>
        <span>SPEED (BPM): {bpm}</span>
        <input
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className={styles.bpmSlider}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. DRAMATICS STAGE & CURTAIN
   ─────────────────────────────────────────────────────────────────────────── */
export function DramaticsWidget() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const stageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={stageRef}
      className={cn(styles.theaterStage, curtainsOpen && styles.curtainsOpen)}
      onMouseMove={handleMouseMove}
    >
      <div
        className={styles.stageSpotlight}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      ></div>

      <div className={styles.curtainLeft}></div>
      <div className={styles.curtainRight}></div>

      <div className={styles.stageContent}>
        <div className={styles.stageMasks}>🎭</div>
        <strong>VPAKSH CREW</strong>
        <span style={{ fontSize: "0.65rem", marginTop: "4px", opacity: 0.8 }}>
          "All the world's a stage!"
        </span>
      </div>

      <button onClick={() => setCurtainsOpen(!curtainsOpen)} className={styles.stageBtn}>
        {curtainsOpen ? "Close Curtain" : "Part Curtain"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. CAMERA VIEWFINDER & LOGO FILTER
   ─────────────────────────────────────────────────────────────────────────── */
export function PhotographyWidget({ logoUrl, clubName }) {
  const [filter, setFilter] = useState("none"); // none, noir, cyberpunk, vintage
  const [isClicking, setIsClicking] = useState(false);
  const [imgError, setImgError] = useState(false);

  const filters = [
    { id: "none", label: "Orig" },
    { id: "noir", label: "Noir" },
    { id: "cyber", label: "Neon" },
    { id: "vintage", label: "Sepia" }
  ];

  const handleShutter = () => {
    setIsClicking(true);
    // Play synthetic camera click beep via Audio API
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {}

    // Cycle through filters
    setTimeout(() => {
      setIsClicking(false);
      const nextFilterIdx = (filters.findIndex(f => f.id === filter) + 1) % filters.length;
      setFilter(filters[nextFilterIdx].id);
    }, 150);
  };

  // Determine CSS filter value based on state
  let cssFilter = "none";
  if (filter === "noir") cssFilter = "grayscale(100%) contrast(1.3)";
  if (filter === "cyber") cssFilter = "hue-rotate(275deg) saturate(2.5) contrast(1.1)";
  if (filter === "vintage") cssFilter = "sepia(0.85) contrast(1.1) brightness(0.9)";

  return (
    <div className={styles.viewfinderContainer}>
      <div className={cn(styles.cameraShutter, isClicking && styles.shutterClick)}></div>
      <div className={styles.viewfinderOverlay}></div>
      <div className={styles.recBadge}>
        <span className={styles.recDot}></span>
        <span>REC</span>
      </div>

      <div
        style={{
          height: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1c1c1c",
          position: "relative"
        }}
      >
        {imgError || !logoUrl ? (
          <div
            style={{
              fontFamily: "'Black Ops One', sans-serif",
              fontSize: "3.5rem",
              color: "#fff",
              filter: cssFilter,
              transition: "filter 0.3s ease"
            }}
          >
            {clubName ? clubName.charAt(0).toUpperCase() : "P"}
          </div>
        ) : (
          <img
            src={logoUrl}
            alt={clubName}
            onError={() => setImgError(true)}
            style={{
              maxHeight: "80%",
              maxWidth: "80%",
              objectFit: "contain",
              filter: cssFilter,
              transition: "filter 0.3s ease",
            }}
          />
        )}
      </div>

      <div className={styles.filterPanel}>
        <button onClick={handleShutter} className={styles.filterBtn} style={{ background: "#fef3c7" }}>
          📸 Shutter
        </button>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(styles.filterBtn, filter === f.id && styles.filterBtnActive)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. LITERARY / DEBATE SCROLL WIDGET
   ─────────────────────────────────────────────────────────────────────────── */
export function LiteraryWidget() {
  const quotes = [
    "The pen is mightier than the sword, and far more creative.",
    "To speak truth to power requires both logic and immense passion.",
    "A room without books is like a body without a soul.",
    "Speak clearly, think deeply, write passionately, inspire always.",
    "We argue not to defeat, but to illuminate the complex truth."
  ];

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");

  useEffect(() => {
    let i = 0;
    const targetText = quotes[quoteIdx];
    setTypedQuote("");

    const timer = setInterval(() => {
      setTypedQuote((prev) => prev + targetText.charAt(i));
      i++;
      if (i >= targetText.length) {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [quoteIdx]);

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollPaper}>
        <em>“ {typedQuote} ”</em>
      </div>
      <button onClick={() => setQuoteIdx((prev) => (prev + 1) % quotes.length)} className={styles.scrollQuotesBtn}>
        Next Wisdom
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. DESIGN WORKSPACE ACCENT COLOR CUSTOMIZER
   ─────────────────────────────────────────────────────────────────────────── */
export function DesignWidget() {
  const containerRef = useRef(null);
  const [activeSwatch, setActiveSwatch] = useState("");

  const swatches = [
    { id: "emerald", accent: "#059669", light: "#ecfdf5", label: "Green" },
    { id: "amber", accent: "#d97706", light: "#fef3c7", label: "Orange" },
    { id: "rose", accent: "#db2777", light: "#fdf2f8", label: "Pink" },
    { id: "crimson", accent: "#dc2626", light: "#fef2f2", label: "Red" },
    { id: "lime", accent: "#65a30d", light: "#f7fee7", label: "Lime" },
    { id: "violet", accent: "#7c3aed", light: "#f5f3ff", label: "Violet" }
  ];

  const handleApplyColor = (swatch) => {
    setActiveSwatch(swatch.id);

    // Dynamic color manipulation of parent card element!
    if (containerRef.current) {
      const cardEl = containerRef.current.closest('[class*="card"]') || containerRef.current.closest('[class*="pageWrapper"]');
      if (cardEl) {
        cardEl.style.setProperty("--accent-color", swatch.accent);
        cardEl.style.setProperty("--accent-light", swatch.light);
      }
    }
  };

  return (
    <div className={styles.designCanvas} ref={containerRef}>
      <div className={styles.paletteRow}>
        <span className={styles.paletteLabel}>ACCENT SCHEME</span>
        <div className={styles.colorSwatches}>
          {swatches.map((s) => (
            <div
              key={s.id}
              onClick={() => handleApplyColor(s)}
              className={cn(styles.swatch, activeSwatch === s.id && styles.swatchActive)}
              style={{ backgroundColor: s.accent }}
              title={s.label}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. ROBOTICS GEARS & DIAGNOSTICS WIDGET
   ─────────────────────────────────────────────────────────────────────────── */
export function RoboticsWidget({ accentColor }) {
  const [speed, setSpeed] = useState(1); // multiplier
  const [metrics, setMetrics] = useState({ cpu: 45, battery: 98, torque: 30 });

  // Fluctuate diagnostics telemetry data in real-time!
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => {
        const cpuDelta = Math.floor(Math.random() * 9) - 4;
        const torqueDelta = Math.floor(Math.random() * 11) - 5;
        return {
          cpu: Math.max(10, Math.min(95, prev.cpu + cpuDelta)),
          battery: Math.max(1, prev.battery - 0.05), // drain slowly
          torque: Math.max(5, Math.min(100, prev.torque + torqueDelta))
        };
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const handleBoost = () => {
    setSpeed((prev) => (prev === 1 ? 2.5 : 1));
  };

  // Adjust gear animations timing speed
  const gearTimeClockwise = (5 / speed).toFixed(2);
  const gearTimeCounter = (3.2 / speed).toFixed(2);

  return (
    <div className={styles.roboticsWrapper} style={{ "--accent-color": accentColor }}>
      <div className={styles.gearAssembly}>
        {/* SVG Gear 1 */}
        <svg
          className={cn(styles.gearBig, styles.rotateClockwise)}
          viewBox="0 0 100 100"
          style={{ animationDuration: `${gearTimeClockwise}s` }}
        >
          <path
            fill="#d97706"
            stroke="#000"
            strokeWidth="4"
            d="M50 35a15 15 0 1 0 0 30 15 15 0 0 0 0-30m0-13a4.5 4.5 0 0 1 4.5 4.5V30h-9v-3.5A4.5 4.5 0 0 1 50 22m19.8 8.2a4.5 4.5 0 0 1 3.2 4.5l-2.5 2.5l-6.4-6.4l2.5-2.5a4.5 4.5 0 0 1 3.2-3.1m8.2 19.8a4.5 4.5 0 0 1 4.5 4.5h-3.5v-9h3.5A4.5 4.5 0 0 1 78 50m-8.2 19.8a4.5 4.5 0 0 1-4.5 4.5l-2.5-2.5l6.4-6.4l2.5 2.5a4.5 4.5 0 0 1 3.1 3.2M50 78a4.5 4.5 0 0 1-4.5-4.5V70h9v3.5A4.5 4.5 0 0 1 50 78m-19.8-8.2a4.5 4.5 0 0 1-3.2-4.5l2.5-2.5l6.4 6.4l-2.5 2.5a4.5 4.5 0 0 1-3.2 3.1M22 50a4.5 4.5 0 0 1-4.5-4.5h3.5v9h-3.5A4.5 4.5 0 0 1 22 50m8.2-19.8a4.5 4.5 0 0 1 4.5-4.5l2.5 2.5l-6.4 6.4l-2.5-2.5a4.5 4.5 0 0 1-3.1-3.2"
          />
        </svg>
        {/* SVG Gear 2 */}
        <svg
          className={cn(styles.gearSmall, styles.rotateCounterClockwise)}
          viewBox="0 0 100 100"
          style={{ animationDuration: `${gearTimeCounter}s` }}
        >
          <path
            fill="#475569"
            stroke="#000"
            strokeWidth="5"
            d="M50 38a12 12 0 1 0 0 24 12 12 0 0 0 0-24m0-12a4 4 0 0 1 4 4V34h-8v-4a4 4 0 0 1 4-4m18.4 7.6a4 4 0 0 1 2.8 4l-2 2l-5.6-5.6l2-2a4 4 0 0 1 2.8-2.8M74 50a4 4 0 0 1 4 4h-4v-8h4A4 4 0 0 1 74 50m-7.6 18.4a4 4 0 0 1-4 4l-2-2l5.6-5.6l2 2a4 4 0 0 1 2.4 2.8M50 74a4 4 0 0 1-4-4v-4h8v4a4 4 0 0 1-4 4m-18.4-7.6a4 4 0 0 1-2.8-4l2-2l5.6 5.6l-2 2a4 4 0 0 1-2.8 2.8M26 50a4 4 0 0 1-4-4h4v8h-4A4 4 0 0 1 26 50m7.6-18.4a4 4 0 0 1 4-4l2 2l-5.6 5.6l-2-2a4 4 0 0 1-2.4-2.8"
          />
        </svg>
      </div>

      <div className={styles.diagnosticMetrics}>
        <div className={styles.metricRow}>
          <div className={styles.metricLabelRow}>
            <span>GEAR SPEED</span>
            <span>{speed === 1 ? "1.0x (NOMINAL)" : "2.5x (OVERCLOCK)"}</span>
          </div>
          <div className={styles.metricBarOuter}>
            <div className={styles.metricBarInner} style={{ width: `${(speed / 2.5) * 100}%` }}></div>
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricLabelRow}>
            <span>DIAGNOSTIC BATT</span>
            <span>{Math.round(metrics.battery)}%</span>
          </div>
          <div className={styles.metricBarOuter}>
            <div
              className={styles.metricBarInner}
              style={{
                width: `${metrics.battery}%`,
                backgroundColor: metrics.battery < 20 ? "#ef4444" : "#10b981"
              }}
            ></div>
          </div>
        </div>
      </div>

      <button onClick={handleBoost} className={styles.diagnosticsBtn}>
        {speed === 1 ? "Boost" : "Nominal"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MASTER ROUTER COMPONENT FOR GENERAL CATEGORIES
   ─────────────────────────────────────────────────────────────────────────── */
export default function CategoryWidgetRouter({ category, clubName, logoUrl, accentColor }) {
  const normCategory = (category || "").toUpperCase();

  switch (normCategory) {
    case "CODING":
    case "CYBERSECURITY":
      return <CodingWidget clubName={clubName} />;

    case "MUSIC":
      return <MusicWidget clubName={clubName} accentColor={accentColor} />;

    case "DANCE":
      return <DanceWidget accentColor={accentColor} />;

    case "DRAMATICS":
      return <DramaticsWidget />;

    case "PHOTOGRAPHY":
    case "MOVIE":
      return <PhotographyWidget logoUrl={logoUrl} clubName={clubName} />;

    case "LITERARY":
      return <LiteraryWidget />;

    case "DESIGN":
      return <DesignWidget />;

    case "ROBOTICS":
    case "INNOVATION":
      return <RoboticsWidget accentColor={accentColor} />;

    default:
      // Default fallback is the DesignWidget which lets users recolor any card!
      return <DesignWidget />;
  }
}
