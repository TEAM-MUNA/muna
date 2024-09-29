import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./Title.module.scss";
import Button from "../Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import CloseIcon from "../../../assets/svg/CloseIcon";
import CheckIcon from "../../../assets/svg/CheckIcon";

interface TitleProps {
  label?: string;
  buttonLeft?: "back" | "close";
  buttonRight?: "done" | null;
  handleDoneButton?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Title({
  label = "",
  buttonLeft,
  buttonRight,
  handleDoneButton,
}: TitleProps) {
  const handleBackButton = () => {
    // navigate(-1);
  };

  return (
    <header className={`${styles.title}`}>
      <div>
        {buttonLeft === "back" ? (
          <Button
            label='back'
            iconOnly={<ArrowLeftIcon />}
            onClick={handleBackButton}
          />
        ) : (
          <Button
            label='close'
            iconOnly={<CloseIcon />}
            onClick={handleBackButton}
          />
        )}
      </div>
      <h1>{label}</h1>
      <div>
        {buttonRight === "done" ? (
          <Button
            label='done'
            iconOnly={<CheckIcon />}
            onClick={handleDoneButton}
          />
        ) : null}
      </div>
    </header>
  );
}
