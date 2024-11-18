import React from "react";
// import { setUser } from "../../../slices/authSlice";
import toast from "react-hot-toast";
import styles from "./LikeToggle.module.scss";
import LikeIcon from "../../../assets/svg/LikeIcon";
import useToggle from "../../../hooks/useToggle";
import { useAppDispatch } from "../../../app/hooks";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useGetReview from "../../../hooks/useGetReview";
import { likeReviewAsync } from "../../../slices/activitySlice";

interface LikeToggleProps {
  reviewId: string | undefined;
  // likeCount?: number;
  size?: "sm" | "md";
  pageName: string; // Firebase 사용 추적
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function LikeToggle({
  reviewId,
  // likeCount,
  size = "md",
  pageName,
  // onClick = () => {},
}: LikeToggleProps) {
  const dispatch = useAppDispatch();
  const userId = useCurrentUser().userId;

  const {
    review,
    // isLoading: isReviewLoading,
    // error: reviewError,
  } = useGetReview(reviewId, pageName); // Firebase

  const isLikedInitialState =
    review?.likedBy?.some((likedUserId: string) => likedUserId === userId) ||
    false;
  const { isActive: isLiked, onToggle: onLikeToggle } =
    useToggle(isLikedInitialState);

  const handleLike = async () => {
    if (!userId || !review) {
      toast.error("로그인 후 이용 가능합니다.");
      return;
    }

    onLikeToggle(); // 버튼 상태를 임시로 반영

    try {
      // 1. 서버에서 좋아요 상태와 관련된 데이터를 업데이트
      const updatedLikedReviews = await dispatch(
        likeReviewAsync({ userId, reviewId, cancel: isLiked })
      );

      // 2. 서버 응답을 기다린 후 리덕스 상태를 업데이트
      if (updatedLikedReviews) {
        // 3. 리덕스에서 상태 업데이트 (user의 likedReviews를 최신 상태로)
        // dispatch(setUser({ likedReviews: updatedLikedReviews }));
      }
    } catch {
      // console.error(e);
      onLikeToggle(); // 좋아요 취소 (원래 상태로 복구)
      toast.error("좋아요 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button
      type='button'
      className={`${styles.btn} text_danger`}
      onClick={handleLike}
    >
      <LikeIcon size={size === "md" ? "24" : "20"} active={isLiked} />
      <span className='sr_only'>좋아요</span>
      <span className={`font_${size}`}>{review?.likeCount}</span>
    </button>
  );
}
