import React from "react";
import { Link } from "react-router-dom";
import styles from "./Avatar.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";

interface AvatarProps extends UserProps {
  size?: "md" | "lg";
}

export default function Avatar({
  size = "md",
  userLink = defaultUserProps.userLink,
  nickname = defaultUserProps.nickname,
  userId = defaultUserProps.userId,
  profileImage = defaultUserProps.profileImage,
}: AvatarProps) {
  const avatarContent = (
    <>
      <img src={profileImage} alt={nickname} />
      <div className={styles.text}>
        <p className={styles.nickname}>{nickname}</p>
        <p className={styles.id}>{userId}</p>
      </div>
    </>
  );

  return userLink ? (
    <Link to={userLink} className={`${styles.avatar} ${styles[size]}`}>
      {avatarContent}
    </Link>
  ) : (
    <div className={`${styles.avatar} ${styles[size]}`}>{avatarContent}</div>
  );
}
