"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ClubsList.module.css";
import { TECHNICAL_CLUBS, CULTURAL_CLUBS, getCategoryColors } from "../data/registry";

const CLUBS_DATA = {
  technical: {
    title: "Technical Clubs",
    description: "Discover and join communities dedicated to technological innovation, coding, robotics, and academic excellence. Engage in projects, workshops, and competitions to elevate your practical skills.",
    categories: ["ALL", "CODING", "ROBOTICS", "DESIGN", "CYBERSECURITY", "INNOVATION"],
    clubs: TECHNICAL_CLUBS
  },
  cultural: {
    title: "Cultural Clubs",
    description: "Discover communities centered around music, dance, drama, art, literature, and creative expression. Participate in performances, cultural events, workshops, and competitions to showcase your talent, build confidence, and connect with like-minded students.",
    categories: ["ALL", "MUSIC", "DANCE", "DRAMATICS", "PHOTOGRAPHY", "LITERARY"],
    clubs: CULTURAL_CLUBS
  }
};



function ClubCardItem({ club, index }) {
  const [imgError, setImgError] = useState(false);
  const staggerDelay = (index % 3) * 0.08;
  const clubSlug = club.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const detailUrl = club.type === "cultural"
    ? `/campus-life/cultural-clubs/${clubSlug}`
    : `/campus-life/technical-clubs/${clubSlug}`;

  const coordinator = club.teacherCoordinators && club.teacherCoordinators.length > 0
    ? club.teacherCoordinators[0].name
    : "Faculty Coordinator";

  const colors = getCategoryColors(club.category);
  const mockMembers = (club.id % 20) + 30; // realistic count between 30 and 50

  return (
    <motion.div
      className={styles.card}
      style={{
        "--accent-color": colors.accent,
        "--accent-light": colors.light,
      }}
      data-category={club.category.toLowerCase()}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: staggerDelay,
      }}
    >
      {/* Top row: Logo on left, badges on right */}
      <div className={styles.cardTopRow}>
        <div className={styles.logoBox}>
          {imgError || !club.logo ? (
            <div className={styles.logoFallback}>
              {club.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img
              src={club.logo}
              alt={`${club.name} Logo`}
              onError={() => setImgError(true)}
              className={styles.clubLogo}
            />
          )}
        </div>
        <div className={styles.cardBadgesGroup}>
          {club.instagram && (
            <a
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramBadge}
              onClick={(e) => e.stopPropagation()}
              title="Follow on Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          )}
          <span className={styles.cardCategoryBadge}>{club.category}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{club.name}</h3>

      {/* Description */}
      <p className={styles.cardDescription}>{club.description}</p>

      {/* Divider */}
      <div className={styles.cardDivider}></div>

      {/* Meta Info Row */}
      <div className={styles.metaRow}>
        <div className={styles.metaCol}>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="16" width="16" className={styles.metaIcon}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
          <span className={styles.metaText} title={coordinator}>{coordinator}</span>
        </div>
        <div className={styles.metaCol}>
          <svg stroke="currentColor" fill="none" strokeWidth="2.2" viewBox="0 0 24 24" height="16" width="16" className={styles.metaIcon}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className={styles.metaText}>{mockMembers}</span>
        </div>
      </div>

      {/* Footer CTA Button */}
      <div className={styles.cardFooter}>
        <Link href={detailUrl} className={styles.viewDetailsButton}>
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

export function ClubsList({ defaultType = "technical", hideSwitcher = false }) {
  const [activeType, setActiveType] = useState(defaultType); // "technical" or "cultural"
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(6);

  const activeData = CLUBS_DATA[activeType];

  // Helper to compute category club counts dynamically
  const getCategoryCount = (category) => {
    if (category === "ALL") {
      return activeData.clubs.length;
    }
    return activeData.clubs.filter((club) => club.category === category).length;
  };

  // Filter logic
  const filteredClubs = activeData.clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "ALL" || club.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const hasMore = visibleCount < filteredClubs.length;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(6); // Reset visible count on category change
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setActiveCategory("ALL");
    setSearchQuery("");
    setVisibleCount(6);
  };

  // Infinite Scroll IntersectionObserver implementation
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 6);
        }
      },
      {
        root: null,
        rootMargin: "200px", // Trigger loading slightly early before reaching viewport edge
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, visibleCount, filteredClubs.length]);

  return (
    <div className={`${styles.container} ${activeType === "cultural" ? styles.culturalContainer : ""}`}>
      {/* ── Floating cultural background particles (cultural mode only) ── */}
      {activeType === "cultural" && (
        <div className={styles.culturalParticles} aria-hidden="true">
          {["♪","🪔","✨","♫","🌸","♩","🎵","🌺","♬","🪷","⭐","🎶"].map((symbol, i) => (
            <span key={i} className={styles.floatingSymbol} style={{
              "--delay": `${(i * 0.7) % 5}s`,
              "--duration": `${6 + (i % 4)}s`,
              "--left": `${(i * 8.3) % 95}%`,
              "--size": `${1.2 + (i % 3) * 0.4}rem`,
              "--opacity": `${0.12 + (i % 3) * 0.06}`,
            }}>{symbol}</span>
          ))}
        </div>
      )}
      <div className={styles.innerContainer}>

        {/* Type Switcher */}
        {!hideSwitcher && (
          <div className={styles.typeSwitcher}>
            <button
              className={`${styles.typeButton} ${activeType === "technical" ? styles.typeButtonActive : ""
                }`}
              onClick={() => handleTypeChange("technical")}
            >
              Technical Clubs
              <span className={styles.typeBadge}>
                {CLUBS_DATA.technical.clubs.length}
              </span>
            </button>
            <button
              className={`${styles.typeButton} ${activeType === "cultural" ? styles.typeButtonActive : ""
                }`}
              onClick={() => handleTypeChange("cultural")}
            >
              Cultural Clubs
              <span className={styles.typeBadge}>
                {CLUBS_DATA.cultural.clubs.length}
              </span>
            </button>
          </div>
        )}

        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h1 className={`${styles.title} ${activeType === "cultural" ? styles.culturalTitle : ""}`}>{activeData.title}</h1>
            <p className={styles.subtitle}>{activeData.description}</p>
          </div>
          <div className={styles.headerRight}>
            {activeType === "cultural" ? (
              <CulturalHeaderIllustration />
            ) : (
              <TechnicalHeaderIllustration />
            )}
          </div>
        </div>

        {/* Search and Category Filters */}
        <div className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIcon}>
              <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="18" width="18">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search clubs by name, category, or desc..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6); // Reset visible count on search
              }}
            />
            {searchQuery && (
              <button
                className={styles.clearSearchBtn}
                onClick={() => {
                  setSearchQuery("");
                  setVisibleCount(6);
                }}
                title="Clear search"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="16" width="16">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            {activeData.categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${
                  activeCategory === category ? styles.filterButtonActive : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
                <span className={styles.filterBadge}>
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className={styles.grid}>
            {filteredClubs.slice(0, visibleCount).map((club, index) => (
              <ClubCardItem
                key={`${club.id}-${activeCategory}-${searchQuery}`}
                club={club}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted fs-4">No clubs found matching your criteria.</p>
          </div>
        )}

        {/* Infinite Scroll Sentinel / Loading Indicator */}
        {hasMore && (
          <div ref={sentinelRef} className={styles.loaderWrapper}>
            <div className={styles.pulseLoader}>
              <span className={styles.pulseDot}></span>
              <span className={styles.pulseDot}></span>
              <span className={styles.pulseDot}></span>
            </div>
            <p className={styles.loaderText}>LOADING MORE CLUBS...</p>
          </div>
        )}
      </div>
    </div>
  );
}


function CulturalHeaderIllustration() {
  return (
    <svg className={styles.headerSvg} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Warm saffron-to-violet gradient background */}
        <radialGradient id="cultBG2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff1f8" />
          <stop offset="60%" stopColor="#fde8d8" />
          <stop offset="100%" stopColor="#f3d9ff" />
        </radialGradient>
        {/* Dancer body gradient */}
        <linearGradient id="dancerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        {/* Diya flame gradient */}
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        {/* Saree/garment gradient */}
        <linearGradient id="sareeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ── Background Circle ── */}
      <circle cx="110" cy="110" r="90" fill="url(#cultBG2)" />
      {/* Decorative outer ring */}
      <circle cx="110" cy="110" r="88" stroke="#f9a8d4" strokeWidth="1" strokeDasharray="6 4" opacity="0.6"/>

      {/* ── Rangoli / Mandala Pattern (background) ── */}
      {/* Center dot */}
      <circle cx="110" cy="110" r="4" fill="#f97316" opacity="0.25" />
      {/* Petal ring 1 */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 110 + 22 * Math.cos(rad);
        const y = 110 + 22 * Math.sin(rad);
        return <ellipse key={i} cx={x} cy={y} rx="5" ry="9" fill="#f9a8d4" opacity="0.2" transform={`rotate(${angle} ${x} ${y})`} />;
      })}
      {/* Petal ring 2 */}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 110 + 40 * Math.cos(rad);
        const y = 110 + 40 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="3" fill="#c084fc" opacity="0.2" />;
      })}

      {/* ── Decorative swirl waves ── */}
      <path d="M28 90 Q55 60 80 90 Q105 120 130 90" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M90 175 Q120 155 150 175 Q175 190 195 165" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3"/>

      {/* ── Indian Classical Dancer Silhouette ── */}
      {/* Head */}
      <circle cx="110" cy="55" r="12" fill="url(#dancerGrad)" />
      {/* Bindi */}
      <circle cx="110" cy="51" r="2" fill="#fde68a" />
      {/* Hair bun */}
      <ellipse cx="110" cy="44" rx="7" ry="5" fill="#7c3aed" />
      <circle cx="110" cy="40" r="3" fill="#f59e0b" />

      {/* Neck */}
      <rect x="107" y="66" width="6" height="8" rx="3" fill="url(#dancerGrad)" />

      {/* Body torso in bent dance pose */}
      <path d="M100 74 C96 78, 94 88, 97 95 C100 102, 120 104, 124 96 C128 88, 126 78, 120 74 Z" fill="url(#dancerGrad)" />

      {/* Saree/Skirt - flared outward for dance */}
      <path d="M97 95 C88 108, 76 130, 78 148 C82 155, 96 155, 100 148 C102 142, 104 128, 107 118 Z" fill="url(#sareeGrad)" />
      <path d="M124 96 C132 110, 144 132, 140 148 C136 155, 122 155, 120 148 C118 142, 116 128, 113 118 Z" fill="url(#sareeGrad)" />
      {/* Saree drape accent lines */}
      <path d="M97 100 C90 112, 83 130, 84 142" stroke="#f59e0b" strokeWidth="1" opacity="0.6" fill="none"/>
      <path d="M122 100 C130 113, 136 132, 134 144" stroke="#f59e0b" strokeWidth="1" opacity="0.6" fill="none"/>

      {/* ── Right arm raised UP (classical mudra) ── */}
      <path d="M120 78 C130 68, 148 52, 155 44" stroke="url(#dancerGrad)" strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Right hand fingers spread (mudra) */}
      <circle cx="155" cy="44" r="4" fill="#fbbf24"/>
      <path d="M153 41 L158 36" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M156 40 L162 36" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M157 43 L163 40" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── Left arm extended side ── */}
      <path d="M100 80 C88 88, 72 92, 62 96" stroke="url(#dancerGrad)" strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Left hand */}
      <circle cx="62" cy="96" r="4" fill="#fbbf24"/>
      <path d="M60 93 L55 89" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M59 96 L53 94" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── Bangles / Jewelry ── */}
      <circle cx="132" cy="66" r="4" fill="none" stroke="#fde68a" strokeWidth="1.5"/>
      <circle cx="74" cy="93" r="4" fill="none" stroke="#fde68a" strokeWidth="1.5"/>

      {/* ── Feet / dance footwork ── */}
      <ellipse cx="92" cy="153" rx="8" ry="4" fill="#7c3aed" />
      <ellipse cx="126" cy="153" rx="8" ry="4" fill="#ec4899" />
      {/* Anklet dots */}
      {[88,91,94,97].map((x,i) => <circle key={i} cx={x} cy={155} r="1" fill="#fde68a"/>)}
      {[122,125,128,131].map((x,i) => <circle key={i} cx={x} cy={155} r="1" fill="#fde68a"/>)}

      {/* ── Diya (Oil Lamp) — bottom left ── */}
      {/* Bowl */}
      <path d="M42 168 Q44 162, 52 162 Q60 162, 62 168 Z" fill="#f59e0b"/>
      <ellipse cx="52" cy="168" rx="10" ry="3.5" fill="#d97706"/>
      {/* Flame */}
      <path d="M50 162 Q49 155, 52 148 Q55 155, 54 162 Z" fill="url(#flameGrad)" filter="url(#glow)"/>
      <path d="M51 158 Q50 153, 52 149 Q54 153, 53 158 Z" fill="#fde68a" opacity="0.9"/>

      {/* ── Diya — bottom right ── */}
      <path d="M158 168 Q160 162, 168 162 Q176 162, 178 168 Z" fill="#f59e0b"/>
      <ellipse cx="168" cy="168" rx="10" ry="3.5" fill="#d97706"/>
      <path d="M166 162 Q165 155, 168 148 Q171 155, 170 162 Z" fill="url(#flameGrad)" filter="url(#glow)"/>
      <path d="M167 158 Q166 153, 168 149 Q170 153, 169 158 Z" fill="#fde68a" opacity="0.9"/>

      {/* ── Musical Notes floating ── */}
      {/* Note 1 — top left */}
      <text x="28" y="65" fontSize="18" fill="#ec4899" opacity="0.85" fontFamily="serif">♪</text>
      {/* Note 2 — top right */}
      <text x="170" y="58" fontSize="14" fill="#7c3aed" opacity="0.75" fontFamily="serif">♫</text>
      {/* Note 3 — right middle */}
      <text x="182" y="110" fontSize="12" fill="#f97316" opacity="0.7" fontFamily="serif">♩</text>
      {/* Note 4 — left lower */}
      <text x="22" y="140" fontSize="10" fill="#db2777" opacity="0.6" fontFamily="serif">♬</text>

      {/* ── Sparkle Stars ── */}
      {/* Star 1 */}
      <path d="M165 80 L167 74 L169 80 L175 78 L169 83 L171 89 L167 84 L163 89 L165 83 L159 78 Z" fill="#fde68a" opacity="0.9" filter="url(#glow)"/>
      {/* Star 2 small */}
      <path d="M45 120 L46 117 L47 120 L50 119 L47 121 L48 124 L46 121 L44 124 L45 121 L42 119 Z" fill="#f9a8d4" opacity="0.8"/>
      {/* Star 3 tiny */}
      <path d="M178 140 L179 137 L180 140 L183 139 L180 141 L181 144 L179 141 L177 144 L178 141 L175 139 Z" fill="#c084fc" opacity="0.75"/>

      {/* ── Dot / Bindi decorations scattered ── */}
      <circle cx="35" cy="80" r="3" fill="#f97316" opacity="0.4"/>
      <circle cx="190" cy="95" r="2.5" fill="#ec4899" opacity="0.4"/>
      <circle cx="30" cy="155" r="2" fill="#7c3aed" opacity="0.3"/>
      <circle cx="190" cy="145" r="3" fill="#f59e0b" opacity="0.4"/>
      <circle cx="110" cy="185" r="2.5" fill="#ec4899" opacity="0.35"/>
    </svg>
  );
}

function TechnicalHeaderIllustration() {
  return (
    <svg className={styles.headerSvg} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="techBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#ecfeff" />
        </linearGradient>
        <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      
      {/* Background circle with gradient */}
      <circle cx="100" cy="100" r="75" fill="url(#techBG)" stroke="#ccfbf1" strokeWidth="1.5" />
      
      {/* Technical coordinate grids dots (Matrix) */}
      <circle cx="45" cy="70" r="1.5" fill="#94a3b8" opacity="0.6" />
      <circle cx="45" cy="85" r="1.5" fill="#94a3b8" opacity="0.6" />
      <circle cx="45" cy="100" r="1.5" fill="#94a3b8" opacity="0.6" />
      <circle cx="60" cy="70" r="1.5" fill="#94a3b8" opacity="0.6" />
      <circle cx="60" cy="85" r="1.5" fill="#94a3b8" opacity="0.6" />
      
      {/* Circuit board paths */}
      <path d="M40 100 L65 100 L85 85" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="40" cy="100" r="3.5" fill="#10b981" />
      
      <path d="M100 65 L100 35 L75 22" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="75" cy="22" r="4" fill="#0ea5e9" />
      
      <path d="M135 105 L160 120 L160 145" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="160" cy="145" r="4" fill="#0891b2" />
      
      {/* Isometric 3D Data Cube */}
      {/* Top Face */}
      <polygon points="100,65 135,85 100,105 65,85" fill="url(#cubeTop)" stroke="#0e7490" strokeWidth="1" />
      {/* Left Face */}
      <polygon points="65,85 100,105 100,145 65,125" fill="url(#cubeLeft)" stroke="#0e7490" strokeWidth="1" />
      {/* Right Face */}
      <polygon points="100,105 135,85 135,125 100,145" fill="url(#cubeRight)" stroke="#0e7490" strokeWidth="1" />
      
      {/* Glowing core indicator */}
      <circle cx="100" cy="95" r="5" fill="#ffffff" opacity="0.9" />
      <circle cx="100" cy="95" r="12" fill="#22d3ee" opacity="0.3" />
    </svg>
  );
}

