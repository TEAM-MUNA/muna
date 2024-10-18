import React, { useEffect, useState } from "react";
import styles from "./CalendarInput.module.scss";

interface CalendarInputProps {
  fullWidth?: boolean;
}

export default function CalendarInput({
  fullWidth = false,
}: CalendarInputProps) {
  const placeholder = "공연 관람일을 입력하세요";
  const [date, setDate] = useState<string>("");
  const isEmptyDate = date === placeholder;

  useEffect(() => {
    if (!date) {
      setDate(placeholder);
    }
  }, [date]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      <input
        className={`${styles.calendarInput} ${isEmptyDate ? styles.emptyDate : ""}`}
        type='date'
        placeholder={date}
        value={isEmptyDate ? "" : date}
        onChange={onChange}
      />
    </div>
  );
}
