import React from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import StarIcon from "../../../assets/svg/StarIcon";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import ReviewIcon from "../../../assets/svg/ReviewIcon";
import { ConcertType } from "../../../types/concertType";
import styles from "./ConcertCard.module.scss";

interface ConcertCardProps {
  concert: ConcertType; // 통합된 콘서트 데이터
}

export default function ConcertCard({ concert }: ConcertCardProps) {
  return (
    <Link to='/임시' className={`${styles.concertCard} card_concert`}>
      <div className={styles.poster}>
        <img src={concert.poster} alt={concert.title} />
      </div>
      <div className={styles.info}>
        <Tag label='공연중(임시데이터)' color='white' />
        <h3 className={styles.title}>{concert.title}</h3>

        <div className={styles.tag_container}>
          <div className={styles.tag}>
            <StarIcon size='14' />
            <span>{concert.averageRating}</span>
          </div>
          <div className={styles.tag}>
            <BookmarkIcon size='14' />
            <span>{concert.reviews?.length}</span>
          </div>
          <div className={styles.tag}>
            <ReviewIcon size='14' />
            <span>{concert.bookmarkedBy?.length}</span>
          </div>
        </div>

        <div className={styles.info_container}>
          <p>장소(임시)</p>
          <p>날짜 ~ 날짜(임시)</p>
          <p>연령 (임시)</p>
        </div>
      </div>
    </Link>
  );
}
