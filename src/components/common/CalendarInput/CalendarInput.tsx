import React, { useEffect, useRef, useState } from "react";
import styles from "./CalendarInput.module.scss";
import CalendarIcon from "../../../assets/svg/CalendarIcon";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!date) {
      setDate(placeholder);
    }
  }, [date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    onCalendarChange(selectedDate);
  };

  const handleClick = () => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).showPicker();
    }
  };

  return (
    <div
      role='button'
      className={`${styles.container} ${fullWidth ? styles.full : ""}`}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <label htmlFor='calendar-input' className='sr_only'>
        calendar-input
      </label>
      <input
        id='calendar-input'
        ref={inputRef}
        className={`${styles.calendarInput} ${isEmptyDate ? styles.emptyDate : ""}`}
        type='date'
        placeholder={date.replace(/-/g, ".")}
        value={isEmptyDate ? "" : date}
        onChange={handleChange}
      />
      <span className={styles.calendar_icon}>
        <CalendarIcon size='20' />
      </span>
    </div>
  );
}
