"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ClubsList.module.css";
import { CLUBS_DATA as TECHNICAL_DATA } from "../data/technical_club_data";
import { CLUBS_DATA as CULTURAL_DATA } from "../data/cultural_club_data";

const CLUBS_DATA = {
  technical: TECHNICAL_DATA.technical,
  cultural: CULTURAL_DATA.cultural
};

function ClubCardItem({ club }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={styles.card} data-category={club.category.toLowerCase()}>
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

      <div className={styles.cardFooter}>
        <a href={club.exploreUrl} className={styles.exploreButton}>
          <span>Explore Club</span>
          <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="14" width="14" className={styles.arrowIcon}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
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

      {/* Controls: Search and Filter Buttons */}
      <div className={styles.controlsRow}>
        <div className={styles.searchWrapper}>
          <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className={styles.searchIcon} height="18" width="18">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search clubs by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.filterGroup}>
          {activeData.categories.map((category) => {
            const count = getCategoryCount(category);
            return (
              <button
                key={category}
                className={`${styles.filterButton} ${activeCategory === category ? styles.filterButtonActive : ""
                  }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category} <span className={styles.filterBadge}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length > 0 ? (
        <div className={styles.grid}>
          {filteredClubs.slice(0, visibleCount).map((club) => (
            <ClubCardItem key={club.id} club={club} />
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
  );
}

