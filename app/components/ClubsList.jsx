"use client";

import React, { useState } from "react";
import styles from "./ClubsList.module.css";
import { CLUBS_DATA } from "../data/clubs-data";

// Icon Helper Component to render SVGs inline
function ClubIcon({ type }) {
  switch (type) {
    case "robot":
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="22" width="22">
          <path d="M12 2v4M5 12h14M12 12v6M9 16h6" />
          <path d="M19 8H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z" />
          <circle cx="8.5" cy="13.5" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="13.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="22" width="22">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "code":
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="22" width="22">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "design":
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="22" width="22">
          <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "lock":
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="22" width="22">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="22" width="22">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
  }
}

export function ClubsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter logic
  const filteredClubs = CLUBS_DATA.clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "ALL" || club.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const hasMore = visibleCount < filteredClubs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(6); // Reset visible count on category change
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{CLUBS_DATA.title}</h1>
      <p className={styles.subtitle}>{CLUBS_DATA.description}</p>

      {/* Controls: Search and Filter Buttons */}
      <div className={styles.controlsRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="18" width="18">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search clubs by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          {CLUBS_DATA.categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.filterButtonActive : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length > 0 ? (
        <div className={styles.grid}>
          {filteredClubs.slice(0, visibleCount).map((club) => (
            <div key={club.id} className={styles.card}>
              <div className={styles.iconBox}>
                <ClubIcon type={club.iconType} />
              </div>
              <h3 className={styles.cardTitle}>{club.name}</h3>
              <p className={styles.cardDescription}>{club.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardCategory}>{club.category}</span>
                <a href={club.exploreUrl} className={styles.exploreLink}>
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted fs-4">No clubs found matching your criteria.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load More Clubs
            <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="16" width="16">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
