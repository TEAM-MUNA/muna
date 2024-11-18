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
import { getReviewFromFirebase } from "../../../api/firebase/reviewAPI";
import { ReviewType } from "../../../types/reviewType";

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
    setReview,
    // isLoading: isReviewLoading,
    // error: reviewError,
  } = useGetReview(reviewId, pageName); // Firebase

  const isLikedInitialState =
    review?.likedBy?.some((likedUserId: string) => likedUserId === userId) ||
    false;
  const { isActive: isLiked, onToggle: onLikeToggle } =
    useToggle(isLikedInitialState);

  const handleLike = async () => {
    if (!userId) {
      toast.error("로그인 후 이용 가능합니다.");
      return;
    }

    onLikeToggle(); // 버튼 상태를 임시로 반영

    try {
      // 1. 좋아요 업데이트 (Firebase)
      await dispatch(likeReviewAsync({ userId, reviewId, cancel: isLiked }));

      // Firebase에서 최신 데이터 가져와서 갱신
      const updatedReview = (await getReviewFromFirebase(
        reviewId!
      )) as ReviewType;
      if (updatedReview && typeof updatedReview === "object") {
        setReview(updatedReview);
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
      {review && <span className={`font_${size}`}>{review.likeCount}</span>}
    </button>
  );
}
