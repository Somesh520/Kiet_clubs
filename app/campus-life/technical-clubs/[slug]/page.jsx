"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../../ClubDetail.module.css";
import { ALL_CLUBS, getCategoryColors } from "../../../data/registry";
import CategoryWidgetRouter from "../../../components/CategoryWidgets";

// Flat list of all clubs
const allClubs = ALL_CLUBS;

// Replicate slug logic exactly
const getSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Dynamic helper to parse tags from achievement description
const extractTags = (desc) => {
  const knownTags = [
    "Solo Singing", "Group Singing", "Beatboxing", "Band War", "Battle of Bands",
    "IIT Mandi", "LBSIM", "HIMT", "Jaipuria", "Razzmatazz", "Shobhit Institute",
    "Group Dance", "Solo Dance", "Street Play", "Stage Play", "Duet Dance",
    "Fashion Show", "Duet Singing", "Nukkad Natak", "Mono Act", "Classical Dance",
    "Coding", "Hackathon", "Robotics", "Web Dev", "App Dev", "Cybersecurity", "IoT"
  ];
  return knownTags.filter(tag => desc.toLowerCase().includes(tag.toLowerCase()));
};






export default function TechnicalClubDetailPage() {
  const params = useParams();
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState("About");
  const [lightboxImg, setLightboxImg] = useState(null);
  const [expandedEventIdx, setExpandedEventIdx] = useState(null);

  const slug = params ? params.slug : "";
  const club = allClubs.find((c) => getSlug(c.name) === slug && c.type === "technical");

  if (!club) {
    return (
      <div className={styles.pageWrapper} style={{ '--accent-color': '#FFD600', '--accent-light': '#FFFDE7' }}>
        <div className={styles.container} style={{ textAlign: "center", padding: "120px 20px" }}>
          <h1 className={styles.clubTitle}>Club Not Found</h1>
          <p style={{ fontSize: "1.4rem", marginBottom: "2rem", fontWeight: "500" }}>
            We couldn't find any technical club matching "{slug}".
          </p>
          <Link href="/campus-life/technical" className={styles.backLink}>
            <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="16" width="16" className={styles.backArrow}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Campus Life</span>
          </Link>
        </div>
      </div>
    );
  }

  const colors = getCategoryColors(club.category);
  const leaders = club.studentLeaders || [];

  const backUrl = "/campus-life/technical";
  const coordinator = club.teacherCoordinators && club.teacherCoordinators.length > 0
    ? club.teacherCoordinators.map((t) => t.name).join(", ")
    : "";
  const department = club.department || "";

  return (
    <div
      className={styles.pageWrapper}
      style={{
        "--accent-color": colors.accent,
        "--accent-light": colors.light,
      }}
    >
      {/* ── HERO BANNER ── */}
      <div className={styles.heroBanner} data-category={club.category}>
        <div className={styles.container}>
          {/* Back Button */}
          <div className={styles.backLinkWrapper}>
            <Link href={backUrl} className={styles.backLink}>
              <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" height="16" width="16" className={styles.backArrow}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Go Back</span>
            </Link>
          </div>

          {/* Header Grid */}
          <header className={styles.headerGrid}>
            <div className={styles.headerLeft}>
              <div className={styles.metaBadgeGroup}>
                <span className={styles.chapterLabel}>
                  Official {club.category} Chapter
                </span>
                {department && (
                  <span className={styles.deptLabel}>
                    Dept: {department}
                  </span>
                )}
                {coordinator && (
                  <span className={styles.coordinatorLabel}>
                    Faculty: {coordinator}
                  </span>
                )}
                {club.teamName && (
                  <span className={styles.teamLabel}>
                    Crew: {club.teamName}
                  </span>
                )}
              </div>
              <h1 className={styles.clubTitle}>{club.name}</h1>
              {club.instagram && (
                <a
                  href={club.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.instagramButton}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
                  </svg>
                  Follow on Instagram
                </a>
              )}
            </div>
            <div className={styles.headerRight}>
              <div className={styles.logoPanel}>
                <div className={styles.logoStamp}>VERIFIED</div>
                {imgError || !club.logo ? (
                  <div className={styles.logoFallback}>
                    {club.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img
                    src={club.logo}
                    alt={`${club.name} Logo`}
                    onError={() => setImgError(true)}
                    className={styles.logoImg}
                  />
                )}
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* ── BENTO GRID CONTENT ── */}
      <div className={styles.container}>
        <div className={styles.bentoGrid}>
          
          {/* Tile 1: About the Club (Spans 7 cols on desktop) */}
          <div className={`${styles.bentoCard} ${styles.colSpan7}`}>
            <h2 className={styles.sectionHeading}>The Mission</h2>
            <p className={styles.descriptionText}>{club.description}</p>
          </div>

          {/* Tile 2: Interactive Console (Dedicated Card - Spans 5 cols on desktop) */}
          <div className={`${styles.bentoCard} ${styles.colSpan5}`}>
            <h2 className={styles.sectionHeading}>Interactive Console</h2>
            <CategoryWidgetRouter
              category={club.category}
              clubName={club.name}
              logoUrl={club.logo}
              accentColor={colors.accent}
            />
          </div>

          {/* Tile 3: Faculty & Leadership (Spans 4 cols on desktop) */}
          <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
            <h2 className={styles.sectionHeading}>Leadership & Team</h2>
            
            {/* Faculty */}
            {club.teacherCoordinators && club.teacherCoordinators.length > 0 && (
              <div className={styles.teamGroup}>
                <h4 className={styles.subTitle}>Faculty Coordinators</h4>
                <div className={styles.teamList}>
                  {club.teacherCoordinators.map((teacher, idx) => (
                    <div key={idx} className={styles.teamItem}>
                      {teacher.img ? (
                        <img src={teacher.img} alt={teacher.name} className={styles.teamAvatar} />
                      ) : (
                        <div className={styles.teamAvatarFallback}>{teacher.name.charAt(0)}</div>
                      )}
                      <div className={styles.teamItemInfo}>
                        <div className={styles.teamName}>{teacher.name}</div>
                        <div className={styles.teamRole}>{teacher.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Student Core */}
            {leaders && leaders.length > 0 && (
              <div className={styles.teamGroup} style={{ marginTop: '1.5rem' }}>
                <h4 className={styles.subTitle}>Student Core</h4>
                <div className={styles.teamList}>
                  {leaders.map((leader, idx) => (
                    <div key={idx} className={styles.teamItem}>
                      {leader.img ? (
                        <img src={leader.img} alt={leader.name} className={styles.teamAvatar} />
                      ) : (
                        <div className={styles.teamAvatarFallback}>{leader.name.charAt(0)}</div>
                      )}
                      <div className={styles.teamItemInfo}>
                        <div className={styles.teamName}>{leader.name}</div>
                        <div className={styles.teamRole}>{leader.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tile 4: Key Achievements (Spans 4 cols on desktop) */}
          <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
            <h2 className={styles.sectionHeading}>Key Achievements</h2>
            {club.achievements && club.achievements.length > 0 ? (
              <div className={styles.achievementsList}>
                {club.achievements.map((ach, idx) => (
                  <div key={idx} className={styles.achievementItem}>
                    <div className={styles.achievementBadge}>{idx + 1}</div>
                    <div className={styles.achievementContent}>
                      <h4 className={styles.achTitle}>{ach.title}</h4>
                      <p className={styles.achDesc}>{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyPlaceholder}>
                <span>🏆</span>
                <p>Milestones pending. Stay tuned!</p>
              </div>
            )}
          </div>

          {/* Tile 5: Events & Activities (Spans 4 cols on desktop) */}
          <div className={`${styles.bentoCard} ${styles.colSpan4}`}>
            <h2 className={styles.sectionHeading}>Events & Activities</h2>
            {club.events && club.events.length > 0 ? (
              <div className={styles.achievementsList}>
                {club.events.map((evt, idx) => {
                  const day = evt.date ? evt.date.split(" ")[0] : `0${idx + 1}`;
                  return (
                    <div key={idx} className={styles.achievementItem}>
                      <div className={styles.achievementBadge}>{day}</div>
                      <div className={styles.achievementContent}>
                        <h4 className={styles.achTitle}>{evt.title}</h4>
                        <p className={styles.achDesc}>{evt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyPlaceholder}>
                <span>📅</span>
                <p>Stay tuned for upcoming activities!</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxImg(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightboxImg(null)}>×</button>
            <img src={lightboxImg} alt="Enlarged view" className={styles.lightboxImgFull} />
          </div>
        </div>
      )}
    </div>
  );
}
