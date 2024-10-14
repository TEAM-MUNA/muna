import React, { ReactNode } from "react";

import Button from "../Button/Button";
import CloseIcon from "../../../assets/svg/CloseIcon";
import styles from "./Modal.module.scss";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  color?: "default" | "warning";
  children?: ReactNode;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  color = "default",
  children,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className='overlay'>
      <div className={`${styles.dialog} ${styles[color]}`}>
        <header>
          <h2>{title}</h2>
          <Button label='닫기' iconOnly={<CloseIcon />} onClick={onClose} />
        </header>
        {description && <p className={styles.description}>{description}</p>}
        {children && <div className={styles.wrapper_btn}>{children}</div>}
      </div>
    </div>
  );
}
