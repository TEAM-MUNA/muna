import React, { useState } from "react";
import styles from "./TabButton.module.scss";

interface TabButtonProps {
  label: string;
}

export default function TabButton({ label }: TabButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const handleTabButton = () => {
    setIsActive((prevState) => !prevState);
  };
  return (
    <button
      type='button'
      className={`${styles.tab_btn} ${isActive ? styles.active : null}`}
      onClick={handleTabButton}
    >
      {label}
    </button>
  );
}
