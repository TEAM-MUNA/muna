import React from "react";
import { Link } from "react-router-dom";
import styles from "./Avatar.module.scss";
import { UserType, defaultUserType } from "../../../types/userType";

interface ReviewAvatarProps extends UserType {
  watchDate?: string;
  userLink?: string;
}

export default function ReviewAvatar({
  nickname = defaultUserType.nickname,
  userId = defaultUserType.userId,
  profileImage = defaultUserType.profileImage,
  watchDate = "2020.10.21 관람",
  userLink = "",
}: ReviewAvatarProps) {
  return (
    <Link to={userLink} className={styles.reviewAvatar}>
      <div className={styles.reviewAvatarImg}>
        <img
          src={profileImage || defaultUserType.profileImage}
          alt={nickname}
          className={styles.image}
        />
      </div>
      <div className={styles.reviewAvatarText}>
        <div className={styles.reviewAvatarTextTop}>
          <p className={`${styles.md} ${styles.black} ${styles.bold}`}>
            {nickname}
          </p>
          <p className={`${styles.xs} ${styles.black_lighter}`}>{userId}</p>
        </div>
        <p
          className={`${styles.reviewAvatarWatchDay} ${styles.sm} ${styles.black_light} ${styles.regular}`}
        >
          {watchDate}
        </p>
      </div>
    </Link>
  );
}
