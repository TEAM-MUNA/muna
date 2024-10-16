import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { clearQuery, setQuery } from "../../../slices/searchSlice";
import styles from "./SearchInput.module.scss";
import SearchIcon from "../../../assets/svg/SearchIcon";
import CloseIcon from "../../../assets/svg/CloseIcon";
import Button from "../Button/Button";

interface SearchInputProps {
  placeholder?: string;
  fullWidth?: boolean;
}

export default function SearchInput({
  placeholder = "",
  fullWidth = false,
}: SearchInputProps) {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleClear = () => {
    dispatch(clearQuery());
  };

  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      <span className={styles.icon_container}>
        <SearchIcon />
      </span>
      <input
        value={query}
        type='text'
        className={styles.input}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Button label='clear' iconOnly={<CloseIcon />} onClick={handleClear} />
    </div>
  );
}
