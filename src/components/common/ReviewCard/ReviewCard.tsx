import React from "react";
import { Link } from "react-router-dom";
import styles from "./ReviewCard.module.scss";
import { UserProps, defaultUserProps } from "../../../types/userProps";
import { ReviewProps, defaultReviewProps } from "../../../types/reviewProps";
import StarIcon from "../../../assets/svg/StarIcon";
import LikeIcon from "../../../assets/svg/LikeIcon";
import LikeButton from "../Button/LikeButton";
import Avatar from "../Avatar/Avatar";

interface ReviewCardProps extends UserProps, ReviewProps {
  page?: "concert" | "profile" | "main";
}

export default function ReviewCard({
  page = "main",
  // page = "concert",
  // page = "profile",
  userLink = defaultUserProps.userLink,
  reviewLink = defaultReviewProps.reviewLink,
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
        <Link to={reviewLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
      ) : (
        <div className={styles.top}>
          <Avatar
            nickname={nickname}
            userId={userId}
            userImage={userImage}
            link={userLink}
          />
          {page === "main" && <LikeButton size='sm' likeCount={20} />}
        </div>
      )}
      <Link to={reviewLink}>
        <div className={styles.main}>
          <div className={styles.text}>
            {page === "main" && <h3 className={styles.title}>{title}</h3>}
            <p>{content}</p>
            {page !== "main" && (
              <div className={styles.info}>
                <div className={styles.wrap_icon}>
                  <span className={styles.icon}>
                    <StarIcon size='14' />
                    {starRate}
                  </span>
                  <span className={styles.icon}>
                    <LikeIcon size='14' />
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
      </Link>
    </div>
  );
}
