import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import KebabMenuIcon from "../../../assets/svg/KebabMenuIcon";

interface DropdownMenuProps {
  options: string[];
  onSelect: (value: string) => void;
  label?: string;
}

export default function DropdownMenu({
  options = [],
  onSelect,
  label,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.dropdown}>
      {label}
      <Button
        label='menu'
        iconOnly={<KebabMenuIcon />}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <ul className={`${styles.dropdown_ul} ${styles.dropdown_right}`}>
          {options.map((option) => (
            <li key={option} className={`${styles.dropdown_li}`}>
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
