import React from "react";
import { Link } from "react-router-dom";
import styles from "./ReviewGalleryCard.module.scss";
import { ReviewProps, defaultReviewProps } from "../../../types/reviewProps";
import { ConcertProps, defaultConcertProps } from "../../../types/concertProps";
import ImageLayersIcon from "../../../assets/svg/ImageLayersIcon";
import LikeIcon from "../../../assets/svg/LikeIcon";

interface ReviewGalleryCardProps extends ReviewProps, ConcertProps {
  hasMultiImages?: boolean;
}

export default function ReviewGalleryCard({
  reviewLink = defaultReviewProps.reviewLink,
  title = defaultReviewProps.title,
  thumbnail = defaultReviewProps.thumbnail,
  likeCount = defaultReviewProps.likeCount,
  poster = defaultConcertProps.poster,
  hasMultiImages,
}: ReviewGalleryCardProps) {
  return (
    <Link to={reviewLink} className={`${styles.card} card_review_gallery`}>
      <img className={styles.thumbnail} src={thumbnail || poster} alt={title} />
      {hasMultiImages && (
        <span className={`${styles.icon} ${styles.icon_layers}`}>
          <ImageLayersIcon size='14' />
        </span>
      )}
      {likeCount && (
        <span className={`${styles.icon} ${styles.icon_like}`}>
          <LikeIcon size='14' />
          {likeCount}
        </span>
      )}
    </Link>
  );
}
