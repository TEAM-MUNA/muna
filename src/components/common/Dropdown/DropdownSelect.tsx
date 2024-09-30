import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import CaretIcon from "../../../assets/svg/CaretIcon";

interface DropdownSelectProps {
  options: string[];
  onSelect: (value: string) => void;
  label?: string;
}
// TODO: 로직 훅으로 관리하기 / 추후 고려
export default function DropdownSelect({
  options = [],
  onSelect,
  label,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(options[0]);
  const dropdownSelectRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect(value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownSelectRef.current &&
      !dropdownSelectRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownSelectRef}>
      {label}
      <Button
        label={selected}
        iconRight={<CaretIcon />}
        onClick={toggleDropdown}
        color='default'
        size='md'
      />
      {isOpen && (
        <ul className={`${styles.dropdown_ul}`}>
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.dropdown_li} ${option === selected ? styles.selected : ""}`}
            >
              <button type='button' onClick={() => handleSelect(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
