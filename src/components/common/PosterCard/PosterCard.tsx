import React from "react";
import { Link } from "react-router-dom";
import styles from "./PosterCard.module.scss";
import { ConcertProps, defaultConcertProps } from "../../../types/concertProps";
import Button from "../Button/Button";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import useToggle from "../../../hooks/useToggle";

interface PosterCardProps extends ConcertProps {
  isBookmarked?: boolean;
}

export default function PosterCard({
  concertLink = defaultConcertProps.concertLink,
  title = defaultConcertProps.title,
  poster = defaultConcertProps.poster,
  isBookmarked = false,
}: PosterCardProps) {
  const { isActive, onToggle } = useToggle(isBookmarked);

  return (
    <Link to={concertLink} className={`${styles.card}`}>
      <div className={styles.container}>
        <img className={styles.poster} src={poster} alt={title} />
        <h3 className={styles.title}>{title}</h3>
        <Button
          className={styles.btn_bookmark}
          label='북마크'
          iconOnly={<BookmarkIcon active={isActive} />}
          iconShadow
          onClick={onToggle}
        />
      </div>
    </Link>
  );
}
