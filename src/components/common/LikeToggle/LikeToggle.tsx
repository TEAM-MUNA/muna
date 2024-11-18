import React from "react";
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
    if (userId && review) {
      onLikeToggle();
      try {
        await dispatch(likeReviewAsync({ userId, reviewId, cancel: isLiked }));
      } catch {
        // console.error(e);
        toast.error(
          "후기 좋아요 추가하지 못했습니다. 잠시 후에 다시 시도해주세요."
        );
        onLikeToggle(); // 좋아요 해제
      }
    } else {
      toast.error("로그인 후 이용 가능합니다.");
    }
  };

  // if (!isLiked) {
  //   return null;
  // }

  // const { isActive, onToggle } = useToggle(active);
  // TODO: 버튼 눌렸을 때 추가기능, 숫자 늘어나기

  return (
    <button
      type='button'
      className={`${styles.btn} text_danger`}
      onClick={handleLike}
    >
      <LikeIcon size={size === "md" ? "24" : "20"} active={isLiked} />
      <span className='sr_only'>좋아요</span>
      {/* <span className={`font_${size}`}>{likeCount}</span> */}
    </button>
  );
}
