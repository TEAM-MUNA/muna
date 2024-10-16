import React from "react";
import { Link } from "react-router-dom";
import styles from "./PosterCard.module.scss";
import { ConcertType, defaultConcertType } from "../../../types/concertType";
import Button from "../Button/Button";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";

interface PosterCardProps extends ConcertType {
  isBookmarked?: boolean;
  concertLink?: string;
  onBookmarkClick?: () => void;
}

export default function PosterCard({
  concertLink = "/",
  title = defaultConcertType.title,
  poster = defaultConcertType.poster,
  isBookmarked = false,
  onBookmarkClick = () => {},
}: PosterCardProps) {
  return (
    <Link to={concertLink} className={`${styles.card} card_poster`}>
      <div className={styles.container}>
        <img className={styles.poster} src={poster} alt={title} />
        <h3 className={styles.title}>{title}</h3>
        <Button
          className={styles.btn_bookmark}
          label='북마크'
          iconOnly={<BookmarkIcon active={isBookmarked} />}
          iconShadow
          onClick={onBookmarkClick}
        />
      </div>
    </Link>
  );
}
