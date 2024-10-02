import React from "react";
import styles from "./ReviewGalleryCard.module.scss";
import { ReviewProps, defaultReviewProps } from "../../../types/reviewProps";
import { ConcertProps, defaultConcertProps } from "../../../types/concertProps";
import ImageLayersIcon from "../../../assets/svg/ImageLayersIcon";
import LikeIcon from "../../../assets/svg/LikeIcon";

interface ReviewGalleryCardProps extends ReviewProps, ConcertProps {
  hasMultiImages?: boolean;
}

export default function ReviewGalleryCard({
  title = defaultReviewProps.title,
  thumbnail = defaultReviewProps.thumbnail,
  likeCount = defaultReviewProps.likeCount,
  poster = defaultConcertProps.poster,
  hasMultiImages,
}: ReviewGalleryCardProps) {
  return (
    <div className={styles.card}>
      <img className={styles.thumbnail} src={thumbnail || poster} alt={title} />
      {hasMultiImages && (
        <span className={`${styles.icon} ${styles.icon_layers}`}>
          <ImageLayersIcon size='20' />
        </span>
      )}
      {likeCount && (
        <span className={`${styles.icon} ${styles.icon_like}`}>
          <LikeIcon size='20' />
          {likeCount}
        </span>
      )}
    </div>
  );
}