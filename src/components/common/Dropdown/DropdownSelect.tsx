import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import CaretIcon from "../../../assets/svg/CaretIcon";

interface DropdownSelectProps {
  options: string[];
  onSelect: (value: string) => void;
  label?: string;
}

export default function DropdownSelect({
  options = [],
  onSelect,
  label,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.dropdown}>
      {label}
      <Button
        label={selected}
        icon={<CaretIcon />}
        onClick={toggleDropdown}
        color='default'
        size='md'
      />
      {isOpen && (
        <ul className={styles.dropdown_ul}>
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
