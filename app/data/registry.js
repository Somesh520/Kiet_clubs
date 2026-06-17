import innogeeks from './clubs-data/innogeeks.json';
import e_yantra from './clubs-data/e-yantra.json';
import cp_byte from './clubs-data/cp-byte.json';
import creative_cell from './clubs-data/creative-cell.json';
import kinesis_technical_society from './clubs-data/kinesis-technical-society.json';
import aayushmaan_club from './clubs-data/aayushmaan-club.json';
import autodrag from './clubs-data/autodrag.json';
import dsdl from './clubs-data/dsdl.json';
import dinobots from './clubs-data/dinobots.json';
import e_cell from './clubs-data/e-cell.json';
import ece_vlsi_design_club from './clubs-data/ece-vlsi-design-club.json';
import enovat_x from './clubs-data/enovat-x.json';
import fosscu from './clubs-data/fosscu.json';
import geek_room_kiet_chapter from './clubs-data/geek-room-kiet-chapter.json';
import google_developer_groups from './clubs-data/google-developer-groups.json';
import hobby_club from './clubs-data/hobby-club.json';
import industrial_electronics_and_control_club from './clubs-data/industrial-electronics-and-control-club.json';
import kiet_product_innovation_center from './clubs-data/kiet-product-innovation-center.json';
import kodekar_club from './clubs-data/kodekar-club.json';
import mlsa from './clubs-data/mlsa.json';
import pharma_innovation_club from './clubs-data/pharma-innovation-club.json';
import saekiet from './clubs-data/saekiet.json';
import socio_tech_innovation_club from './clubs-data/socio-tech-innovation-club.json';
import technocrats from './clubs-data/technocrats.json';
import kiet_music_club from './clubs-data/kiet-music-club.json';
import phoenix_dance_crew from './clubs-data/phoenix-dance-crew.json';
import steppers_dance_crew from './clubs-data/steppers-dance-crew.json';
import vpaksh_kiet_dramatics_society from './clubs-data/vpaksh-kiet-dramatics-society.json';
import ek_prayass from './clubs-data/ek-prayass.json';
import uddeshhya from './clubs-data/uddeshhya.json';
import kiet_movie_society from './clubs-data/kiet-movie-society.json';
import fc_kiet from './clubs-data/fc-kiet.json';
import kavyanjali from './clubs-data/kavyanjali.json';
import odyssey from './clubs-data/odyssey.json';
import e_booster_club from './clubs-data/e-booster-club.json';
import ek_bharat_shreshtha_bharat from './clubs-data/ek-bharat-shreshtha-bharat.json';
import kiet_model_united_nations from './clubs-data/kiet-model-united-nations.json';
import national_cadet_corps from './clubs-data/national-cadet-corps.json';
import national_service_scheme from './clubs-data/national-service-scheme.json';
import pragmatic_fashion_society from './clubs-data/pragmatic-fashion-society.json';
import spark_creations from './clubs-data/spark-creations.json';
import tedxkiet from './clubs-data/tedxkiet.json';
import the_impeccables from './clubs-data/the-impeccables.json';
import women_outreach_cell from './clubs-data/women-outreach-cell.json';

const rawTechnical = [
  innogeeks,
  e_yantra,
  cp_byte,
  creative_cell,
  kinesis_technical_society,
  aayushmaan_club,
  autodrag,
  dsdl,
  dinobots,
  e_cell,
  ece_vlsi_design_club,
  enovat_x,
  fosscu,
  geek_room_kiet_chapter,
  google_developer_groups,
  hobby_club,
  industrial_electronics_and_control_club,
  kiet_product_innovation_center,
  kodekar_club,
  mlsa,
  pharma_innovation_club,
  saekiet,
  socio_tech_innovation_club,
  technocrats
];

const rawCultural = [
  kiet_music_club,
  phoenix_dance_crew,
  steppers_dance_crew,
  vpaksh_kiet_dramatics_society,
  ek_prayass,
  uddeshhya,
  kiet_movie_society,
  fc_kiet,
  kavyanjali,
  odyssey,
  e_booster_club,
  ek_bharat_shreshtha_bharat,
  kiet_model_united_nations,
  national_cadet_corps,
  national_service_scheme,
  pragmatic_fashion_society,
  spark_creations,
  tedxkiet,
  the_impeccables,
  women_outreach_cell
];

const getClubFacultyCoordinator = (club) => {
  if (club.teacherCoordinators && club.teacherCoordinators.length > 0) {
    return club.teacherCoordinators.map(t => {
      if (typeof t === 'string') {
        return { name: t, role: "Faculty Coordinator", img: "" };
      }
      return {
        name: t.name || "",
        role: t.role || "Faculty Coordinator",
        img: t.img || "",
        email: t.email || ""
      };
    });
  }
  return [];
};

const getClubDepartment = (club) => {
  return club.department || "";
};

export const TECHNICAL_CLUBS = rawTechnical.map(c => {
  const type = 'technical';
  const department = getClubDepartment(c);
  const teacherCoordinators = getClubFacultyCoordinator(c);
  return { ...c, type, department, teacherCoordinators };
});

export const CULTURAL_CLUBS = rawCultural.map(c => {
  const type = 'cultural';
  const department = getClubDepartment(c);
  const teacherCoordinators = getClubFacultyCoordinator(c);
  return { ...c, type, department, teacherCoordinators };
});

// Export combined technical and cultural clubs registry
export const ALL_CLUBS = [
  ...TECHNICAL_CLUBS,
  ...CULTURAL_CLUBS
];

// Neobrutalist Dynamic Colors
export const getCategoryColors = (category) => {
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
export const getCategoryFeatures = (category) => {
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

