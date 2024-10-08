import React from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import StarIcon from "../../../assets/svg/StarIcon";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import ReviewIcon from "../../../assets/svg/ReviewIcon";
import { ConcertProps, defaultConcertProps } from "../../../types/concertProps";
import styles from "./ConcertCard.module.scss";

interface ConcertCardProps {
  concert: ConcertProps; // 통합된 콘서트 데이터
}

export default function ConcertCard({ concert }: ConcertCardProps) {
  const {
    title = defaultConcertProps.title,
    poster = defaultConcertProps.poster,
    state = defaultConcertProps.state,
    startDate = defaultConcertProps.startDate,
    endDate = defaultConcertProps.endDate,
    location = "광림아트센터 BBCH홀",
    age = defaultConcertProps.age,
    starRate = "4.7",
    reviewCount = "718",
    bookmarkCount = "24",
    concertLink = defaultConcertProps.concertLink,
  } = concert;

  return (
    <Link to={concertLink} className={`${styles.concertCard} card_concert`}>
      <div className={styles.poster}>
        <img src={poster} alt={title} />
      </div>
      <div className={styles.info}>
        <Tag label={state} color='white' />
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.tag_container}>
          <div className={styles.tag}>
            <StarIcon size='14' />
            <span>{starRate}</span>
          </div>
          <div className={styles.tag}>
            <BookmarkIcon size='14' />
            <span>{reviewCount}</span>
          </div>
          <div className={styles.tag}>
            <ReviewIcon size='14' />
            <span>{bookmarkCount}</span>
          </div>
        </div>

        <div className={styles.info_container}>
          <p>{location}</p>
          <p>{`${startDate} ~ ${endDate}`}</p>
          <p>{age}</p>
        </div>
      </div>
    </Link>
  );
}
