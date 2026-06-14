"use client";

import React from "react";
import ClubCard from "../components/card";

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
    );
}
