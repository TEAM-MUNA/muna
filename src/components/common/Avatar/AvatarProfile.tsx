import React, { ReactNode } from "react";
import styles from "./Avatar.module.scss";
import image from "../../../assets/img/profile-image.png"

interface AvatarProfileProps {
    url?: string;
    nickName?: string;
    userName?: string;
}

export default function AvatarProfile({
    url,
    nickName,
    userName,
}: AvatarProfileProps) {
    return(
        <div className={styles.profile}>
            <div className={styles.profileImg}>
                <img src={image} alt="님네임갱갱갱" className={styles.image} />
            </div>
            <div className={styles.profileText}>
                <p className={`${styles.xl} ${styles.black} ${styles.bold}`}>{nickName}</p>
                <p className={`${styles.sm} ${styles.black_lighter}`}>{userName}</p>
            </div>
        </div>
    )
}