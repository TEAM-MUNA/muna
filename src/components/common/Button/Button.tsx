import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  size?: "sm" | "md" | "lg" | "xl" | undefined;
  fullWidth?: boolean;
  color?: "default" | "primary" | "primary_line" | "danger" | undefined;
  iconRight?: ReactNode | undefined;
  iconOnly?: ReactNode | undefined;
  className?: string | "";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  label,
  size,
  fullWidth = false,
  color,
  iconRight,
  iconOnly,
  className = "",
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${styles.btn} ${size ? styles[size] : ""} ${color ? styles[color] : ""} ${fullWidth ? styles.full : ""} ${className}`}
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
