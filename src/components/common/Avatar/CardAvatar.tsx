import React from "react";
import styles from "./Avatar.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";

export default function CardAvatar({
  nickname = defaultUserProps.nickname,
  userId = defaultUserProps.userId,
  userImage = defaultUserProps.userImage,
}: UserProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={userImage} alt={nickname} className={styles.image} />
      </div>
      <div className={styles.cardText}>
        <p className={`${styles.md} ${styles.black} ${styles.bold}`}>
          {nickname}
        </p>
        <p className={`${styles.xs} ${styles.black_lighter}`}>{userId}</p>
      </div>
    </div>
  );
}
