import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

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
  // 모달이 열려 있을 때 기존 페이지영역 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className={`${styles.dialog} ${styles[color]}`}>
        <header>
          <h2>{title}</h2>
          <Button label='닫기' iconOnly={<CloseIcon />} onClick={onClose} />
        </header>
        {description && <p className={styles.description}>{description}</p>}
        {children && <div className={styles.wrapper_btn}>{children}</div>}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}
