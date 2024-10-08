import React, { useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import CaretIcon from "../../../assets/svg/CaretIcon";
import useClickOutside from "../../../hooks/useCloseOnOutsideClick";

interface DropdownSelectProps {
  options: string[];
  onSelect: (value: string) => void;
  outline?: boolean;
  position?: "left" | "right";
}

export default function DropdownSelect({
  options = [],
  onSelect,
  outline = true,
  position = "left",
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
        color={outline ? "default" : undefined}
        className={outline ? "" : styles.noline}
        size='md'
      />
      {isOpen && (
        <ul
          className={`${styles.dropdown_ul} ${position === "right" ? styles.dropdown_right : ""}`}
        >
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
