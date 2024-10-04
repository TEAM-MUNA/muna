import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  size?: "sm" | "md" | "lg" | "xl" | undefined;
  fullWidth?: boolean;
  color?: "default" | "primary" | "primary_line" | "danger" | undefined;
  iconRight?: ReactNode | undefined;
  iconOnly?: ReactNode | undefined;
  iconShadow?: boolean;
  className?: string | "";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
}

export default function Button({
  label,
  size,
  fullWidth = false,
  color,
  iconRight,
  iconOnly,
  iconShadow = false,
  className = "",
  disabled = false,
  onClick = () => {},
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type === "button" ? "button" : "submit"}
      className={`
        ${styles.btn} 
        ${size ? styles[size] : ""} 
        ${color ? styles[color] : ""} 
        ${fullWidth ? styles.full : ""} 
        ${iconRight ? styles.has_icon_right : ""} 
        ${iconShadow ? styles.has_icon_shadow : ""} 
        ${className}
      `}
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
