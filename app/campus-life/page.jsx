
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import BackToTop from "../components/BackToTop";
import ImportantLinks from "../components/ImportantLinks";


import { IT_MAIN_DATA } from "../data/it-main";
import ClubCard from "../components/card";

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


const Technical = {
    name: "Technical Clubs",
    slug: "technical",
    category: "campus-life",
    type: "Technical",
    image: "/assets/technical.png",
    description: "Build skills through coding, robotics, innovation, and real-world projects.",
};

const Cultural = {
    name: "Cultural Clubs",
    slug: "cultural",
    category: "campus-life",
    type: "Cultural",
    image: "/assets/cultural.png",
    description: "Express your creativity through music, dance, drama, art, and literature.",
};

export default function CampusLife() {
    return (
        <>
            <HeadAssets stylesheets={IT_MAIN_DATA.meta.stylesheets} fontPreloads={IT_MAIN_DATA.meta.fontPreloads} />
            <div className={`${IT_MAIN_DATA.meta.bodyClass} kiet-page-scope`}>
                <Navbar />
                <div className="container py-5 my-4">
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-5 d-flex">
                            <ClubCard club={Technical} />
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 d-flex">
                            <ClubCard club={Cultural} />
                        </div>
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

