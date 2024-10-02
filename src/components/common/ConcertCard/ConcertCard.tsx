import React from "react";
import Tag from "../Tag/Tag";
import StarIcon from "../../../assets/svg/StarIcon";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
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
  } = concert;

  return (
    <article className={styles.concertCard}>
      <div className={styles.poster}>
        <img src={poster} alt={title} />
      </div>
      <div className={styles.info}>
        <Tag label={state} color='white' />
        <p className={styles.title}>{title}</p>

        <div className={styles.tag_container}>
          <div className={styles.tag}>
            <StarIcon size='20px' />
            <span>{starRate}</span>
          </div>
          <div className={styles.tag}>
            <BookmarkIcon size='20px' />
            <span>{reviewCount}</span>
          </div>
          <div className={styles.tag}>
            <BookmarkIcon size='20px' />
            <span>{bookmarkCount}</span>
          </div>
        </div>

        <div className={styles.info_container}>
          <p>{location}</p>
          <p>{`${startDate} ~ ${endDate}`}</p>
          <p>{age}</p>
        </div>
      </div>
    </article>
  );
}
