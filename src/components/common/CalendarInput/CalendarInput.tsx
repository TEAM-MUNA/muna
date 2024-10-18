import React, { useEffect, useState } from "react";
import styles from "./CalendarInput.module.scss";

interface CalendarInputProps {
  fullWidth?: boolean;
  onCalendarChange: (date: string) => void;
  currentDate?: string;
}

export default function CalendarInput({
  fullWidth = false,
  onCalendarChange,
  currentDate,
}: CalendarInputProps) {
  const placeholder = "공연 관람일을 입력하세요";
  const [date, setDate] = useState<string>(currentDate || "");
  const isEmptyDate = date === placeholder;

  useEffect(() => {
    if (!date) {
      setDate(placeholder);
    }
  }, [date]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    onCalendarChange(selectedDate);
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
