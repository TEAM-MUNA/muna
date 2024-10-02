import React from "react";
import styles from "./ReviewCard.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";
import { ReviewProps, defaultReviewProps } from "../../../types/reviewProps";
import StarIcon from "../../../assets/svg/StarIcon";
import LikeIcon from "../../../assets/svg/LikeIcon";
import LikeButton from "../Button/LikeButton";
import CardAvatar from "../Avatar/CardAvatar";

interface ReviewCardProps extends UserProps, ReviewProps {
  page?: "concert" | "profile" | "main";
}

export default function ReviewCard({
  page = "main",
  // page = "concert",
  // page = "profile",
  userImage = defaultUserProps.userImage,
  nickname = defaultUserProps.nickname,
  userId = defaultUserProps.userId,
  title = defaultReviewProps.title,
  content = defaultReviewProps.content,
  date = defaultReviewProps.date,
  thumbnail = defaultReviewProps.thumbnail,
  starRate = defaultReviewProps.starRate,
  likeCount = defaultReviewProps.likeCount,
}: ReviewCardProps) {
  return (
    <div className={`${styles.card}`}>
      {page === "profile" ? (
        <h3 className={styles.title}>{title}</h3>
      ) : (
        <div className={styles.top}>
          <CardAvatar
            nickname={nickname}
            userId={userId}
            userImage={userImage}
          />
          {page === "main" && <LikeButton size='sm' likeCount={20} />}
        </div>
      )}
      <div className={styles.main}>
        <div className={styles.text}>
          {page === "main" && <h3 className={styles.title}>{title}</h3>}
          <p>{content}</p>
          {page !== "main" && (
            <div className={styles.info}>
              <div className={styles.wrap_icon}>
                <span className={styles.icon}>
                  <StarIcon size='20' />
                  {starRate}
                </span>
                <span className={styles.icon}>
                  <LikeIcon size='20' />
                  {likeCount}
                </span>
              </div>
              <span className={styles.date}>{date}</span>
            </div>
          )}
        </div>
        {thumbnail && (
          <img
            src={thumbnail}
            className={styles.thumbnail}
            alt={`${title} 후기`}
          />
        )}
      </div>
    </div>
  );
}
