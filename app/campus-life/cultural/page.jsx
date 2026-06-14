"use client";

import React from "react";
import { ClubsList } from "../../components/ClubsList";

export default function CulturalClubsPage() {
    return (
        <ClubsList defaultType="cultural" hideSwitcher={true} />
    );
}