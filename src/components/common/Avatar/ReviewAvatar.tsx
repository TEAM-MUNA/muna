import React, { ReactNode } from "react";
import styles from "./Avatar.module.scss";
import image from "../../../assets/img/profile-image.png"

interface ReviewAvatarProps{
    url?: string;
    nickName?: string;
    userName?: string;
    watchDate?: string;
} 

export default function ReviewAvatar({
    url,
    nickName,
    userName,
    watchDate,
}: ReviewAvatarProps) {
    return(
        <div className={styles.reviewAvatar}>
            <div className={styles.reviewAvatarImg}>
                <img src={image} alt="님네임갱갱갱" className={styles.image} />
            </div>
            <div className={styles.reviewAvatarText}>
                <div className={styles.reviewAvatarTextTop}>
                    <p className={`${styles.md} ${styles.black} ${styles.bold}`}>{nickName}</p>
                    <p className={`${styles.xs} ${styles.black_lighter}`}>{userName}</p>
                </div>
                <p className={`${styles.reviewAvatarWatchDay} ${styles.sm} ${styles.black_light} ${styles.regular}`}>{watchDate}</p>
            </div>
        </div>
    )
}