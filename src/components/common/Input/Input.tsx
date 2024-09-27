import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  label?: string;
  error?: boolean;
  placeholder?: string;
  onChange?: () => void;
  disabled?: boolean;
  type?: string;
  message?: string;
}

export default function Input({
  label = "",
  placeholder = "",
  error = false,
  message = "",
  disabled = false,
  onChange = () => {},
  type = "text",
}: InputProps) {
  return (
    <div className={styles.container}>
      {label && <p className={styles.label}>{label}</p>}
      <input
        type={type}
        className={styles.input}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className={`${styles.line} ${error ? styles.error : ""}`} />
      {message && (
        <p className={`${styles.message} ${error ? styles.error : ""}`}>
          {message}
        </p>
      )}
    </div>
  );
}
