import React from "react";
import { Link } from "react-router-dom";
import styles from "./PosterCard.module.scss";
import { ConcertProps, defaultConcertProps } from "../../../types/concertProps";
import Button from "../Button/Button";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import useToggle from "../../../hooks/useToggle";

interface PosterCardProps extends ConcertProps {
  link: string;
  isBookmarked?: boolean;
}

export default function PosterCard({
  link,
  title = defaultConcertProps.title,
  poster = defaultConcertProps.poster,
  isBookmarked = false,
}: PosterCardProps) {
  const { isActive, onToggle } = useToggle(isBookmarked);

  return (
    <Link to={link} className={`${styles.card}`}>
      <img className={styles.poster} src={poster} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <Button
        className={styles.btn_bookmark}
        label='북마크'
        iconOnly={<BookmarkIcon active={isActive} />}
        iconShadow
        onClick={onToggle}
      />
    </Link>
  );
}
