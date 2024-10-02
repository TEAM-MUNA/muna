import React from "react";
import { Link } from "react-router-dom";
import styles from "./Avatar.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";

interface AvatarProps extends UserProps {
  size?: "md" | "lg";
  link?: string;
}

export default function Avatar({
  size = "md",
  link = "#",
  nickname = defaultUserProps.nickname,
  userId = defaultUserProps.userId,
  userImage = defaultUserProps.userImage,
}: AvatarProps) {
  return (
    <Link to={link} className={`${styles.avatar} ${styles[size]}`}>
      <img src={userImage} alt={nickname} />
      <div className={styles.text}>
        <p className={styles.nickname}>{nickname}</p>
        <p className={styles.id}>{userId}</p>
      </div>
    </Link>
  );
}
