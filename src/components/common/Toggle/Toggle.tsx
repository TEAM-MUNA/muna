import React from "react";
import styles from "./Toggle.module.scss";
import useToggle from "../../../hooks/useToggle";

interface ToggleProps {
  initialState?: boolean;
  onChange?: (isActive: boolean) => void;
}

export default function Toggle({
  initialState = false,
  onChange,
}: ToggleProps) {
  const { isActive, onToggle } = useToggle(initialState);

  const handleToggle = () => {
    onToggle();
    if (onChange) {
      onChange(!isActive);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label='토글 버튼'
      type='button'
      className={`${styles.toggle} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.toggle_circle} />
    </button>
  );
}
