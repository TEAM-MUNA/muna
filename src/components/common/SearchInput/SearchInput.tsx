import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
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
  const [inputValue, setInputValue] = useState("");

  // 디바운싱 적용
  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      const trimmedValue = value.trim();
      if (trimmedValue !== "") {
        dispatch(setQuery(trimmedValue));
      } else {
        dispatch(clearQuery());
      }
    }, 700), // 700ms 지연
    [dispatch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value); // 로컬 상태 업데이트 (즉각적)
    debouncedSetQuery(value); // 디바운싱된 Redux 상태 업데이트
  };

  const handleClear = () => {
    setInputValue("");
    dispatch(clearQuery());
  };

  // 컴포넌트 언마운트 시 디바운싱된 함수 취소
  useEffect(
    () => () => {
      debouncedSetQuery.cancel();
    },
    [debouncedSetQuery]
  );

  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      <span className={styles.icon_container}>
        <SearchIcon />
      </span>
      <input
        value={inputValue}
        type='text'
        className={styles.input}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Button label='clear' iconOnly={<CloseIcon />} onClick={handleClear} />
    </div>
  );
}
