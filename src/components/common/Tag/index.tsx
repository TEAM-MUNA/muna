import React from "react";
import styles from "./style.module.scss";

interface TagProps {
  label?: string | null;
  color?: "default" | "primary" | "black";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Tag({
  label = "test",
  color = "default",
  disabled = false,
  onClick = () => {},
}: TagProps) {
  return (
    <button
      type='button'
      className={`${styles.btn}  ${styles[color]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
