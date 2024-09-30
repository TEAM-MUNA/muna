import React, { useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import CaretIcon from "../../../assets/svg/CaretIcon";
import useClickOutside from "../../../hooks/useCloseOnOutsideClick";

interface DropdownSelectProps {
  options: string[];
  onSelect: (value: string) => void;
}

export default function DropdownSelect({
  options = [],
  onSelect,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(options[0]);
  const dropdownSelectRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownSelectRef, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.dropdown} ref={dropdownSelectRef}>
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
