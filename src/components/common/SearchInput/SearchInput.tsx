import React from "react";
import styles from "./SearchInput.module.scss";
import SearchIcon from "../../../assets/svg/SearchIcon";
import CloseIcon from "../../../assets/svg/CloseIcon";
import Button from "../Button/Button";

interface SearchInputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SearchInput({
  placeholder = "",
  onChange = () => {},
  fullWidth = false,
  onClear = () => {},
}: SearchInputProps) {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      <span className={styles.icon_container}>
        <SearchIcon />
      </span>
      <input
        type='text'
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Button label='clear' iconOnly={<CloseIcon />} onClick={onClear} />
    </div>
  );
}
