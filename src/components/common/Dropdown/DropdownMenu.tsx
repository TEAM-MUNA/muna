import React, { useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import KebabMenuIcon from "../../../assets/svg/KebabMenuIcon";
import useClickOutside from "../../../hooks/useCloseOnOutsideClick";

interface DropdownMenuProps {
  options: string[];
  onSelect: (value: string) => void;
}

export default function DropdownMenu({
  options = [],
  onSelect,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownMenuRef, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.dropdown} ref={dropdownMenuRef}>
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
