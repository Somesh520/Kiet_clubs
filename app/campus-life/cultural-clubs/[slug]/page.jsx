"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../../ClubDetail.module.css";
import { ALL_CLUBS } from "../../../data/registry";

// Flat list of all clubs
const allClubs = ALL_CLUBS;

// Replicate slug logic exactly
const getSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Neobrutalist Dynamic Colors
const getCategoryColors = (category) => {
  const normalized = (category || "").toUpperCase();
  switch (normalized) {
    case "CODING":
    case "CYBERSECURITY":
      return { accent: "#059669", light: "#ecfdf5" }; // Premium Emerald Green
    case "ROBOTICS":
    case "INNOVATION":
      return { accent: "#d97706", light: "#fef3c7" }; // Aesthetic Amber/Orange
    case "DESIGN":
      return { accent: "#db2777", light: "#fdf2f8" }; // Deep Rose Pink
    case "MUSIC":
      return { accent: "#dc2626", light: "#fef2f2" }; // Aesthetic Crimson Red
    case "DANCE":
      return { accent: "#65a30d", light: "#f7fee7" }; // Olive/Lime Green
    case "DRAMATICS":
      return { accent: "#ea580c", light: "#fff5f1" }; // Rich Orange-Red
    case "PHOTOGRAPHY":
      return { accent: "#2563eb", light: "#eff6ff" }; // Royal Blue
    case "LITERARY":
      return { accent: "#7c3aed", light: "#f5f3ff" }; // Deep Violet
    default:
      return { accent: "#ca8a04", light: "#fef9c3" }; // Warm Gold/Yellow
  }
};

// Neobrutalist Category-Specific Feature Grids
const getCategoryFeatures = (category) => {
  const normalized = (category || "").toUpperCase();
  if (normalized === "CODING" || normalized === "CYBERSECURITY") {
    return [
      { icon: "💻", title: "Active GitHub", desc: "Collaborate on real-world open source projects and track sprint issues." },
      { icon: "⚡", title: "Weekly Sprints", desc: "Fast-paced learning cycles with weekend build workshops." },
      { icon: "🏆", title: "Hackathon Prep", desc: "Special mentorship pipelines for national and international contests." },
      { icon: "👥", title: "Peer Mentorship", desc: "Direct 1-on-1 code reviews and system design sessions with seniors." }
    ];
  } else if (normalized === "ROBOTICS" || normalized === "INNOVATION") {
    return [
      { icon: "🤖", title: "Hardware Lab", desc: "Access microcontrollers, sensors, 3D printers, and mechanical tools." },
      { icon: "💡", title: "Project Funding", desc: "Financial support for verified student research and hardware models." },
      { icon: "⚙️", title: "Robocon Training", desc: "A rigorous track preparing teams for prestigious national leagues." },
      { icon: "📐", title: "CAD Designing", desc: "Learn industry-grade modeling software (SolidWorks, AutoCAD)." }
    ];
  } else if (normalized === "DESIGN") {
    return [
      { icon: "🎨", title: "UI/UX Portfolios", desc: "Build industry-ready case studies and interactive design prototypes." },
      { icon: "✨", title: "Figma Workshops", desc: "Learn layout grids, component systems, auto-layout, and micro-interactions." },
      { icon: "🏷️", title: "Brand Identity", desc: "Create visual branding assets, logos, and design standards for campus fests." },
      { icon: "👁️", title: "Creative Reviews", desc: "Constructive feedback loops to iterate designs and improve aesthetics." }
    ];
  } else if (normalized === "MUSIC" || normalized === "DANCE" || normalized === "DRAMATICS") {
    return [
      { icon: "🎤", title: "Live Stages", desc: "Perform live at prime campus festivals, college fests, and cultural nights." },
      { icon: "🎹", title: "Jam Sessions", desc: "Collaborative studio practices, acoustics experiments, and band formations." },
      { icon: "🌟", title: "Annual Fests", desc: "Organize and lead competitive stages with colleges across India." },
      { icon: "💃", title: "Choreography", desc: "Step-by-step masterclasses spanning classical, folk, and contemporary styles." }
    ];
  } else if (normalized === "PHOTOGRAPHY") {
    return [
      { icon: "📷", title: "Studio Equipment", desc: "Access high-end cameras, studio lights, stabilizers, and prime lenses." },
      { icon: "🎬", title: "Film Screenings", desc: "Host screenings for short films, cinematic sequences, and documentaries." },
      { icon: "🖼️", title: "Exhibition Space", desc: "Display your framed photographs in campus corridors and art galas." },
      { icon: "🖥️", title: "Editing Suites", desc: "Learn advanced color grading and photo editing in Premiere and Lightroom." }
    ];
  } else if (normalized === "LITERARY") {
    return [
      { icon: "🗣️", title: "Debate Slams", desc: "Hone public speaking skills through formal British Parliamentary debates." },
      { icon: "📝", title: "Poetry Circles", desc: "Share original compositions, poetry slams, and creative writing prompts." },
      { icon: "🇺🇳", title: "MUN Delegations", desc: "Receive training to represent the college at Model United Nations." },
      { icon: "📖", title: "Writing Prompts", desc: "Contribute stories and editorials to the official campus newsletters." }
    ];
  } else {
    return [
      { icon: "🤝", title: "Community First", desc: "A welcoming ecosystem designed for collaborative development and learning." },
      { icon: "🔥", title: "Skill Bootcamps", desc: "Structured training sessions and hands-on workshops throughout the year." },
      { icon: "🎯", title: "Campus Impact", desc: "Lead projects and events that shape student life and leave a legacy." },
      { icon: "🎓", title: "Career Network", desc: "Connect with alumni working in top organizations for mentorship and referrals." }
    ];
  }
};



export default function CulturalClubDetailPage() {
  const params = useParams();
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState("About");
  const [lightboxImg, setLightboxImg] = useState(null);

  const slug = params ? params.slug : "";
  const club = allClubs.find((c) => getSlug(c.name) === slug && c.type === "cultural");

  if (!club) {
    return (
      <div className={styles.pageWrapper} style={{ '--accent-color': '#FFD600', '--accent-light': '#FFFDE7' }}>
        <div className={styles.container} style={{ textAlign: "center", padding: "120px 20px" }}>
          <h1 className={styles.clubTitle}>Club Not Found</h1>
          <p style={{ fontSize: "1.4rem", marginBottom: "2rem", fontWeight: "500" }}>
            We couldn't find any cultural club matching "{slug}".
          </p>
          <Link href="/campus-life/cultural" className={styles.backLink}>
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
  const features = getCategoryFeatures(club.category);
  const leaders = club.studentLeaders || [];

  const backUrl = "/campus-life/cultural";
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
                Official {club.category} Club
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
            <a href="#join" className={styles.ctaButton}>
              <span>Join Platform</span>
              <svg stroke="currentColor" fill="none" strokeWidth="3" viewBox="0 0 24 24" height="20" width="20">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
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
              <div className={styles.missionGrid}>
                <div className={styles.descriptionBox}>
                  <div className={styles.cardTag}>THE MISSION</div>
                  <p className={styles.descriptionText}>{club.description}</p>
                </div>
                <div className={styles.featuresGrid}>
                  {features.map((feat, idx) => (
                    <div key={idx} className={styles.featureCard}>
                      <span className={styles.featureNumber}>0{idx + 1}</span>
                      <span className={styles.featureIcon}>{feat.icon}</span>
                      <h4 className={styles.featureTitle}>{feat.title}</h4>
                      <span className={styles.featureDesc}>{feat.desc}</span>
                    </div>
                  ))}
                </div>
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
                        <div className={styles.eventContentColumn}>
                          <h4 className={styles.eventTitle}>{evt.title}</h4>
                          <p className={styles.eventDesc}>{evt.desc}</p>
                        </div>
                        {evt.img && (
                          <div className={styles.eventImgWrapper} onClick={() => setLightboxImg(evt.img)}>
                            <img src={evt.img} alt={evt.title} className={styles.eventImg} />
                          </div>
                        )}
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
