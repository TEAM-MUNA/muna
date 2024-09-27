import React from "react";
import styles from "./Title.module.scss";
import Button from "../Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import CloseIcon from "../../../assets/svg/CloseIcon";
import CheckIcon from "../../../assets/svg/CheckIcon";

interface TitleProps {
  label?: string;
  buttonLeft?: "back" | "close";
  buttonRight?: "done" | null;
}

export default function Title({
  label = "",
  buttonLeft,
  buttonRight,
}: TitleProps) {
  return (
    <header className={`${styles.title}`}>
      <div>
        {buttonLeft === "back" ? (
          <Button icon={<ArrowLeftIcon />} />
        ) : (
          <Button icon={<CloseIcon />} />
        )}
      </div>
      <h1>{label}</h1>
      <div>
        {buttonRight === "done" ? <Button icon={<CheckIcon />} /> : null}
      </div>
    </header>
  );
}
