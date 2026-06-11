"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ClubCard.module.css";

export default function ClubCard({ club }) {
    return (
        <Link
            href={`/campus-life/${club.slug}`}
            className={styles.cardLink}
        >
            <div className={styles.cardContainer}>

                <div className={styles.imageWrapper}>
                    <Image
                        src={club.image}
                        alt={club.name}
                        fill
                        className={styles.cardImage}
                    />
                </div>

                <div className={styles.cardBody}>
                    <div className={styles.badge}>
                        {club.type}
                    </div>

                    <h2 className={styles.title}>
                        {club.name}
                    </h2>

                    <p className={styles.description}>
                        {club.description}
                    </p>

                    <div className={styles.footer}>
                        <span className={styles.footerText}>
                            Explore Club
                        </span>

                        <div className={styles.arrowBtn}>
                            →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}