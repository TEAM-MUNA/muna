import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ReviewCard.module.scss";
import { UserType, defaultUserType } from "../../../types/userType";
import { ReviewPropType, defaultReviewType } from "../../../types/reviewType";
import StarIcon from "../../../assets/svg/StarIcon";
import LikeIcon from "../../../assets/svg/LikeIcon";
import LikeButton from "../Button/LikeButton";
import Avatar from "../Avatar/Avatar";

interface ReviewCardProps extends UserType, ReviewPropType {
  hasAvatar?: boolean;
}

export default function ReviewCard({
  // userLink = defaultUserType.userLink,
  reviewLink = defaultReviewType.reviewLink,
  profileImage = defaultUserType.profileImage,
  nickname = defaultUserType.nickname,
  userId = defaultUserType.userId,
  title = defaultReviewType.title,
  content = defaultReviewType.content,
  date = defaultReviewType.date,
  thumbnail = defaultReviewType.thumbnail,
  starRate = defaultReviewType.starRate || 0,
  likeCount = defaultReviewType.likeCount,
  hasAvatar = true,
}: ReviewCardProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const page = pathname.split("/")[1] || "main";

  return (
    <div className={`${styles.card} card_review page_${page}`}>
      {hasAvatar ? (
        <div className={styles.top}>
          <Avatar
            nickname={nickname}
            userId={userId}
            profileImage={profileImage}
          />
          {page === "main" && <LikeButton size='sm' likeCount={likeCount} />}
        </div>
      ) : (
        <Link to={reviewLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
      )}
      <Link to={reviewLink}>
        <div className={styles.content}>
          <div className={styles.text}>
            {page === "main" && <h3 className={styles.title}>{title}</h3>}
            <p>{content}</p>
            {page !== "main" && (
              <div className={styles.info}>
                <div className={styles.wrap_icon}>
                  {typeof starRate === "number" ? (
                    <span className={styles.icon}>
                      <StarIcon size='14' />
                      {starRate.toFixed(1)}
                    </span>
                  ) : null}
                  {likeCount > 0 ? (
                    <span className={styles.icon}>
                      <LikeIcon size='14' />
                      {likeCount}
                    </span>
                  ) : null}
                </div>
                <span className={styles.date}>{date.replace(/-/g, ".")}</span>
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
      </Link>
    </div>
  );
}
