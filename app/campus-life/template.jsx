"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CampusLifeTemplate({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier transition
      }}
    >
      {children}
    </motion.div>
  );
}
