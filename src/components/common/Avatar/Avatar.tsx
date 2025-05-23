import React from "react";
import { Link } from "react-router-dom";
import styles from "./Avatar.module.scss";
import { UserType, defaultUserType } from "../../../types/userType";

interface AvatarProps extends UserType {
  size?: "md" | "lg";
}

export default function Avatar({
  size = "md",
  nickname = defaultUserType.nickname,
  userId = defaultUserType.userId,
  profileImage = defaultUserType.profileImage,
}: AvatarProps) {
  const avatarContent = (
    <>
      <img src={profileImage || defaultUserType.profileImage} alt={nickname} />
      <div className={styles.text}>
        <p className={styles.nickname}>{nickname}</p>
        <p className={styles.id}>{userId}</p>
      </div>
    </>
  );

  return size === "lg" ? (
    <div className={`${styles.avatar} ${styles[size]}`}>{avatarContent}</div>
  ) : (
    <Link
      to={`/profile/${userId}`}
      className={`${styles.avatar} ${styles[size]}`}
    >
      {avatarContent}
    </Link>
  );
}
