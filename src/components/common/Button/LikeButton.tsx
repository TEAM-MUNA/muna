import React, { useState } from "react";
import styles from "./Button.module.scss";
import LikeIcon from "../../../assets/svg/LikeIcon";

interface LikeButtonProps {
  likeCount?: number;
  size?: "sm" | "md";
  active?: boolean;
  disabled?: boolean;
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function LikeButton({
  likeCount,
  size = "md",
  active = false,
  disabled = false,
  // onClick = () => {},
}: LikeButtonProps) {
  const [like, setLike] = useState(active);

  const handleLikeButton = () => {
    setLike(!like);
    // TODO: 버튼 눌렸을 때 추가기능, 숫자 늘어나기
    // onClick();
  };

  return (
    <button
      type='button'
      className={`${styles.btn} text_danger`}
      disabled={disabled}
      onClick={handleLikeButton}
    >
      <LikeIcon size={size === "md" ? "24" : "20"} active={like} />
      <span className='sr_only'>좋아요</span>
      <span className={`font_${size}`}>{likeCount}</span>
    </button>
  );
}
