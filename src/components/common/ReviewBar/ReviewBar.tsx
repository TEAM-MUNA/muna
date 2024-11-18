import React, { useEffect } from "react";
import LikeToggle from "../LikeToggle/LikeToggle";
import styles from "./ReviewBar.module.scss";

interface ReviewBarProps {
  reviewId: string | undefined;
}

export default function ReviewBar({ reviewId }: ReviewBarProps) {
  useEffect(() => {
    // likedBy: String[] - userId 에서
    // 로그인된 내 아이디가 있는지 없는지 확인후
    // LikeToggle에 active 설정하는 로직
  }, []);

  return (
    <div className={styles.container}>
      <LikeToggle reviewId={reviewId} pageName='ReviewDetail' />
    </div>
  );
}
