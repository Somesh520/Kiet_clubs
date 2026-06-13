"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./ClubDetail.module.css";

// Import core layout files and data
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import ImportantLinks from "../../components/ImportantLinks";
import { IT_MAIN_DATA } from "../../data/it-main";
import { CLUBS_DATA as TECHNICAL_DATA } from "../../data/technical_club_data";
import { CLUBS_DATA as CULTURAL_DATA } from "../../data/cultural_club_data";

// Extract metadata styles
function HeadAssets({ stylesheets, fontPreloads }) {
  return (
    <>
      {fontPreloads.map((href) => (
        <link key={href} rel="preload" href={href} as="font" crossOrigin="" />
      ))}
      {stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}

// Global WhatsApp and Admission Widgets
function FloatingWidgets() {
  return (
    <>
      <div className="right-rotate-90">
        <a target="_blank" rel="noopener noreferrer" className="text-decoration-none" href="https://admission.kiet.edu/">
          <p className="d-flex justify-content-center align-items-center cursor-pointer">
            <span>Register For Admission 2026-27</span>
          </p>
        </a>
      </div>
      <div className="whatsapp-rotate">
        <a target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center justify-content-center" href="https://api.whatsapp.com/send/?phone=918588811998&text&app_absent=0">
          <span className="text-white fw-bold">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" color="#fff" style={{ color: "#fff" }} height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z" />
            </svg>
          </span>
        </a>
      </div>
    </>
  );
}

// Flat list of all clubs
const allClubs = [
  ...TECHNICAL_DATA.technical.clubs.map((c) => ({ ...c, type: "technical" })),
  ...CULTURAL_DATA.cultural.clubs.map((c) => ({ ...c, type: "cultural" })),
];

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
      return { accent: "#00E676", light: "#E8F5E9" }; // Neon Green
    case "ROBOTICS":
    case "INNOVATION":
      return { accent: "#FF9100", light: "#FFF3E0" }; // Bright Orange
    case "DESIGN":
      return { accent: "#E040FB", light: "#FDF0FD" }; // Bright Pink
    case "MUSIC":
      return { accent: "#FF1744", light: "#FFEBEE" }; // Neon Red
    case "DANCE":
      return { accent: "#76FF03", light: "#F1F8E9" }; // Lime Green
    case "DRAMATICS":
      return { accent: "#FF5722", light: "#FBE9E7" }; // Deep Orange
    case "PHOTOGRAPHY":
      return { accent: "#2979FF", light: "#E3F2FD" }; // Electric Blue
    case "LITERARY":
      return { accent: "#AA00FF", light: "#F3E5F5" }; // Purple
    default:
      return { accent: "#FFD600", light: "#FFFDE7" }; // Warm Yellow
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

// Neobrutalist Mock Core Leaders
const getMockLeaders = (category) => {
  const normalized = (category || "").toUpperCase();
  const baseImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80"
  ];

  if (normalized === "CODING" || normalized === "CYBERSECURITY") {
    return [
      { name: "Aarav Sharma", role: "Lead Coordinator", img: baseImages[0] },
      { name: "Ananya Iyer", role: "Technical Head", img: baseImages[1] },
      { name: "Kabir Verma", role: "DevOps Lead", img: baseImages[2] },
      { name: "Riya Sen", role: "UI/UX Coordinator", img: baseImages[3] }
    ];
  } else if (normalized === "ROBOTICS" || normalized === "INNOVATION") {
    return [
      { name: "Ishaan Goel", role: "Lead Coordinator", img: baseImages[0] },
      { name: "Meera Nair", role: "Hardware Head", img: baseImages[1] },
      { name: "Aditya Roy", role: "Embedded Systems Lead", img: baseImages[2] },
      { name: "Tara Kapoor", role: "CAD Designer", img: baseImages[3] }
    ];
  } else if (normalized === "DESIGN") {
    return [
      { name: "Rohan Das", role: "Lead Coordinator", img: baseImages[0] },
      { name: "Siya Mehra", role: "Product Design Head", img: baseImages[1] },
      { name: "Devansh Gupta", role: "Brand Lead", img: baseImages[2] },
      { name: "Nisha Patel", role: "Motion Design Head", img: baseImages[3] }
    ];
  } else if (normalized === "MUSIC") {
    return [
      { name: "Aryan Kapoor", role: "Band Coordinator", img: baseImages[0] },
      { name: "Shreya Ghoshal", role: "Lead Vocalist", img: baseImages[1] },
      { name: "Neil D'Souza", role: "Instrumental Head", img: baseImages[2] },
      { name: "Pooja Hegde", role: "Production Coordinator", img: baseImages[3] }
    ];
  } else if (normalized === "DANCE") {
    return [
      { name: "Varun Dhawan", role: "Crew Lead", img: baseImages[0] },
      { name: "Natasha Dalal", role: "Contemporary Head", img: baseImages[1] },
      { name: "Hrithik Roshan", role: "Hip-Hop Choreographer", img: baseImages[2] },
      { name: "Kiara Advani", role: "Classical Lead", img: baseImages[3] }
    ];
  } else if (normalized === "DRAMATICS") {
    return [
      { name: "Rajkummar Rao", role: "Stage Director", img: baseImages[0] },
      { name: "Alia Bhatt", role: "Lead Actress", img: baseImages[1] },
      { name: "Vicky Kaushal", role: "Scriptwriter Head", img: baseImages[2] },
      { name: "Kriti Sanon", role: "Production Manager", img: baseImages[3] }
    ];
  } else if (normalized === "PHOTOGRAPHY") {
    return [
      { name: "Ranbir Kapoor", role: "Director of Photography", img: baseImages[0] },
      { name: "Katrina Kaif", role: "Chief Editor", img: baseImages[1] },
      { name: "Siddharth Malhotra", role: "Lighting Tech Lead", img: baseImages[2] },
      { name: "Shraddha Kapoor", role: "Event Coverage Coordinator", img: baseImages[3] }
    ];
  } else if (normalized === "LITERARY") {
    return [
      { name: "Shashi Tharoor", role: "Debate President", img: baseImages[0] },
      { name: "Arundhati Roy", role: "Creative Writing Head", img: baseImages[1] },
      { name: "Vikram Seth", role: "MUN Coordinator", img: baseImages[2] },
      { name: "Jhumpa Lahiri", role: "Chief Editor", img: baseImages[3] }
    ];
  } else {
    return [
      { name: "Aarav Sharma", role: "Lead Coordinator", img: baseImages[0] },
      { name: "Ananya Iyer", role: "Technical Head", img: baseImages[1] },
      { name: "Kabir Verma", role: "Operations Lead", img: baseImages[2] },
      { name: "Riya Sen", role: "PR Coordinator", img: baseImages[3] }
    ];
  }
};

export default function ClubDetailPage() {
  const params = useParams();
  const [imgError, setImgError] = useState(false);

  const slug = params ? params.slug : "";
  const club = allClubs.find((c) => getSlug(c.name) === slug);

  if (!club) {
    return (
      <>
        <HeadAssets stylesheets={IT_MAIN_DATA.meta.stylesheets} fontPreloads={IT_MAIN_DATA.meta.fontPreloads} />
        <div className={`${IT_MAIN_DATA.meta.bodyClass} kiet-page-scope`}>
          <Navbar />
          <div className={styles.pageWrapper} style={{ '--accent-color': '#FFD600', '--accent-light': '#FFFDE7' }}>
            <div className={styles.container} style={{ textAlign: "center", padding: "120px 20px" }}>
              <h1 className={styles.clubTitle}>Club Not Found</h1>
              <p style={{ fontSize: "1.4rem", marginBottom: "2rem", fontWeight: "500" }}>
                We couldn't find any club matching "{slug}".
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
          <Footer />
          <FloatingWidgets />
          <ImportantLinks />
          <BackToTop />
        </div>
      </>
    );
  }

  const colors = getCategoryColors(club.category);
  const features = getCategoryFeatures(club.category);
  const leaders = getMockLeaders(club.category);

  const backUrl = club.type === "cultural" ? "/campus-life/cultural" : "/campus-life/technical";

  return (
    <>
      <HeadAssets stylesheets={IT_MAIN_DATA.meta.stylesheets} fontPreloads={IT_MAIN_DATA.meta.fontPreloads} />
      <div className={`${IT_MAIN_DATA.meta.bodyClass} kiet-page-scope`}>
        <Navbar />
        <motion.div
          className={styles.pageWrapper}
          style={{
            "--accent-color": colors.accent,
            "--accent-light": colors.light,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                <span className={styles.chapterLabel}>
                  Official {club.category} {club.type === "cultural" ? "Club" : "Chapter"}
                </span>
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

            {/* Mission Section */}
            <section className={styles.missionSection}>
              <h2 className={styles.sectionHeading}>The Mission</h2>
              <div className={styles.missionGrid}>
                <div className={styles.descriptionBox}>
                  <p className={styles.descriptionText}>{club.description}</p>
                </div>
                <div className={styles.featuresGrid}>
                  {features.map((feat, idx) => (
                    <div key={idx} className={styles.featureCard}>
                      <span className={styles.featureIcon}>{feat.icon}</span>
                      <h4 className={styles.featureTitle}>{feat.title}</h4>
                      <span className={styles.featureDesc}>{feat.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Leadership Section */}
            <section className={styles.leadershipSection}>
              <h2 className={styles.sectionHeading}>Core Leadership</h2>
              <div className={styles.leadersGrid}>
                {leaders.map((leader, idx) => (
                  <div key={idx} className={styles.leaderCard}>
                    <div className={styles.avatarWrapper}>
                      <img
                        src={leader.img}
                        alt={leader.name}
                        className={styles.leaderAvatar}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.leaderInfo}>
                      <span className={styles.leaderRole}>{leader.role}</span>
                      <h4 className={styles.leaderName}>{leader.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
        <Footer />
        <FloatingWidgets />
        <ImportantLinks />
        <BackToTop />
      </div>
    </>
  );
}
