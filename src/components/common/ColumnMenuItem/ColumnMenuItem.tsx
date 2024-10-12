import React, { ReactNode } from "react";
import styles from "./ColumnMenuItem.module.scss";

interface ColumnMenuItemProps {
  label: string;
  buttonRight?: ReactNode;
  // className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isFaded?: boolean;
  disabled?: boolean;
}

export default function ColumnMenuItem({
  label = "",
  buttonRight,
  onClick,
  isFaded = false,
  disabled = false,
}: ColumnMenuItemProps) {
  return (
    <li className={`${styles.column_menu_li} ${isFaded ? styles.faded : ""}`}>
      <button
        type='button'
        onClick={onClick}
        className={`${styles.column_menu_item} ${!buttonRight ? styles.without_icon : ""}`}
        disabled={disabled}
      >
        {label}
        {buttonRight && buttonRight}
      </button>
    </li>
  );
}
