import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";
import KebabMenuIcon from "../../../assets/svg/KebabMenuIcon";

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setIsOpen(false);
    onSelect(value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target as Node)
      // 클릭한 위치가 드롭다운이 아닐 때
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
