import React, { ReactNode } from "react";
import styles from "./Avatar.module.scss";
import image from "../../../assets/img/user-default.png"

interface AvatarCardProps{
    url?: string;
    nickName?: string;
    userName?: string;
}

export default function AvatarCard({
    url,
    nickName,
    userName,
}: AvatarCardProps) {
    return(
        <div className={styles.card}>
            <div className={styles.cardImg}>
                <img src={image} alt="님네임갱갱갱" className={styles.image} />
            </div>
            <div className={styles.cardText}>
                <p className={`${styles.md} ${styles.black} ${styles.bold}`}>{nickName}</p>
                <p className={`${styles.xs} ${styles.black_lighter}`}>{userName}</p>
            </div>
        </div>
    )
}