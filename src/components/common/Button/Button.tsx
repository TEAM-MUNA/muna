import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  size?: "sm" | "md" | "lg" | "xl" | "";
  fullWidth?: boolean;
  color?: "default" | "primary" | "primary_line" | "danger" | "";
  iconRight?: ReactNode | null;
  iconOnly?: ReactNode | null;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  label = "",
  size = "",
  fullWidth = false,
  color = "",
  iconRight,
  iconOnly,
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${styles.btn} ${styles[size]} ${styles[color]} ${fullWidth ? styles.full : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {iconOnly ? (
        <>
          <span className='sr_only'>{label}</span>
          {iconOnly}
        </>
      ) : (
        <>
          {label}
          {iconRight && iconRight}
        </>
      )}
    </button>
  );
}
