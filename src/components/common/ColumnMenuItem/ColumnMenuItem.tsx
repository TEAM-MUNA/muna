import React, { ReactNode } from "react";
import styles from "./ColumnMenuItem.module.scss";

interface ColumnMenuItemProps {
  label: string;
  buttonRight?: ReactNode;
  // className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ColumnMenuItem({
  label = "",
  buttonRight,
  onClick,
}: ColumnMenuItemProps) {
  return (
    <li>
      <button
        type='button'
        onClick={onClick}
        className={`${styles.column_menu_item} ${!buttonRight ? styles.without_icon : ""}`}
      >
        {label}
        {buttonRight && buttonRight}
      </button>
    </li>
  );
}
