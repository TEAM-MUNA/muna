import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
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
  const query = useSelector((state: RootState) => state.search.query); // query 상태 가져오기
  const [inputValue, setInputValue] = useState(query); // query와 동기화

  // query 상태 변경 시 inputValue 업데이트
  useEffect(() => {
    setInputValue(query);
  }, [query]);

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
      <label htmlFor='search-input' className='sr_only'>
        search-input
      </label>
      <input
        id='search-input'
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
