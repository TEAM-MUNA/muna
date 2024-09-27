import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "primary_line" | "danger";
  icon?: ReactNode | null;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label = "",
  size = "md",
  color = "default",
  icon = null,
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${styles.btn} ${styles[size]} ${styles[color]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
      {icon && icon}
    </button>
  );
}
