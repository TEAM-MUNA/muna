import React from "react";
import styles from "./Avatar.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";

interface AvatarProps extends UserProps {
  size?: "md" | "lg";
}

export default function Avatar({
  size = "md",
  nickname = defaultUserProps.nickname,
  userId = defaultUserProps.userId,
  userImage = defaultUserProps.userImage,
}: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      <img src={userImage} alt={nickname} />
      <div className={styles.text}>
        <p className={styles.nickname}>{nickname}</p>
        <p className={styles.id}>{userId}</p>
      </div>
    </div>
  );
}
