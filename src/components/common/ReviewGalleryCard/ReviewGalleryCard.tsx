import React from "react";
import { Link } from "react-router-dom";
import styles from "./ReviewGalleryCard.module.scss";
import { ReviewPropType, defaultReviewType } from "../../../types/reviewType";
import { ConcertType, defaultConcertType } from "../../../types/concertType";
import ImageLayersIcon from "../../../assets/svg/ImageLayersIcon";
import LikeIcon from "../../../assets/svg/LikeIcon";

interface ReviewGalleryCardProps extends ReviewPropType, ConcertType {
  hasMultiImages?: boolean;
}

export default function ReviewGalleryCard({
  reviewLink = defaultReviewType.reviewLink,
  title = defaultReviewType.title,
  thumbnail = defaultReviewType.thumbnail,
  likeCount = defaultReviewType.likeCount,
  poster = defaultConcertType.poster,
  hasMultiImages,
}: ReviewGalleryCardProps) {
  return (
    <Link to={reviewLink} className={`${styles.card} card_review_gallery`}>
      <img className={styles.thumbnail} src={thumbnail || poster} alt={title} />
      {hasMultiImages && (
        <span className={`${styles.icon} ${styles.icon_layers}`}>
          <ImageLayersIcon size='16' />
        </span>
      )}
      {likeCount !== 0 && (
        <span className={`${styles.icon} ${styles.icon_like}`}>
          <LikeIcon size='16' />
          {likeCount}
        </span>
      )}
    </Link>
  );
}
