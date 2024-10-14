import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import StarIcon from "../../../assets/svg/StarIcon";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import ReviewIcon from "../../../assets/svg/ReviewIcon";
import {
  ConcertType,
  ConcertReturnType,
  DefaultConcertType,
} from "../../../types/concertType";
import { getConcertFromFirebase } from "../../../api/firebase/concertAPI";
import styles from "./ConcertCard.module.scss";

interface ConcertCardProps {
  concert: ConcertReturnType; // kopis API 응답 데이터
}

export default function ConcertCard({ concert }: ConcertCardProps) {
  const [fbData, setFbData] = useState<ConcertType>(DefaultConcertType);

  useEffect(() => {
    const fetchFbData = async () => {
      const concertFromFirebase = (await getConcertFromFirebase(
        concert.mt20id
      )) as ConcertType;
      setFbData(concertFromFirebase);
    };
    fetchFbData();
  }, []);

  return (
    <Link to='/임시' className={`${styles.concertCard} card_concert`}>
      <div className={styles.poster}>
        <img src={concert.poster} alt={concert.prfnm} />
      </div>
      <div className={styles.info}>
        <Tag label={concert.prfstate} color='white' />
        <h3 className={styles.title}>{concert.prfnm}</h3>

        {fbData && (
          <div className={styles.tag_container}>
            {fbData.averageRating && (
              <div className={styles.tag}>
                <StarIcon size='14' />
                <span>{fbData.averageRating}</span>
              </div>
            )}
            {fbData.bookmarkedBy && (
              <div className={styles.tag}>
                <BookmarkIcon size='14' />
                <span>{fbData.bookmarkedBy.length}</span>
              </div>
            )}
            {fbData.reviews && (
              <div className={styles.tag}>
                <ReviewIcon size='14' />
                <span>{fbData.reviews.length}</span>
              </div>
            )}
          </div>
        )}

        <div className={styles.info_container}>
          <p>{concert.fcltynm}</p>
          <p>
            {concert.prfpdfrom} ~ {concert.prfpdto}
          </p>
          <p>전체 관람가</p> {/* 수정 혹은 삭제 요망 */}
        </div>
      </div>
    </Link>
  );
}
