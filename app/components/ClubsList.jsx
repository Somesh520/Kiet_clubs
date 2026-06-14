"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ClubsList.module.css";
import { TECHNICAL_CLUBS, CULTURAL_CLUBS } from "../data/registry";

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
    ? club.teacherCoordinators.map((t) => t.name).join(", ")
    : "";
  const department = club.department || "";

  return (
    <motion.div
      className={styles.card}
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
      {/* Terminal Window Header Decor */}
      <div className={styles.cardHeader}>
        <div className={styles.windowDots}>
          <span className={styles.windowDot}></span>
          <span className={styles.windowDot}></span>
          <span className={styles.windowDot}></span>
        </div>
        <span className={styles.windowTitle}>
          {club.category} // #{String(club.id).padStart(2, "0")}
        </span>
      </div>

      {/* Side-by-Side Hero (Logo + Title) */}
      <div className={styles.cardHero}>
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
        <div className={styles.titleWrapper}>
          <h3 className={styles.cardTitle}>{club.name}</h3>
          <span className={styles.cardCategory}>{club.category}</span>
        </div>
      </div>

      <p className={styles.cardDescription}>{club.description}</p>

      {/* Club Meta Info (Faculty & Department) */}
      <div className={styles.metaInfoList}>
        <div className={styles.metaInfoItem}>
          <div className={styles.metaInfoLeft}>
            <svg stroke="currentColor" fill="none" strokeWidth="2.2" viewBox="0 0 24 24" height="18" width="18" className={styles.metaIcon}>
              <path d="M12 2L2 7l10 5 10-5-10-5Z" />
              <path d="M6 9.5V14c0 2 2 3.5 6 3.5s6-1.5 6-3.5V9.5" />
              <path d="M20 7v5" />
              <path d="M4 22v-1a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v1" />
            </svg>
            <span className={styles.metaLabel}>Faculty Coordinator:</span>
          </div>
          <span className={styles.metaValue} title={coordinator}>{coordinator}</span>
        </div>

        {department && (
          <div className={styles.metaInfoItem}>
            <div className={styles.metaInfoLeft}>
              <svg stroke="currentColor" fill="none" strokeWidth="2.2" viewBox="0 0 24 24" height="18" width="18" className={styles.metaIcon}>
                <circle cx="12" cy="10" r="6" />
                <path d="M12 7l1 2.5h2.5l-2 1.5 0.8 2.5-2.3-1.5-2.3 1.5 0.8-2.5-2-1.5H11z" />
                <path d="M8.5 15l-1.5 6 5-3 5 3-1.5-6" />
              </svg>
              <span className={styles.metaLabel}>Department:</span>
            </div>
            <span className={styles.metaValue} title={department}>{department}</span>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <Link
          href={detailUrl}
          className={styles.exploreButton}
        >
          <span>Explore Club</span>
          <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="14" width="14" className={styles.arrowIcon}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
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
    <div className={styles.container}>
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

        <h1 className={styles.title}>{activeData.title}</h1>
        <p className={styles.subtitle}>{activeData.description}</p>

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

