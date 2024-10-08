import React, { JSX } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value?: string; // 외부에서 값을 받아올 수 있도록 수정
  label?: string;
  error?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  name?: string;
  message?: string;
  icon?: JSX.Element;
  fullWidth?: boolean;
}

export default function Input({
  value,
  label = "",
  placeholder = "",
  error = false,
  message = "",
  disabled = false,
  onChange = () => {},
  type = "text",
  name = "",
  icon = undefined,
  fullWidth = false,
}: InputProps) {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.input_icon_container}>
        <input
          type={type}
          name={name}
          className={styles.input}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
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
