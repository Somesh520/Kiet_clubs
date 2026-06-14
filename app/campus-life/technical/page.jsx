"use client";

import React from "react";
import { ClubsList } from "../../components/ClubsList";

export default function TechnicalClubsPage() {
    return (
        <ClubsList defaultType="technical" hideSwitcher={true} />
    );
}