import React from "react";
import styles from "./SearchInput.module.scss";
import SearchIcon from "../../../assets/svg/SearchIcon";
import CloseIcon from "../../../assets/svg/CloseIcon";

interface SearchInputProps {
  placeholder?: string;
  onChange?: () => void;
  fullWidth?: boolean;
  onClear?: () => void;
}

export default function SearchInput({
  placeholder = "",
  onChange = () => {},
  fullWidth = false,
  onClear = () => {},
}: SearchInputProps) {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      <SearchIcon />
      <input
        type='text'
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
      <button className={styles.clear} type='button' onClick={onClear}>
        <CloseIcon />
      </button>
    </div>
  );
}
