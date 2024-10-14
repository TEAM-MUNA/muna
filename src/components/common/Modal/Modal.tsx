import React from "react";
import Button, { ButtonProps } from "../Button/Button";
import CloseIcon from "../../../assets/svg/CloseIcon";
import styles from "./Modal.module.scss";

interface DialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  buttons?: {
    label: string;
    color: ButtonProps["color"];
    onClick: () => void;
  }[];
  color?: "default" | "warning";
  onClose: () => void; // 모달 닫기
}

export default function Dialog({
  isOpen,
  title,
  description,
  buttons,
  color = "default",
  onClose,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className='overlay'>
      <div className={`${styles.dialog} ${styles[color]}`}>
        <header>
          <h2>{title}</h2>
          <Button label='닫기' iconOnly={<CloseIcon />} onClick={onClose} />
        </header>
        {description && <main>{description}</main>}
        {buttons && (
          <div className={styles.wrapper_btn}>
            {buttons.map((button) => (
              <Button
                key={button.label}
                label={button.label}
                color={button.color}
                onClick={button.onClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
