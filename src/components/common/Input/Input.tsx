import React, { JSX } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  label?: string;
  error?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  message?: string;
  icon?: JSX.Element;
  fullWidth?: boolean;
}

export default function Input({
  label = "",
  placeholder = "",
  error = false,
  message = "",
  disabled = false,
  onChange = () => {},
  type = "text",
  icon = undefined,
  fullWidth = false,
}: InputProps) {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles["input-icon-container"]}>
        <input
          type={type}
          className={styles.input}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
        />
        {/* TODO: 아이콘 크기 수정하기 */}
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={`${styles.line} ${error ? styles.error : ""}`} />
      {message && (
        <p className={`${styles.message} ${error ? styles.error : ""}`}>
          {message}
        </p>
      )}
    </div>
  );
}
