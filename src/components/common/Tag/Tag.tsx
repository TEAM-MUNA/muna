import React from "react";
import styles from "./Tag.module.scss";

interface TagProps {
  label?: string | null;
  color?: "default" | "primary" | "black" | "white" | "black_line";
}

export default function Tag({ label = "test", color = "default" }: TagProps) {
  return <span className={`${styles.tag} ${styles[color]}`}>{label}</span>;
}
