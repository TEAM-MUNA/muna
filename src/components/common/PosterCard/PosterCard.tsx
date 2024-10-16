import React from "react";
import { Link } from "react-router-dom";
import styles from "./PosterCard.module.scss";
import { ConcertType, defaultConcertType } from "../../../types/concertType";
import BookmarkToggle from "../BookmarkToggle/BookmarkToggle";

interface PosterCardProps extends ConcertType {
  concertId?: string;
  bookmarkInteractive?: boolean;
}

export default function PosterCard({
  concertId,
  bookmarkInteractive = false,
  title = defaultConcertType.title,
  poster = defaultConcertType.poster,
}: PosterCardProps) {
  return (
    <div className={`${styles.card} card_poster`}>
      <Link to={`/concert/${concertId}`}>
        <div className={styles.container}>
          <img className={styles.poster} src={poster} alt={title} />
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
      <div className={styles.wrapper_bookmark}>
        <BookmarkToggle
          concertId={concertId}
          interactive={bookmarkInteractive}
        />
      </div>
    </div>
  );
}
