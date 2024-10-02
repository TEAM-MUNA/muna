import React from "react";
import styles from "./PosterCard.module.scss";
import { ConcertProps, defaultConcertProps } from "../../../types/concertProps";
import Button from "../Button/Button";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";

interface PosterCardProps extends ConcertProps {
  isBookmarked?: boolean;
}

export default function PosterCard({
  title = defaultConcertProps.title,
  poster = defaultConcertProps.poster,
  isBookmarked = false,
}: PosterCardProps) {
  return (
    <div className={`${styles.card}`}>
      <img className={styles.poster} src={poster} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <Button
        className={styles.btn_bookmark}
        label='북마크'
        iconOnly={<BookmarkIcon active={isBookmarked} />}
      />
    </div>
  );
}
