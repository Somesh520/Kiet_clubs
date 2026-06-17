"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../../ClubDetail.module.css";
import { ALL_CLUBS, getCategoryColors } from "../../../data/registry";

// Flat list of all clubs
const allClubs = ALL_CLUBS;

// Replicate slug logic exactly
const getSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
                  style={{ mixBlendMode: 'multiply' }}
                />
              )}
            </div>
          </div>
        </header>

        {/* Tab Switcher Navigation */}
        <nav className={styles.tabsContainer}>
          {["About", "Team", "Events", "Achievements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          {/* About Tab Content */}
          {activeTab === "About" && (
            <section className={styles.missionSection}>
              <h2 className={styles.sectionHeading}>The Mission</h2>
              <div className={styles.descriptionBox}>
                <div className={styles.cardTag}>THE MISSION</div>
                <p className={styles.descriptionText}>{club.description}</p>
              </div>
            </section>
          )}

          {/* Team Tab Content */}
          {activeTab === "Team" && (
            <>
              {/* Faculty Coordinators Section */}
              {club.teacherCoordinators && club.teacherCoordinators.length > 0 && (
                <section className={styles.facultySection}>
                  <h2 className={styles.sectionHeading}>Faculty Coordinators</h2>
                  <div className={styles.leadersGrid}>
                    {club.teacherCoordinators.map((teacher, idx) => (
                      <div key={idx} className={styles.leaderCard}>
                        {teacher.img && (
                          <div className={styles.avatarWrapper}>
                            <img
                              src={teacher.img}
                              alt={teacher.name}
                              className={styles.leaderAvatar}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className={styles.leaderInfo}>
                          <span className={styles.leaderRole}>{teacher.role}</span>
                          <h4 className={styles.leaderName}>{teacher.name}</h4>
                          {teacher.email && (
                            <span className={styles.leaderEmail}>{teacher.email}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Leadership Section */}
              {leaders && leaders.length > 0 && (
                <section className={styles.leadershipSection}>
                  <h2 className={styles.sectionHeading}>Core Leadership</h2>
                  <div className={styles.leadersGrid}>
                    {leaders.map((leader, idx) => (
                      <div key={idx} className={styles.leaderCard}>
                        {leader.img && (
                          <div className={styles.avatarWrapper}>
                            <img
                              src={leader.img}
                              alt={leader.name}
                              className={styles.leaderAvatar}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className={styles.leaderInfo}>
                          <span className={styles.leaderRole}>{leader.role}</span>
                          <h4 className={styles.leaderName}>{leader.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Events Tab Content */}
          {activeTab === "Events" && (
            club.events && club.events.length > 0 ? (
              <section className={styles.eventsSection}>
                <h2 className={styles.sectionHeading}>Club Events</h2>
                <div className={styles.eventsList}>
                  {club.events.map((evt, idx) => {
                    const hasDate = evt.date && evt.date.trim() !== "";
                    const dateParts = hasDate ? evt.date.split(" ") : [];
                    const day = hasDate ? dateParts[0] : `0${idx + 1}`;
                    const month = hasDate ? dateParts.slice(1).join(" ") : "EVENT";
                    return (
                      <div key={idx} className={styles.eventCard}>
                        <div className={styles.eventDateColumn}>
                          <span className={styles.eventDateDay}>{day}</span>
                          <span className={styles.eventDateMonth}>{month}</span>
                        </div>
                        <div className={styles.eventMainContent}>
                          <div className={styles.eventContentColumn}>
                            <h4 className={styles.eventTitle}>{evt.title}</h4>
                            <p className={styles.eventDesc}>{evt.desc}</p>
                            {evt.img && (
                              <button 
                                onClick={() => setExpandedEventIdx(expandedEventIdx === idx ? null : idx)}
                                className={styles.eventToggleBtn}
                              >
                                <span>{expandedEventIdx === idx ? "📂 HIDE ATTACHMENT ▲" : "📁 VIEW ATTACHMENT (1) ▼"}</span>
                              </button>
                            )}
                          </div>
                          {evt.img && expandedEventIdx === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className={styles.eventImgDropdown}
                              onClick={() => setLightboxImg(evt.img)}
                            >
                              <div className={styles.eventImgHeader}>
                                <div className={styles.eventImgHeaderLeft}>
                                  <span className={styles.eventImgDot}></span>
                                  <span>LIVE PREVIEW // EVENT_PHOTO_0{idx + 1}.JPG</span>
                                </div>
                                <div className={styles.eventImgHeaderRight}>
                                  CLICK TO ZOOM 🔍
                                </div>
                              </div>
                              <img src={evt.img} alt={evt.title} className={styles.eventImgLarge} />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className={styles.placeholderSection}>
                <div className={styles.placeholderCard}>
                  <div className={styles.placeholderIcon}>📅</div>
                  <h3 className={styles.placeholderTitle}>Stay Tuned for Upcoming Events</h3>
                  <p className={styles.placeholderDesc}>
                    We are mapping out our schedule for the upcoming semester. Check back soon for workshops, hands-on hackathons, and guest lectures!
                  </p>
                </div>
              </section>
            )
          )}

          {/* Achievements Tab Content */}
          {activeTab === "Achievements" && (
            club.achievements && club.achievements.length > 0 ? (
              <section className={styles.achievementsSection}>
                <h2 className={styles.sectionHeading}>Key Achievements</h2>
                <div className={styles.achievementsTimeline}>
                  {club.achievements.map((ach, idx) => (
                    <div key={idx} className={styles.timelineItem}>
                      <div className={styles.timelineLine}></div>
                      <div className={styles.timelineNode}>{idx + 1}</div>
                      <div className={styles.achievementCard}>
                        {ach.img && (
                          <div className={styles.achievementImgWrapper} onClick={() => setLightboxImg(ach.img)}>
                            <img src={ach.img} alt={ach.title} className={styles.achievementImg} />
                          </div>
                        )}
                        <h4 className={styles.achievementTitle}>{ach.title}</h4>
                        <p className={styles.achievementDesc}>{ach.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section className={styles.placeholderSection}>
                <div className={styles.placeholderCard}>
                  <div className={styles.placeholderIcon}>🏆</div>
                  <h3 className={styles.placeholderTitle}>Milestones Pending</h3>
                  <p className={styles.placeholderDesc}>
                    We are currently compiling our list of achievements and awards. Stay tuned to see how our members make an impact!
                  </p>
                </div>
              </section>
            )
          )}
        </motion.div>
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
