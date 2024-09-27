import React from "react";
import styles from "./Tag.module.scss";

interface TagProps {
  label?: string | null;
  color?: "default" | "primary" | "black";
}

export default function Tag({ label = "test", color = "default" }: TagProps) {
  return <span className={`${styles.btn} ${styles[color]}`}>{label}</span>;
}
