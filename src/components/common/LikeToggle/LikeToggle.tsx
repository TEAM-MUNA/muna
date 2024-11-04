import React from "react";
import styles from "./LikeToggle.module.scss";
import LikeIcon from "../../../assets/svg/LikeIcon";
import useToggle from "../../../hooks/useToggle";

interface LikeToggleProps {
  likeCount?: number;
  size?: "sm" | "md";
  active?: boolean;
  disabled?: boolean;
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function LikeToggle({
  likeCount,
  size = "md",
  active = false,
  disabled = false,
  // onClick = () => {},
}: LikeToggleProps) {
  const { isActive, onToggle } = useToggle(active);
  // TODO: 버튼 눌렸을 때 추가기능, 숫자 늘어나기

  return (
    <button
      type='button'
      className={`${styles.btn} text_danger`}
      disabled={disabled}
      onClick={onToggle}
    >
      <LikeIcon size={size === "md" ? "24" : "20"} active={isActive} />
      <span className='sr_only'>좋아요</span>
      <span className={`font_${size}`}>{likeCount}</span>
    </button>
  );
}
