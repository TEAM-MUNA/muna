import React, { useState } from "react";
import styles from "./Toggle.module.scss";

export default function Toggle() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const onToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={onToggle}
      aria-label='토글 버튼'
      type='button'
      className={`${styles.toggle} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.toggle_circle} />
    </button>
  );
}
