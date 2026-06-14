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

export const ALL_CLUBS = [
  ...TECHNICAL_CLUBS,
  ...CULTURAL_CLUBS
];
