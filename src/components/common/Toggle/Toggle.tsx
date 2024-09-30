import React from "react";
import styles from "./Toggle.module.scss";

interface ToggleProps {
  onClick?: () => void;
  isActive?: boolean;
}

export default function Toggle({
  onClick = () => {},
  isActive = false,
}: ToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label='토글 버튼'
      type='button'
      className={`${styles.toggle} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.toggle_circle} />
    </button>
  );
}
